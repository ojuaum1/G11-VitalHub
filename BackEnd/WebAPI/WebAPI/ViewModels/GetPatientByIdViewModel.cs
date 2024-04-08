namespace WebAPI.ViewModels
{
    public record GetPatientByIdViewModel
    (
        Guid patientId,
        string birthDate,
        string cpf,
        string neighborhood,
        int? number,
        string cep,
        string city
    );
}
