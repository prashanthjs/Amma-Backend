import {config} from './config';

class DbModule {

    static getConfig() {
        return config;
    }
}
module.exports = DbModule;