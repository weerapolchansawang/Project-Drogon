#define NOMINMAX
#include <drogon/drogon.h>
#include <json/json.h>
#include <sqlite3.h>
#include <string>
#include <iostream>
#include <csignal>
#include <jwt-cpp/jwt.h>
#include <openssl/ssl.h>

const std::string DB_PATH = "../../database/database.db";

std::string getExecutableDir() {
    return std::filesystem::current_path().parent_path().parent_path().string() + "/public";
}
void signalHandler(int signum) {
    std::cerr << "Interrupt signal (" << signum << ") received.\n";
    exit(signum);
}

bool authenticateUser(const std::string& username, const std::string& password) {
    sqlite3* db;
    int rc = sqlite3_open(DB_PATH.c_str(), &db);
    if (rc != SQLITE_OK) {
        std::cerr << "Cannot open database: " << sqlite3_errmsg(db) << std::endl;
        std::cerr << "Attempted to open database at: " << DB_PATH << std::endl; // เพิ่มบรรทัดนี้
        sqlite3_close(db);
        return false;
    }

    std::string sql = "SELECT password FROM users WHERE username = ?";
    sqlite3_stmt* stmt;
    rc = sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, nullptr);
    if (rc != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
        sqlite3_close(db);
        return false;
    }

    sqlite3_bind_text(stmt, 1, username.c_str(), -1, SQLITE_STATIC);
    bool isAuthenticated = false;
    rc = sqlite3_step(stmt);
    if (rc == SQLITE_ROW) {
        const char* result = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 0));
        if (result) {
            std::string storedPassword(result);
            isAuthenticated = (storedPassword == password);
        }
    }

    sqlite3_finalize(stmt);
    sqlite3_close(db);
    return isAuthenticated;
}

const std::string JWT_SECRET = "your-secret-key";
std::string generateJWT(const std::string& username) {
    auto token = jwt::create()
        .set_issuer("auth_server")
        .set_type("JWS")
        .set_payload_claim("username", jwt::claim(username))
        .set_expires_at(std::chrono::system_clock::now() + std::chrono::hours(1))
        .sign(jwt::algorithm::hs256{JWT_SECRET});
    return token;
}

bool verifyJWT(const std::string& token) {
    try {
        auto decoded = jwt::decode(token);
        auto verifier = jwt::verify()
            .allow_algorithm(jwt::algorithm::hs256{JWT_SECRET})
            .with_issuer("auth_server");
        verifier.verify(decoded);
        return true;
    } catch (const std::exception& e) {
        std::cerr << "JWT verification failed: " << e.what() << std::endl;
        return false;
    }
}

Json::Value getTranscriptData() {
    sqlite3* db;
    int rc = sqlite3_open(DB_PATH.c_str(), &db);
    if (rc != SQLITE_OK) {
        std::cerr << "Cannot open database: " << sqlite3_errmsg(db) << std::endl;
        sqlite3_close(db);
        return Json::Value();
    }

    std::string sql = R"(
        SELECT transcripts.year, transcripts.semester, transcripts.course_code, 
               Courses.course_title, Courses.credits, transcripts.grade
        FROM transcripts
        JOIN Courses ON transcripts.course_code = Courses.course_code;
    )";

    sqlite3_stmt* stmt;
    rc = sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, nullptr);
    if (rc != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
        sqlite3_close(db);
        return Json::Value();
    }

    Json::Value transcriptData(Json::arrayValue);
    while (sqlite3_step(stmt) == SQLITE_ROW) {
        Json::Value row;
        row["year"] = sqlite3_column_int(stmt, 0);
        row["semester"] = sqlite3_column_int(stmt, 1);
        row["course_code"] = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2));
        row["course_title"] = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 3));
        row["credits"] = sqlite3_column_int(stmt, 4);
        row["grade"] = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 5));
        transcriptData.append(row);
    }

    sqlite3_finalize(stmt);
    sqlite3_close(db);

    return transcriptData;
}

int main() {
    signal(SIGSEGV, signalHandler);
    signal(SIGABRT, signalHandler);
    signal(SIGINT, signalHandler);

    drogon::app().registerHandler("/api/login",
                                  [](const drogon::HttpRequestPtr& req, std::function<void(const drogon::HttpResponsePtr&)>&& callback) {
                                      LOG_INFO << "Received login request";
                                      auto json = req->getJsonObject();
                                      if (!json || !json->isMember("username") || !json->isMember("password")) {
                                          auto resp = drogon::HttpResponse::newHttpResponse();
                                          resp->setStatusCode(drogon::k400BadRequest);
                                          callback(resp);
                                          return;
                                      }

                                      std::string username = (*json)["username"].asString();
                                      std::string password = (*json)["password"].asString();

                                      bool isAuthenticated = authenticateUser(username, password);

                                      Json::Value jsonResponse;
                                      if (isAuthenticated) {
                                          jsonResponse["success"] = true;
                                          jsonResponse["token"] = generateJWT(username);
                                      } else {
                                          jsonResponse["success"] = false;
                                      }

                                      auto resp = drogon::HttpResponse::newHttpJsonResponse(jsonResponse);
                                      callback(resp);
                                  },
                                  {drogon::Post});

    drogon::app().registerHandler("/api/transcript",
                                  [](const drogon::HttpRequestPtr& req, std::function<void(const drogon::HttpResponsePtr&)>&& callback) {
                                      LOG_INFO << "Transcript data requested";
                                      auto token = req->getHeader("Authorization");
                                      if (token.substr(0, 7) == "Bearer ") {
                                          token = token.substr(7);
                                      }

                                      if (!verifyJWT(token)) {
                                          auto resp = drogon::HttpResponse::newHttpResponse();
                                          resp->setStatusCode(drogon::k401Unauthorized);
                                          callback(resp);
                                          return;
                                      }

                                      Json::Value transcriptData = getTranscriptData();
                                      auto resp = drogon::HttpResponse::newHttpJsonResponse(transcriptData);
                                      callback(resp);
                                  },
                                  {drogon::Get});

    // ตั้งค่า Document Root สำหรับเสิร์ฟไฟล์หน้าเว็บ
drogon::app().setDocumentRoot(getExecutableDir());
std::cout << "Current working directory: " << std::filesystem::current_path() << std::endl;
    LOG_INFO << "Server is listening on port 8080";
    drogon::app().addListener("0.0.0.0", 8080).run();

    return 0;
}
