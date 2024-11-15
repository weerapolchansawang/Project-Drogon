# # แก้ไข `CMakeLists.txt`

# cmake_minimum_required(VERSION 3.15)
# project(helloworld)

# set(CMAKE_TOOLCHAIN_FILE "${CMAKE_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake" CACHE STRING "Vcpkg toolchain file")
# set(CMAKE_CXX_STANDARD 17)
# set(CMAKE_CXX_STANDARD_REQUIRED True)

# find_package(Drogon CONFIG REQUIRED)
# find_package(fmt CONFIG REQUIRED)
# find_package(JsonCpp CONFIG REQUIRED)
# find_package(OpenSSL REQUIRED)

# # Include directory ของ jwt-cpp
# include_directories("C:/vcpkg/installed/x64-windows/include")

# include_directories("C:/vcpkg/installed/x64-windows/include")
# link_directories("C:/vcpkg/installed/x64-windows/lib")

# set(SOURCES src/main.cpp)
# #set(SOURCES test_database.cpp)

# add_executable(${PROJECT_NAME} ${SOURCES})

# target_link_libraries(${PROJECT_NAME} PRIVATE Drogon::Drogon fmt::fmt sqlite3 JsonCpp::JsonCpp OpenSSL::SSL)


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
