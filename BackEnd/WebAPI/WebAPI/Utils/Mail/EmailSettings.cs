namespace WebAPI.Utils.Mail
{
    public class EmailSettings
    {
        // E-mail do remetente
        public string? Email { get; set; }

        // Senha do remetente
        public string? Password { get; set; }

        // Servidor SMTP
        public string? Host { get; set; }

        // Porta do servidor SMTP
        public int Port { get; set; }

        // Nome de exibição
        public string? DisplayName { get; set; }
    }
}
