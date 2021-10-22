import { MessagePackObject, Key } from "../MessagePackSerializer";

@MessagePackObject()
export class BaseMsg {

    @Key(0)
    Id: number = 0;
}