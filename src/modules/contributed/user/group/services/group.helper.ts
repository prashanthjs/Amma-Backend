import {DBServerExtended} from '../../../../core/database/database';
import * as Hapi from 'hapi';
import * as Boom from 'boom';

export class GroupHelper {

    constructor(private server: DBServerExtended) {
        this.server.method('attachDefaultUserGroupHandler', (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
            request.payload.userGroup = this.server.getConfig('defaultAuthenticatedUserGroup');
            reply.continue();
        });

        this.server.method('validateUserGroupHandler', async (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
            await this.validateUserGroup(request, reply);
        });
    }

    async validateUserGroup(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {

        const filterName = this.server.getRouteConfig<string>(request, 'userGroupFieldName') || 'userGroup';

        if (!request.payload.hasOwnProperty(filterName) || !request.payload[filterName]) {
            return reply.continue();
        }
        let userGroup = request.payload[filterName];
        if (!Array.isArray(userGroup)) {
            userGroup = [userGroup];
        }
        if (userGroup.length) {
            for (let i = 0; i < userGroup.length; i++) {
                let value = userGroup[i];
                if (!await this.checkWhetherUserGroupExists(value)) {
                    return reply(Boom.badData('Invalid user group: ' + value));
                }
            }
        }
        return reply.continue();
    }

    private async checkWhetherUserGroupExists(mart) {
        const model = this.server.getModel('user-group');
        try {
            const result = await model.findOne({name: mart}, '_id name');
            if (result) {
                return true;
            }
        } catch (e) {

        }
        return false;
    }
}
