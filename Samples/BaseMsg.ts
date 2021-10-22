import { MessagePackObject, Key } from "../MessagePackSerializer";

@MessagePackObject()
export class BaseMsg {

    constructor() {
        this.Id = 0;
    }

    @Key(0)
    Id: number;
}