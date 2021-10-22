# MessagePackSerializer-Ts
MessagePack TS版，与C#版本  MessagePack-CSharp 对应

dependencies：@msgpack/msgpack

1、在Int Key 的模式下，序列化、反序列化 MessagePack-CSharp的格式

2、支持继承

# 示例说明

包含2个示例：
    
    Test4Ts.ts 演示了对象在客户端使用 msgpack 序列化/反序列化

    TestByHttp.ts 演示了msg对象在客户端序列化后，通过http发送到web服务器，web服务器将Id加1后，
    返回了应答消息的msgpack序列化二进制，客户端使用 msgpack 反序列化后得到msg对象
