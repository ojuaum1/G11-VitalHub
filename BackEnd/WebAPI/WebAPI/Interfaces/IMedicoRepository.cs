using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IMedicoRepository
    {
        public void Cadastrar(Usuario user);
        public List<Medico> ListarTodos();

        public Medico BuscarPorId(Guid Id);

        public Medico AtualizarPerfil(Guid Id, MedicoViewModel medico);

        public List<Consulta> ListarConsultasPorData(DateTime dataConsulta, Guid idMedico);
    }
}
