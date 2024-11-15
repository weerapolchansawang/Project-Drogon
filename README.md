MyProject
This project is a backend system developed with Drogon C++ for managing login, transcript retrieval, and JWT authentication. It also includes a frontend interface where users can load and view transcript data.

โปรเจคนี้เป็นระบบ backend ที่พัฒนาด้วย Drogon C++ สำหรับการจัดการระบบเข้าสู่ระบบ ดึงข้อมูล transcript และ JWT authentication รวมถึงมีส่วนหน้า (frontend) ที่สามารถโหลดข้อมูล transcript ได้ด้วย

Prerequisites | ข้อกำหนดเบื้องต้น
Before building and running this project, make sure you have the following installed:

ก่อนที่จะ build และ run โปรเจคนี้ ต้องติดตั้งสิ่งต่อไปนี้:

CMake
Drogon C++
Visual Studio (or any compatible C++ IDE) | Visual Studio (หรือ IDE ที่รองรับ C++)
vcpkg (for dependency management) | vcpkg (สำหรับการจัดการ dependencies)
SQLite3
Git (for version control) | Git (สำหรับการจัดการ version control)
Installing Dependencies | การติดตั้ง Dependency
Clone the project from the Git repository:

Clone โปรเจคจาก Git repository:

bash
คัดลอกโค้ด
git clone https://github.com/weerapolchansawang/Project-Drogon.git
cd helloworld
Install dependencies via vcpkg:

ติดตั้ง dependencies ผ่าน vcpkg:

bash
คัดลอกโค้ด
./vcpkg install brotli:x64-windows c-ares:x64-windows cryptopp:x64-windows drogon:x64-windows fmt:x64-windows jsoncpp:x64-windows jwt-cpp:x64-windows openssl:x64-windows picojson:x64-windows sqlite3:x64-windows trantor:x64-windows zlib:x64-windows
Build
Open the project in Visual Studio or use the command line:

เปิดโปรเจคใน Visual Studio หรือใช้ command line

Use CMake commands to build the project:

ใช้คำสั่ง CMake เพื่อ build โปรเจค:

bash
คัดลอกโค้ด
mkdir build
cd build
cmake ..
cmake --build .
After building, the executable file will be created in the build folder.

หลังจาก build สำเร็จ ไฟล์ executable ของโปรเจคจะถูกสร้างขึ้นในโฟลเดอร์ build

Run
Go to the build folder:

ไปที่โฟลเดอร์ build:

bash
คัดลอกโค้ด
cd build
Run the program using the command:

รันโปรแกรมโดยใช้คำสั่ง:

bash
คัดลอกโค้ด
./helloworld
Or if you are using Windows:

หรือถ้าใช้ Windows:

bash
คัดลอกโค้ด
helloworld.exe
The program will run at http://localhost:8080/index.html. Open a browser and go to this URL to test the functionality.

โปรแกรมจะรันที่ http://localhost:8080/index.html ให้เปิดเบราว์เซอร์และเข้าที่ URL ดังกล่าวเพื่อทดสอบการทำงาน

Usage | การใช้งาน
Go to http://localhost:8080/index.html
The system includes a feature for retrieving transcripts upon login, where users can view course information, grades, and rate each course.
ไปที่หน้า http://localhost:8080/index.html ระบบมีฟีเจอร์สำหรับการดึงข้อมูล transcript โดยการเข้าสู่ระบบ จากนั้นสามารถดูข้อมูลวิชา เกรด และให้ rating แต่ละวิชาได้

Testing Login | การทดสอบการล็อกอิน
Use the following credentials to test the login functionality:

ใช้ชื่อผู้ใช้งานและรหัสผ่านดังนี้เพื่อทดสอบการล็อกอิน:

Username: weerapol
Password: 1234

Debugging | การดีบัก
If there are errors during the build or run process, refer to Debugging in C++ for more details.

หากมีข้อผิดพลาดระหว่างการ build หรือ run สามารถดูรายละเอียดเพิ่มเติมได้ที่ การดีบักใน C++

Additional Information | คำอธิบายเพิ่มเติม
Build: Building is the process of compiling and linking the code to create an executable file. Use cmake .. to set up the build system and cmake --build . to compile the code.

Build: การ build เป็นขั้นตอนในการ compile และ link โค้ด เพื่อสร้างไฟล์ executable ที่สามารถรันได้ โดยใช้คำสั่ง cmake .. ในการตั้งค่า build system และ cmake --build . สำหรับการ compile โค้ด

Run: After building, use the executable file to run the project. If everything is set up correctly, you should be able to open the browser and go to http://localhost:8080/index.html to check the project functionality.

Run: หลังจาก build เสร็จ จะใช้คำสั่งรันไฟล์ executable ของโปรเจค ถ้าทุกอย่างถูกตั้งค่าอย่างถูกต้อง คุณจะสามารถเปิดเบราว์เซอร์และไปที่ http://localhost:8080/index.html เพื่อตรวจสอบฟังก์ชันการทำงานของโปรเจค

Modifying CMakeLists.txt | การแก้ไข CMakeLists.txt
If you need to modify CMakeLists.txt to match the required dependencies, use the following code:

หากคุณต้องการแก้ไข CMakeLists.txt ให้ตรงกับ dependencies และไฟล์ที่ต้องการ สามารถใช้โค้ดด้านล่างนี้:

cmake
คัดลอกโค้ด
cmake_minimum_required(VERSION 3.15)
project(helloworld)

set(CMAKE_TOOLCHAIN_FILE "${CMAKE_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake" CACHE STRING "Vcpkg toolchain file")
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Find dependencies
find_package(Drogon CONFIG REQUIRED)
find_package(fmt CONFIG REQUIRED)
find_package(JsonCpp CONFIG REQUIRED)
find_package(OpenSSL REQUIRED)
find_package(unofficial-sqlite3 CONFIG REQUIRED)
find_package(jwt-cpp CONFIG REQUIRED) # Add this line for jwt-cpp

# Define your executable and source files
set(SOURCES src/main.cpp)
add_executable(${PROJECT_NAME} ${SOURCES})

# Link libraries to the target
target_link_libraries(${PROJECT_NAME} PRIVATE 
    Drogon::Drogon 
    fmt::fmt 
    JsonCpp::JsonCpp 
    OpenSSL::SSL 
    unofficial::sqlite3::sqlite3
    jwt-cpp::jwt-cpp # Link jwt-cpp
)
You can use this file to configure the dependencies of the project correctly.

คุณสามารถใช้ไฟล์นี้เพื่อทำให้การตั้งค่าตรงกับ dependencies ของโปรเจค