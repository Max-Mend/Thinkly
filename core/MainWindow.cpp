#include "MainWindow.h"
#include <QUrl>
#include <QDir>
#include <QFileInfo>

MainWindow::MainWindow(QWidget *parent) : QMainWindow(parent) {
    m_webView = new QWebEngineView(this);
    setCentralWidget(m_webView);

    m_fileManager = new FileManager(this);

    m_webChannel = new QWebChannel(this);
    m_webChannel->registerObject("fileManager", m_fileManager);

    m_webView->page()->setWebChannel(m_webChannel);

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