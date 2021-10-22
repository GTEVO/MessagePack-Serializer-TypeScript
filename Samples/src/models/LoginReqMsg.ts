import { MessagePackObject, Key } from "../MessagePackSerializer";
import { BaseMsg } from "./BaseMsg";

@MessagePackObject()
export class LoginReqMsg extends BaseMsg {

    //  连续key

    @Key(1)
    account: string | null = null;

    @Key(2)
    password: string | null = null;

    @Key(3)
    token: string | null = null;
}