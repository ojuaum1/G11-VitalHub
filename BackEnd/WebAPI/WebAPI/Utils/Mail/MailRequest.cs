namespace WebAPI.Utils.Mail
{
    public class MailRequest
    {
        // Destinatário
        public string? ToEmail { get; set; }

        public string? Subject { get; set; }
        public string? Body { get; set; }
    }
}
