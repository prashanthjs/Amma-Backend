import * as Hapi from 'hapi';
import * as _ from 'lodash';
import {DBServerExtended} from '../../../core/database/database';

export class PrivilegeController {

    constructor(private server: DBServerExtended) {
        this.server.method('privilegeListAction', this.getList);
    }

    getList = (request: Hapi.Request, reply: Hapi.ReplyNoContinue) => {
        const privilegesObject: Object = this.server.getConfig('privilege') || {};
        const privilegeArray = this.parse(privilegesObject);
        reply({
            docs: privilegeArray,
            total: privilegeArray.length
        });
    };

    parse(privileges): Object[] {
        const privilegesArray = [];
        _.forEach(privileges, (privilege, key) => {
            if (!privilege.hasOwnProperty('_id')) {
                privilege._id = key;
            }
            privilegesArray.push(privilege);
        });
        return privilegesArray;
    }
}
