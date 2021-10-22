import { Key, MessagePackObject } from "../MessagePackSerializer";
import { BaseMsg } from "./BaseMsg";

@MessagePackObject()
export class LoginRspMsg extends BaseMsg {

    //  非连续key

    @Key(10)
    account: string | null = null;

    @Key(30)
    password: string | null = null;

    @Key(20)
    token: string | null = null;
}