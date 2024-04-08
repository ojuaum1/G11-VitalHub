namespace WebAPI.ViewModels
{
    public record GetDoctorByIdViewModel
    (
        Guid doctorId,
        string crm,
        string specialty,
        string neighborhood,
        int? number,
        string cep,
        string city
    );
}
