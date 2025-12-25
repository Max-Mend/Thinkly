#include "MainWindow.h"
#include <QUrl>
#include <QDir>
#include <QFileInfo>
#include <QDebug>

MainWindow::MainWindow(QWidget *parent) : QMainWindow(parent) {
    m_webView = new QWebEngineView(this);
    setCentralWidget(m_webView);

    QString htmlPath = QDir::currentPath() + "/../ui/index.html";
    QString absolutePath = QFileInfo(htmlPath).absoluteFilePath();

    m_webView->load(QUrl::fromLocalFile(absolutePath));

    setWindowTitle("Thinkly");
    resize(1200, 800);
}

MainWindow::~MainWindow() {
    if (m_webView) {
        m_webView->stop();
        m_webView->setUrl(QUrl());
        m_webView->deleteLater();
        m_webView = nullptr;
    }
}