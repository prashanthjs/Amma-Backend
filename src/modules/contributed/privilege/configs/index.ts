import {PrivilegeController} from '../services/privilege.controller';

export const config = {
    app: {
        'privilege': {
            'view-privilege': {
                group: 'Privilege',
                title: 'View Privilege',
                description: 'view Privilege'
            },
        }
    },
    services: {
        'privilegeController': PrivilegeController
    },
    routes: {
        privilegeList: {
            method: 'GET',
            path: '/privileges',
            config: {
                handler: 'privilegeListAction',
                auth: {
                    scope: {
                        'view-privilege': 'view-privilege'
                    }
                }
            }
        }
    }
};