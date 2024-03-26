namespace WebAPI.ViewModels
{
    public record GetPatientByIdViewModel
    (
        Guid patientId,
        string birthDate,
        string cpf,
        string address,
        string cep,
        string city
    );
}
