#include "FileManager.h"
#include <QFile>
#include <QTextStream>
#include <QStandardPaths>
#include <QFileInfo>

FileManager::FileManager(QObject *parent) : QObject(parent) {
    setupSaveDirectory();
}

void FileManager::setupSaveDirectory() {
    QString documentsPath = QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation);
    QString appSavePath = documentsPath + "/Thinkly/saves";
    m_saveDir = QDir(appSavePath);

    if (!m_saveDir.exists()) {
        m_saveDir.mkpath(".");
    }
}

void FileManager::saveFile(const QString &fileName, const QString &content) {
    QString filePath = m_saveDir.filePath(fileName + ".txt");
    QFile file(filePath);

    if (file.open(QIODevice::WriteOnly | QIODevice::Text)) {
        QTextStream out(&file);
        out << content;
        file.close();
    }
}

QString FileManager::loadFile(const QString &fileName) {
    QString filePath = m_saveDir.filePath(fileName + ".txt");
    QFile file(filePath);

    if (file.open(QIODevice::ReadOnly | QIODevice::Text)) {
        QTextStream in(&file);
        QString content = in.readAll();
        file.close();
        return content;
    }

    return QString();
}

QStringList FileManager::listFiles() {
    QStringList fileList;
    QStringList filters;
    filters << "*.txt";

    QFileInfoList files = m_saveDir.entryInfoList(filters, QDir::Files);
    for (const QFileInfo &fileInfo : files) {
        fileList << fileInfo.baseName();
    }

    return fileList;
}

bool FileManager::deleteFile(const QString &fileName) {
    QString filePath = m_saveDir.filePath(fileName + ".txt");
    return QFile::remove(filePath);
}

QString FileManager::getSavePath() {
    return m_saveDir.absolutePath();
}