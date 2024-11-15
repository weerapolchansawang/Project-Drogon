#include "LoginController.h"
#include <drogon/drogon.h>
#include <json/json.h>


void LoginController::login(const drogon::HttpRequestPtr& req, std::function<void(const drogon::HttpResponsePtr&)>&& callback) {
    auto json = req->getJsonObject();
    Json::Value response;

    if (!json) {
        // กรณีที่ request ไม่มีข้อมูล JSON ที่ถูกต้อง
        response["error"] = "Invalid request";
        callback(drogon::HttpResponse::newHttpJsonResponse(response));
        return;
    }

    std::string username = (*json)["username"].asString();
    std::string password = (*json)["password"].asString();

    // เพิ่มการตรวจสอบรหัสผ่าน (กรณีนี้คือการตรวจสอบที่ง่ายที่สุด)
    bool isValid = (username == "user1" && password == "password1");

    if (isValid) {
        response["message"] = "Login successful";
        response["success"] = true;
    } else {
        response["message"] = "Invalid username or password";
        response["success"] = false;
    }

    // ส่ง response กลับไปที่ client
    callback(drogon::HttpResponse::newHttpJsonResponse(response));
}
