export class CallbackHelper {

    static run(callbackArray: Function[]): Promise<any> | void {
        callbackArray.forEach(async (func: Function) => {
            await func();
        });
    }
}