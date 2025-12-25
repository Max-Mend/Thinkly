#ifndef WEBENGINE_H
#define WEBENGINE_H

#include <QWidget>
#include <QtWebEngineWidgets/QWebEngineView>

class WebEngine : public QWidget {
    Q_OBJECT
public:
    explicit WebEngine(QWidget *parent = nullptr);
    ~WebEngine() override;

private:
    QWebEngineView *m_webView;
};

#endif //WEBENGINE_H