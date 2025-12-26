#ifndef FILEMANAGER_H
#define FILEMANAGER_H

#include <QDir>
#include <QString>
#include <QStringList>

class FileManager : public QObject {
    Q_OBJECT

public:
    explicit FileManager(QObject *parent = nullptr);

    Q_INVOKABLE void saveFile(const QString &fileName, const QString &content);
    Q_INVOKABLE QString loadFile(const QString &fileName);
    Q_INVOKABLE QStringList listFiles();
    Q_INVOKABLE bool deleteFile(const QString &fileName);
    Q_INVOKABLE QString getSavePath();

private:
    QDir m_saveDir;
    void setupSaveDirectory();
};

#endif // FILEMANAGER_H