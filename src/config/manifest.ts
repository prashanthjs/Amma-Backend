
const manifest = {
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                cors: true
            }
        },
        app: {
            db: {
                uri: "mongodb://localhost/ammacart-api",
                options: {
                    useMongoClient: true
                }
            },
            serverBaseUrl: 'http://localhost:5555/',
            file: {
                mart: {
                    uploadDir: __dirname + '/../../file-storage/mart'
                },
                user: {
                    uploadDir: __dirname + '/../../file-storage/user'
                },
                category: {
                    uploadDir: __dirname + '/../../file-storage/mart'
                },
                product: {
                    uploadDir: __dirname + '/../../file-storage/mart'
                }
            }

        }
    },
    connections: [{
        port: 5555,
        host: null
    }],
    registrations: [
        {
            plugin: 'inert'
        },
        {
            plugin: {
                register: 'good',
                options: {
                    reporters: {
                        console: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{log: '*', response: '*'}]
                        }, {
                            module: 'good-console'
                        }, 'stdout']
                    }
                }
            }
        },
        {
            plugin: 'halacious'
        },
        {
            plugin: 'hapi-auth-jwt'
        },
    ]
};
export = manifest;
