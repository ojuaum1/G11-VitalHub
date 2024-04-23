namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest request);
    }
}
