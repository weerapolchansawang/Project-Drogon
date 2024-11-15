# Project-Drogon Installation and Setup Guide
# คู่มือการติดตั้งและตั้งค่า Project-Drogon

## Prerequisites | สิ่งที่ต้องมี
- CMake
- vcpkg

### Required vcpkg packages | แพ็คเกจที่ต้องติดตั้งผ่าน vcpkg:
```bash
vcpkg install fmt:x64-windows
vcpkg install jsoncpp:x64-windows
vcpkg install openssl:x64-windows
vcpkg install unofficial-sqlite3:x64-windows
vcpkg install jwt-cpp:x64-windows
```

## Installation Steps | ขั้นตอนการติดตั้ง

### 1. Clone the Repository | โคลนโปรเจค
Open Terminal or Command Prompt and navigate to your desired project location (e.g., C:\Project)  
เปิด Terminal หรือ Command Prompt แล้วไปยังตำแหน่งที่ต้องการเก็บโปรเจค (เช่น C:\Project)

```bash
git clone https://github.com/weerapolchansawang/Project-Drogon.git
```
This will download all project files into a folder named 'Project-Drogon'  
คำสั่งนี้จะดาวน์โหลดไฟล์โปรเจคทั้งหมดลงในโฟลเดอร์ชื่อ 'Project-Drogon'

### 2. Open Project | เปิดโปรเจค
Open the Project-Drogon folder in VS Code or your preferred IDE  
เปิดโฟลเดอร์ Project-Drogon ผ่าน VS Code หรือโปรแกรมที่คุณใช้

### 3. Open PowerShell | เปิด PowerShell
Press Ctrl+J to open the terminal in VS Code  
กด Ctrl+J เพื่อเปิด terminal ใน VS Code

### 4. Navigate to Debug Directory | ไปยังไดเรกทอรี Debug
```bash
cd build/debug
```
You should see: `C:\[Your Path]\Project-Drogon\build\debug>`  
ผลลัพธ์ที่ได้จะเป็น: `C:\[พาทที่เก็บไฟล์ของคุณ]\Project-Drogon\build\debug>`

### 5. Run the Application | รันแอปพลิเคชัน
Execute one of these commands:  
รันด้วยคำสั่งใดคำสั่งหนึ่ง:
```bash
./helloworld
# or | หรือ
.\helloworld.exe
```

### Successful Output | ผลลัพธ์เมื่อสำเร็จ
You should see:  
คุณจะเห็นข้อความ:
```
Current working directory: "C:\[Your Path]\Project-Drogon\build\debug"
20241115 09:08:52.492000 UTC 15212 INFO Server is listening on port 8080 - main.cpp:181
```

## Accessing the Application | การเข้าใช้งานแอปพลิเคชัน

1. Open your web browser | เปิดเว็บเบราว์เซอร์
2. Go to | ไปที่: http://localhost:8080/
3. Click "Load Transcript" to log in | คลิก "Load Transcript" เพื่อล็อกอิน

### Login Credentials | ข้อมูลเข้าสู่ระบบ
- Username: weerapol
- Password: 1234

## Troubleshooting | การแก้ไขปัญหาเบื้องต้น
If you encounter any issues, make sure:  
หากพบปัญหา ให้ตรวจสอบ:

1. All vcpkg packages are properly installed  
   แพ็คเกจ vcpkg ทั้งหมดถูกติดตั้งอย่างถูกต้อง
2. You are in the correct directory when running the application  
   คุณอยู่ในไดเรกทอรีที่ถูกต้องเมื่อรันแอปพลิเคชัน
3. Port 8080 is not being used by another application  
   พอร์ต 8080 ไม่ได้ถูกใช้งานโดยแอปพลิเคชันอื่น
