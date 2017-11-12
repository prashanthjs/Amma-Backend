import * as Hapi from 'hapi';
import * as Bcrypt from 'bcrypt';
import {DBServerExtended} from '../../../../core/database/database';

export class UserPasswordService {

    constructor(private server: DBServerExtended) {
        this.server.method('userHashPassword', async (request: Hapi.Request, reply: Hapi.ReplyNoContinue) => {
            request.payload.password = await this.hashPassword(request.payload.password);
            reply({});
        });
    }

    hashPassword(password: string) {
        const salt = this.server.getConfig('user.hash') || 10;
        return Bcrypt.hash(password, salt);
    }

     validatePassword(password: string, hashPassword: string) {
        return Bcrypt.compare(password, hashPassword);
    }
}
