using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessagePack;

namespace WebApiApplication.Controllers
{
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
        public void Login([FromQuery] string account, [FromQuery] string pwd)
        {
            var rsp = new LoginRspMsg() {
                Id = 16,
                Account = account,
                Password = pwd,
                Token = null,
            };
            var bytes = MessagePackSerializer.Serialize(rsp);
            HttpContext.Response.BodyWriter.Write(new ReadOnlySpan<byte>(bytes));
        }
    }
}
