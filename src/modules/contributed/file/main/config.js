"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_factory_1 = require("./services/file.manager.factory");
const Joi = require("joi");
const file_controller_1 = require("./services/file.controller");
exports.config = {
    app: {
        file: {
            test: {
                uploadDir: __dirname + '/../' + 'storage',
                min: 0,
                max: 3,
                ext: ['.jpg', '.jpeg', '.png', '.gif'],
                minFileSize: 1048576 / 4,
                maxFileSize: 1048576 * 10,
                // string i.e, server method or validation function
                isValid: (fileManager) => {
                    return Promise.resolve();
                },
                canUpload: (fileManager, file) => {
                    return Promise.resolve();
                },
                canRemove: (fileManager, file) => {
                    return Promise.resolve();
                }
            }
        },
        privilege: {
            'view-file-privilege': {
                group: 'File',
                title: 'View file'
            },
            'upload-file-privilege': {
                group: 'File',
                title: 'Upload file'
            },
            'remove-file-privilege': {
                group: 'File',
                title: 'Remove file'
            }
        }
    },
    services: {
        'fileManagerFactory': file_manager_factory_1.FileManagerFactory,
        'fileController': file_controller_1.FileController
    },
    routes: {
        fileList: {
            method: 'GET',
            path: '/file/{type}/{token}',
            config: {
                handler: 'fileListAction',
                auth: {
                    scope: {
                        'view-file-privilege': 'view-file-privilege'
                    }
                }
            }
        },
        fileView: {
            method: 'GET',
            path: '/file/{type}/{token}/{fileName}',
            config: {
                handler: 'fileViewAction',
                auth: false
            }
        },
        fileUpload: {
            method: 'POST',
            path: '/file/{type}/{token}',
            config: {
                handler: 'fileUploadAction',
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data',
                    maxBytes: 1048576 * 10,
                },
                validate: {
                    payload: {
                        file: Joi.object().required()
                    }
                },
                auth: false
            }
        },
        fileRemove: {
            method: 'DELETE',
            path: '/file/{type}/{token}/{fileName}',
            config: {
                handler: 'fileRemoveAction',
                auth: {
                    scope: {
                        'remove-file-privilege': 'remove-file-privilege'
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=config.js.map