import * as Hapi from 'hapi';
import {UserTokenService} from './user.token.service';
import {UserPasswordService} from './user.password.service';
import {DBServerExtended} from "../../../../core/database/database";

export class UserController {
  constructor(private server: DBServerExtended) {
    this.server.method('userLoginAction', (request, reply) => this.login(request, reply));
    this.server.method('userTokenGenerateAction', (request, reply) => this.getToken(request, reply));
  }

  async login(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    const userTokenService: UserTokenService = this.server.getService('userTokenService');
    try {
      let result: any = await this.authenticate(request.payload.username, request.payload.password);
      if (result) {
        return reply({
          token: userTokenService.signIn(result._id),
          _id: result._id

        });
      }
    } catch (e) {
      this.server.log(e);
    }
    return reply({token: false});
  }

    async getToken(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const userTokenService: UserTokenService = this.server.getService('userTokenService');
        return reply({
            token: userTokenService.signIn('guest'),
        });
    }

  private async authenticate(username: string, password: string) {
    const userPasswordService: UserPasswordService = this.server.getService('userPasswordService');
    const model: any = this.server.getModel('user');
    const user = await model.findOne({
      $or: [
        {username: username},
        {email: username}
      ]
    }, '+password').exec();

    if (!user) {
      return false;
    }
    const result = await userPasswordService.validatePassword(password, user.password);
    return result ? user : false;
  };
}
