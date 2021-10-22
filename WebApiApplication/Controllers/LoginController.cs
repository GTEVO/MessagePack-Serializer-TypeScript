using Microsoft.AspNetCore.Mvc;
using System;
using System.Buffers;
using System.Threading.Tasks;
using MessagePack;

namespace WebApiApplication.Controllers
{
    [MessagePackObject]
    public struct LoginReqMsg
    {
        [Key(0)] public int Id;

        [Key(1)] public string Account;

        [Key(2)] public string Password;

        [Key(3)] public string Token;
    }

    [MessagePackObject]
    public struct LoginRspMsg
    {
        [Key(0)] public int Id;

        [Key(10)] public string Account;

        [Key(30)] public string Password;

        [Key(20)] public string Token;
    }

    [ApiController]
    [Route("[controller]/[action]")]
    public class LoginController : ControllerBase
    {
        [HttpGet]
        public async Task Login([FromQuery] string account, [FromQuery] string pwd)
        {
            var rsp = new LoginRspMsg() {
                Id = 16,
                Account = account,
                Password = pwd,
                Token = null,
            };
            var bytes = MessagePackSerializer.Serialize(rsp);
            await HttpContext.Response.BodyWriter.WriteAsync(new ReadOnlyMemory<byte>(bytes));
        }

        [HttpPost]
        public async Task LoginBin()
        {
            var resultResult = await HttpContext.Request.BodyReader.ReadAsync();
            await HttpContext.Request.BodyReader.CompleteAsync();
            var reqMsg = MessagePackSerializer.Deserialize<LoginReqMsg>(resultResult.Buffer);

            var rsp = new LoginRspMsg() {
                Id = reqMsg.Id + 1,
                Account = reqMsg.Account,
                Password = reqMsg.Password,
                Token = Guid.NewGuid().ToString(),
            };
            var bytes = MessagePackSerializer.Serialize(rsp);
            var writeResult = await HttpContext.Response.BodyWriter.WriteAsync(new ReadOnlyMemory<byte>(bytes));
            await HttpContext.Response.BodyWriter.CompleteAsync();
        }
    }
}
