import { Axios } from "axios";
import { MessagePackSerializer } from "./MessagePackSerializer";
import { LoginReqMsg } from "./models/LoginReqMsg";
import { LoginRspMsg } from "./models/LoginRspMsg";

let axios = new Axios({
    responseType: 'arraybuffer'
})

async function login(reqMsg: LoginReqMsg): Promise<LoginRspMsg> {
    let sendBytes = MessagePackSerializer.Serialize(reqMsg)
    let data = Buffer.from(sendBytes)
    let ret = await axios.post<Buffer>('http://localhost:2021/login/loginBin', data)
    let bytes = ret.data

    console.log('recv from web : ' + bytes.length + ' bytes')

    let rspMsg = MessagePackSerializer.Deserialize<LoginRspMsg>(bytes, LoginRspMsg)
    return rspMsg
}

export async function test(id: number, account: string | null, password: string | null) {
    let msg = new LoginReqMsg()

    msg.Id = id
    msg.account = account
    msg.password = password
    let rspMsg = await login(msg)

    console.log(rspMsg)
    console.log(`id = ${rspMsg.Id}`)
    console.log(`account = ${rspMsg.account}`)
    console.log(`password = ${rspMsg.password}`)
    console.log(`token = ${rspMsg.token}`)
}
