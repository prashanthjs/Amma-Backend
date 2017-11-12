import * as Hapi from 'hapi';
import * as _ from 'lodash';
import {DBServerExtended} from '../../../../core/database/database';

export class UserService {

    constructor(private server: DBServerExtended) {

    }

    init() {
        this.server.method('attachUserIdHandler', (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
            request.params.id = _.get(request.auth.credentials, 'user.id', null);
            reply.continue();
        });
    }

}
