import { MessagePackSerializer } from "../MessagePackSerializer";
import { LoginReqMsg } from "./LoginReqMsg";

let reqMsg = new LoginReqMsg()
reqMsg.Id = 123;
reqMsg.Account = 'zh';

let bytes = MessagePackSerializer.Serialize(reqMsg);
console.log(bytes);

reqMsg.Id = 256
reqMsg.Account = 'a'

let reqBytes = MessagePackSerializer.Serialize(reqMsg);
console.log(reqBytes)
let reqObj = MessagePackSerializer.Deserialize<LoginReqMsg>(reqBytes, LoginReqMsg);
console.log(reqObj);
reqBytes = MessagePackSerializer.Serialize(reqObj);
console.log(reqBytes)