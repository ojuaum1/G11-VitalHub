using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Utils.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecuperarSenhaController : ControllerBase
    {
        private readonly VitalContext _context;
        private readonly EmailSendingService _emailSendingService;

        public RecuperarSenhaController(EmailSendingService emailSendingService)
        {
            _context = new VitalContext();
            _emailSendingService = emailSendingService;
        }

        [HttpPost]
        public async Task<IActionResult> SendRecoveryCodePassword(string email)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return NotFound("E-mail inválido!");
                }

                Random random = new Random();
                int recoveryCode = random.Next(1000, 9999);

                user.CodRecupSenha = recoveryCode;

                await _context.SaveChangesAsync();

                await _emailSendingService.SendRecoveryEmail(user.Email!, recoveryCode);

                return Ok("Código de confirmação enviado com sucesso.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ValidateRecoveryCode")]
        public async Task<IActionResult> ValidateRecoveryCode(string email, int code)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return NotFound("E-mail inválido!");
                }

                if (user.CodRecupSenha != code)
                {
                    return BadRequest("Código de recuperação é inválido!");
                }

                user.CodRecupSenha = null;

                await _context.SaveChangesAsync();

                return Ok("Código de recureperação confirmado.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
