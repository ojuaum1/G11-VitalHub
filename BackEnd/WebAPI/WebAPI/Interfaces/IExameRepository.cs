using WebAPI.Domains;

namespace WebAPI.Interfaces
{
    public interface IExameRepository
    {
        void Cadastrar(Exame exame);

        List<Exame> BuscarPorIdConsulta(Guid idConsulta);
    }
}
