import * as Hapi from 'hapi';
import * as _ from 'lodash';
import * as JWT from 'jsonwebtoken';
import {DBServerExtended} from '../../../../core/database/database';

export interface ICallback {
    (err: any, bool: boolean, credentials?: any): void;
}

export interface ICredential {
    userId: string;
}

export class UserTokenService {

    authConfig;

    constructor(private server: DBServerExtended) {

    }

    init() {
        this.authConfig = this.server.getConfig('auth');

        this.server.auth.strategy('defaultLogin', 'jwt', {
            key: this.authConfig.key,
            verifyOptions: this.authConfig.verifyOptions,
            validateFunc: async (request, decodedToken, callback) => {
                await this.validate(request, decodedToken, callback);
            }
        });

        this.server.auth.default('defaultLogin');
    }

    async validate(request: Hapi.Request, decodedToken: ICredential, callback: ICallback) {

        if (!decodedToken['userId']) {
            return callback(null, false);
        }

        let user: any = {};
        if (decodedToken['userId'] === 'guest') {
            user = {_id: 'guest'};
        } else {
            user = await this.server.getModel('user').findById(decodedToken['userId']);
        }

        if (!user) {
            return callback(null, false);
        }

        let userGroup = _.get(user, 'userGroup', this.server.getConfig('defaultUnAuthenticatedUserGroup'));
        const resultScope: any = await this.server.getModel('user-group').findOne({name: userGroup});
        return callback(null, true, {user: user, scope: _.get(resultScope, 'privileges', [])});

    }

    signIn(id: string) {
        return JWT.sign({userId: id}, this.authConfig.key, this.authConfig.verifyOptions);
    }
}
