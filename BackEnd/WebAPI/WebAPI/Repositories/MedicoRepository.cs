using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    
    public class MedicoRepository : IMedicoRepository
    {
        VitalContext ctx = new VitalContext();

        public Medico AtualizarPerfil(Guid Id, MedicoViewModel medico)
        {
            Medico medicoBuscado = ctx.Medicos.FirstOrDefault(x => x.Id == Id);

            if (medicoBuscado == null) return null;

            if (medico.Crm != null)
                medicoBuscado.Crm = medico.Crm;

            if (medico.EspecialidadeId != null)
                medicoBuscado.EspecialidadeId = medico.EspecialidadeId;

            if (medico.Senha != null)
                medicoBuscado.Usuario.Senha = medico.Senha;

            if (medico.Foto != null)
                medicoBuscado.Usuario.Foto = medico.Foto;

            ctx.Medicos.Update(medicoBuscado);
            ctx.SaveChanges();

            return medicoBuscado;   

        }

        public Medico BuscarPorId(Guid Id)
        {
            return ctx.Medicos
                .AsNoTracking()
                .Include(x => x.Endereco)
                .Include(x => x.Especialidade)
                .FirstOrDefault(x => x.Id == Id)!;
        }

        public void Cadastrar(Usuario user)
        {
            user.Senha = Criptografia.GerarHash(user.Senha!);
            ctx.Usuarios.Add(user);
            ctx.SaveChanges();
        }

        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.Select(medico => new Medico
            {
                Id = medico.Id,
                Especialidade = new Especialidade
                {
                    Especialidade1 = medico.Especialidade!.Especialidade1
                },
                Usuario = new Usuario
                {
                    Nome = medico.Usuario!.Nome,
                    Foto = medico.Usuario!.Foto
                }
            }).ToList();
        }
    }
}
