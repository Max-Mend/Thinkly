document.addEventListener('DOMContentLoaded', () => {
    const addFileBtn = document.getElementById('addFileBtn');
    const filesList = document.getElementById('filesList');
    const textarea = document.getElementById('textArea');
    const welcomeMessage = document.getElementById('welcomeMessage');
    let saveTimer = null;

    const isQtEnvironment = typeof qt !== 'undefined' && qt.webChannelTransport;
    let files = [];
    let currentFileName = '';
    let currentFileIndex = -1;

    function toggleTextarea(show) {
        if (show) {
            textarea.style.display = 'block';
            welcomeMessage.style.display = 'none';
        } else {
            textarea.style.display = 'none';
            welcomeMessage.style.display = 'flex';
        }
    }

    function saveFile() {
        if (isQtEnvironment) {
            if (currentFileName) {
                window.fileManager.saveFile(currentFileName, textarea.value);
            }
        } else {
            if (currentFileIndex !== -1) {
                files[currentFileIndex].content = textarea.value;
                localStorage.setItem('userFiles', JSON.stringify(files));
            }
        }
    }

    function renderFiles() {
        if (isQtEnvironment) {
            window.fileManager.listFiles(function(fileList) {
                filesList.innerHTML = '';

                fileList.forEach(function(fileName) {
                    createFileElement(fileName, () => openFile(fileName), () => deleteFile(fileName));
                });

                if (fileList.length === 0) {
                    toggleTextarea(false);
                    currentFileName = '';
                }
            });
        } else {
            files = JSON.parse(localStorage.getItem('userFiles')) || [];
            filesList.innerHTML = '';

            files.forEach((file, index) => {
                createFileElement(file.name, () => openFile(file.name, index), () => deleteFile(file.name, index));
            });

            if (files.length === 0) {
                toggleTextarea(false);
                currentFileIndex = -1;
            }
        }
    }

    function createFileElement(fileName, onOpen, onDelete) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
                    </svg> 
                </span>
                <span class="file-name">${fileName}</span>
            </div>
            <div class="file-actions">
                <button class="file-btn delete">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            </div>
        `;

        const fileInfo = fileItem.querySelector('.file-info');
        const deleteBtn = fileItem.querySelector('.delete');

        fileInfo.addEventListener('click', onOpen);
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            onDelete();
        });

        filesList.appendChild(fileItem);
    }

    addFileBtn.addEventListener('click', () => {
        const fileName = prompt('Enter file name:');
        if (fileName) {
            if (isQtEnvironment) {
                window.fileManager.saveFile(fileName, '');
                renderFiles();
                openFile(fileName);
            } else {
                files.push({
                    name: fileName,
                    content: '',
                    created: new Date().toISOString()
                });
                localStorage.setItem('userFiles', JSON.stringify(files));
                renderFiles();
                openFile(fileName, files.length - 1);
            }
        }
    });

    function openFile(fileName, index) {
        if (isQtEnvironment) {
            window.fileManager.loadFile(fileName, function(content) {
                textarea.value = content || '';
                currentFileName = fileName;
                toggleTextarea(true);
                textarea.focus();
            });
        } else {
            textarea.value = files[index].content;
            currentFileIndex = index;
            currentFileName = fileName;
            toggleTextarea(true);
            textarea.focus();
        }
    }

    function deleteFile(fileName, index) {
        if (confirm(`Delete file "${fileName}"?`)) {
            if (isQtEnvironment) {
                window.fileManager.deleteFile(fileName, function(success) {
                    if (success && currentFileName === fileName) {
                        textarea.value = '';
                        currentFileName = '';
                    }
                    renderFiles();
                });
            } else {
                if (currentFileIndex === index) {
                    textarea.value = '';
                    currentFileIndex = -1;
                }
                files.splice(index, 1);
                localStorage.setItem('userFiles', JSON.stringify(files));
                renderFiles();
            }
        }
    }

    textarea.addEventListener('input', () => {
        if (saveTimer) {
            clearTimeout(saveTimer);
        }

        saveTimer = setTimeout(() => {
            saveFile();
        }, 500);
    });

    textarea.addEventListener('blur', () => {
        saveFile();
    });

    window.addEventListener('beforeunload', () => {
        saveFile();
    });

    if (isQtEnvironment) {
        new QWebChannel(qt.webChannelTransport, function(channel) {
            window.fileManager = channel.objects.fileManager;
            renderFiles();
        });
    } else {
        renderFiles();
    }
});

function initFileSystem() {
    const addFileBtn = document.getElementById('addFileBtn');
    const filesList = document.getElementById('filesList');
    const textarea = document.getElementById('textArea');
    const welcomeMessage = document.getElementById('welcomeMessage');
    let saveTimer = null;

    const isQtEnvironment = typeof window.fileManager !== 'undefined';
    let files = [];
    let currentFileName = '';
    let currentFileIndex = -1;

    function toggleTextarea(show) {
        if (show) {
            textarea.style.display = 'block';
            welcomeMessage.style.display = 'none';
        } else {
            textarea.style.display = 'none';
            welcomeMessage.style.display = 'flex';
        }
    }

    function saveFile() {
        if (isQtEnvironment) {
            if (currentFileName) {
                window.fileManager.saveFile(currentFileName, textarea.value);
            }
        } else {
            if (currentFileIndex !== -1) {
                files[currentFileIndex].content = textarea.value;
                localStorage.setItem('userFiles', JSON.stringify(files));
            }
        }
    }

    function renderFiles() {
        if (isQtEnvironment) {
            window.fileManager.listFiles(function(fileList) {
                filesList.innerHTML = '';

                fileList.forEach(function(fileName) {
                    createFileElement(fileName, () => openFile(fileName), () => deleteFile(fileName));
                });

                if (fileList.length === 0) {
                    toggleTextarea(false);
                    currentFileName = '';
                }
            });
        } else {
            files = JSON.parse(localStorage.getItem('userFiles')) || [];
            filesList.innerHTML = '';

            files.forEach((file, index) => {
                createFileElement(file.name, () => openFile(file.name, index), () => deleteFile(file.name, index));
            });

            if (files.length === 0) {
                toggleTextarea(false);
                currentFileIndex = -1;
            }
        }
    }

    function createFileElement(fileName, onOpen, onDelete) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
                    </svg> 
                </span>
                <span class="file-name">${fileName}</span>
            </div>
            <div class="file-actions">
                <button class="file-btn delete">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            </div>
        `;

        const fileInfo = fileItem.querySelector('.file-info');
        const deleteBtn = fileItem.querySelector('.delete');

        fileInfo.addEventListener('click', onOpen);
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            onDelete();
        });

        filesList.appendChild(fileItem);
    }

    addFileBtn.addEventListener('click', () => {
        const fileName = prompt('Enter file name:');
        if (fileName) {
            if (isQtEnvironment) {
                window.fileManager.saveFile(fileName, '');
                renderFiles();
                setTimeout(() => openFile(fileName), 100);
            } else {
                files.push({
                    name: fileName,
                    content: '',
                    created: new Date().toISOString()
                });
                localStorage.setItem('userFiles', JSON.stringify(files));
                renderFiles();
                openFile(fileName, files.length - 1);
            }
        }
    });

    function openFile(fileName, index) {
        if (isQtEnvironment) {
            window.fileManager.loadFile(fileName, function(content) {
                textarea.value = content || '';
                currentFileName = fileName;
                toggleTextarea(true);
                textarea.focus();
            });
        } else {
            textarea.value = files[index].content;
            currentFileIndex = index;
            currentFileName = fileName;
            toggleTextarea(true);
            textarea.focus();
        }
    }

    function deleteFile(fileName, index) {
        if (confirm(`Delete file "${fileName}"?`)) {
            if (isQtEnvironment) {
                window.fileManager.deleteFile(fileName, function(success) {
                    if (success && currentFileName === fileName) {
                        textarea.value = '';
                        currentFileName = '';
                    }
                    renderFiles();
                });
            } else {
                if (currentFileIndex === index) {
                    textarea.value = '';
                    currentFileIndex = -1;
                }
                files.splice(index, 1);
                localStorage.setItem('userFiles', JSON.stringify(files));
                renderFiles();
            }
        }
    }

    textarea.addEventListener('input', () => {
        if (saveTimer) {
            clearTimeout(saveTimer);
        }

        saveTimer = setTimeout(() => {
            saveFile();
        }, 500);
    });

    textarea.addEventListener('blur', () => {
        saveFile();
    });

    window.addEventListener('beforeunload', () => {
        saveFile();
    });

    renderFiles();
}

if (typeof qt !== 'undefined' && qt.webChannelTransport) {
    new QWebChannel(qt.webChannelTransport, function(channel) {
        window.fileManager = channel.objects.fileManager;
        initFileSystem();
    });
} else {
    document.addEventListener('DOMContentLoaded', initFileSystem);
}