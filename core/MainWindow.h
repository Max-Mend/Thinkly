#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QtWebEngineWidgets/QWebEngineView>
#include <QtWebEngineCore/QWebEngineProfile>

class MainWindow : public QMainWindow{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow() override;

private:
    QWebEngineView *m_webView;
};

#endif //MAINWINDOW_H