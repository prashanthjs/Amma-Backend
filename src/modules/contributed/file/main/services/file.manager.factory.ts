import {Server} from "hapi";
import {FileHelper} from "./file.helper";
import {FileValidator} from "./file.validator";
import {FileManager} from "./file.manager";

export class FileManagerFactory {

    constructor(private server: Server) {
    }

    get(type: string, token: string): FileManager {
        const fileHelper = new FileHelper(this.server, type, token);
        return new FileManager(fileHelper, new FileValidator(this.server, fileHelper));
    }
}
