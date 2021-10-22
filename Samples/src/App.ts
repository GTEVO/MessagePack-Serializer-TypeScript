import { Axios } from "axios";
import { MessagePackSerializer } from "./MessagePackSerializer";
import { LoginReqMsg } from "./models/LoginReqMsg";
import { LoginRspMsg } from "./models/LoginRspMsg";

let axios = new Axios({
    responseType: 'arraybuffer'
})

async function login(): Promise<LoginRspMsg> {
    let ret = await axios.get<Buffer>('http://localhost:2021/login/login?account=test&pwd=1234')
    let bytes = ret.data
    let msg = MessagePackSerializer.Deserialize<LoginRspMsg>(bytes, LoginRspMsg)
    return msg
}

function logHelper(tag: string, obj: unknown) {
    console.log(tag)
    console.log(obj)
    console.log('------------------------------------')
}

function test1() {
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

async function test2() {
    let rspMsg = await login()
    console.log(rspMsg)

    console.log(rspMsg.Id)
    console.log(rspMsg.account)
    console.log(rspMsg.password)
    console.log(rspMsg.token)
}

async function main() {
    test1()
    await test2()
}

main();