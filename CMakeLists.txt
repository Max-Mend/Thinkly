cmake_minimum_required(VERSION 3.28)
project(program)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_SCAN_FOR_MODULES OFF)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

find_package(Qt6 REQUIRED COMPONENTS
        Core
        Gui
        Widgets
        WebEngineWidgets
        WebChannel
)

add_executable(program
        main.cpp
        core/MainWindow.cpp
        core/MainWindow.h
        core/FileManager.cpp
        core/FileManager.h
        core/WebEngine.cpp
        core/WebEngine.h
)

target_link_libraries(program
        Qt6::Core
        Qt6::Gui
        Qt6::Widgets
        Qt6::WebEngineWidgets
        Qt6::WebChannel
)

set_target_properties(program PROPERTIES
        WIN32_EXECUTABLE TRUE
        MACOSX_BUNDLE TRUE
)