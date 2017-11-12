import * as Bootstrap from './bootstrap/index';
import * as Glue from 'glue';
import * as Hapi from 'hapi';
import * as AppConfig from './config/manifest';
import * as CorsHeaders from 'hapi-cors-headers';
import {modules} from './config/modules';

const options = {
    relativeTo: __dirname
};

Glue.compose(AppConfig, options, async (err: any, server: Hapi.Server) => {
    if (err) {
        server.log('info', err);
        throw err;
    }
    server.ext('onPreResponse', CorsHeaders);
    try {
        await Bootstrap(server, modules);
        await server.start();
    } catch (error) {
        server.log('info', error);
    }
    server.log('info', 'server started');
});