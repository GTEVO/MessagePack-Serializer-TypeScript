import { MessagePackObject, Key } from "../MessagePackSerializer";
import { BaseMsg } from "./BaseMsg";

@MessagePackObject()
export class LoginReqMsg extends BaseMsg {

    constructor() {
        super();
        this.Account = 'default';
    }

    @Key(2)
    Account: string;
}