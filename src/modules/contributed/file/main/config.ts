import {FileManagerFactory} from "./services/file.manager.factory";
import {FileManager} from "./services/file.manager";
import * as Joi from 'joi';
import {FileController} from "./services/file.controller";

export const config = {
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
                isValid: (fileManager: FileManager): Promise<any> => {
                    return Promise.resolve();
                },
                canUpload: (fileManager: FileManager, file): Promise<any> => {
                    return Promise.resolve();
                },
                canRemove: (fileManager: FileManager, file: string): Promise<any> => {
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
        'fileManagerFactory': FileManagerFactory,
        'fileController': FileController
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
                    maxBytes: 1048576 * 10, // 10MB
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