cmake_minimum_required(VERSION 3.29)
project(program)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

find_package(Qt6 REQUIRED COMPONENTS
        Core
        Widgets
        WebEngineWidgets
)

set(SOURCES
        main.cpp
        core/MainWindow.cpp
        core/MainWindow.h
        core/WebEngine.cpp
        core/WebEngine.h
)

add_executable(program ${SOURCES})

target_link_libraries(program
        Qt6::Core
        Qt6::Widgets
        Qt6::WebEngineWidgets
)