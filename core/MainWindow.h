#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QtWebEngineWidgets/QWebEngineView>
#include <QtWebEngineCore/QWebEngineProfile>
#include <QtWebChannel/QWebChannel>
#include "FileManager.h"

class MainWindow : public QMainWindow{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow() override;

private:
    QWebEngineView *m_webView;
    QWebChannel *m_webChannel;
    FileManager *m_fileManager;
};

#endif //MAINWINDOW_H