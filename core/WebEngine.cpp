#include "WebEngine.h"
#include <QVBoxLayout>
#include <QUrl>
#include <QDir>

WebEngine::WebEngine(QWidget *parent) : QWidget(parent) {
    m_webView = new QWebEngineView(this);

    QVBoxLayout *layout = new QVBoxLayout(this);
    layout->setContentsMargins(0, 0, 0, 0);
    layout->addWidget(m_webView);

    QString htmlPath = QDir::currentPath() + "../ui/index.html";
    m_webView->load(QUrl::fromLocalFile(htmlPath));
}

WebEngine::~WebEngine() {
    if (m_webView) {
        m_webView->setPage(nullptr);
        delete m_webView;
        m_webView = nullptr;
    }
}