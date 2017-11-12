import {config} from './config';

class FileModule {

    static getConfig() {
        return config;
    }
}
module.exports = FileModule;