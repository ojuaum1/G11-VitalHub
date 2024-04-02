namespace WebAPI.ViewModels
{
    public record GetDoctorByIdViewModel
    (
        Guid doctorId,
        string crm,
        string specialty,
         string address,
        string cep,
        string city
    );
}
