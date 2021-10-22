import { MessagePackObject } from "../MessagePackSerializer";

//@MessagePackObject()
export class LoginRspMsg extends Array<any> {

    /*
    constructor(items?: Array<any>) {
        super();
        if (Array.isArray(items)) {
            for (const item of items) {
                this.push(item);
            }
        }
        Object.setPrototypeOf(this, LoginRspMsg.prototype);

        this.Account = 'default';
    }
    */

    constructor(items?: Array<any>) {
        super();
        Object.setPrototypeOf(this, LoginRspMsg.prototype);
    }

    public get Account(): string {
        return this[10];
    }
    public set Account(value: any) {
        this[10] = value;
    }
}