import { MessagePackSerializer } from "./MessagePackSerializer";
import { LoginReqMsg } from "./models/LoginReqMsg";

function logHelper(tag: string, obj: unknown) {
    console.log(tag)
    console.log(obj)
    console.log('------------------------------------')
}

export function test() {
    let reqMsg = new LoginReqMsg()
    reqMsg.Id = 256
    reqMsg.account = 'ABCabc'
    reqMsg.password = '123'
    reqMsg.token = '~!@#$%^&*()_+'

    logHelper('原始 msg :', reqMsg)

    let reqBytes = MessagePackSerializer.Serialize(reqMsg)
    logHelper('序列化 原始msg  得到 byte数组 :', reqBytes)

    let reqObj = MessagePackSerializer.Deserialize<LoginReqMsg>(reqBytes, LoginReqMsg)
    logHelper('反序列化 上面的 byte数组 得到消息obj :', reqObj)

    reqBytes = MessagePackSerializer.Serialize(reqObj)
    logHelper('序列化 上面的 消息obj 得到 byte数组:', reqBytes)
}
