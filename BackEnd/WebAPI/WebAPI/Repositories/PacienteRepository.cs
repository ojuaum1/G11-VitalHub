using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        VitalContext ctx = new VitalContext();

        public Paciente AtualizarPerfil(Guid Id, PacienteViewModel paciente)
        {
            Paciente pacienteBuscado = ctx.Pacientes
                .Include(x => x.Endereco)
                
                .FirstOrDefault(x => x.Id == Id);

            if (pacienteBuscado == null)
                return null;

            if (paciente.DataNascimento != null)
                pacienteBuscado.DataNascimento = paciente.DataNascimento;

            if (paciente.Cep != null)
                pacienteBuscado.Endereco.Cep = paciente.Cep;

            if (paciente.Logradouro != null)
                pacienteBuscado.Endereco.Logradouro = paciente.Logradouro;

            if (paciente.Numero != null)
                pacienteBuscado.Endereco.Numero = paciente.Numero;

            if (paciente.Cidade != null)
                pacienteBuscado.Endereco.Cidade = paciente.Cidade;

            ctx.Pacientes.Update(pacienteBuscado);
            ctx.SaveChanges();

            return pacienteBuscado;
        }

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idPaciente)
        {
            return ctx.Consultas
                 .Include(x => x.Situacao)
                 .Include(x => x.Prioridade)
                 .Include(x => x.MedicoClinica)
                 .Include(x => x.MedicoClinica!.Clinica)
                 .Include(x => x.MedicoClinica!.Clinica!.Endereco)
                 .Include(x => x.MedicoClinica!.Medico)
                 .Include(x => x.MedicoClinica!.Medico!.Usuario)
                 .Include(x => x.MedicoClinica!.Medico!.Especialidade)
                 .Where(x => x.PacienteId == idPaciente && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                 .ToList();
        }

        public List<Consulta> BuscarAgendadas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Agendada").ToList();
        }

        public List<Consulta> BuscarCanceladas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Cancelada").ToList();
        }

        public Paciente BuscarPorId(Guid Id)
        {
            return ctx.Pacientes
                .AsNoTracking()
                .Select(paciente => new Paciente
                {
                    Id = paciente.Id,
                    DataNascimento = paciente.DataNascimento,
                    Rg = paciente.Rg,
                    Cpf = paciente.Cpf,
                    EnderecoId = paciente.EnderecoId,
                    Endereco = new Endereco
                    {
                        Cep = paciente.Endereco!.Cep,
                        Numero = paciente.Endereco.Numero,
                        Logradouro = paciente.Endereco.Logradouro,
                        Cidade = paciente.Endereco.Cidade
                    },
                    Usuario = paciente.Usuario
                }).FirstOrDefault(x => x.Id == Id)!;
        }

        public List<Consulta> BuscarRealizadas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Realizada").ToList();
        }

        public void Cadastrar(Usuario user)
        {
            user.Senha = Criptografia.GerarHash(user.Senha!);
            ctx.Usuarios.Add(user);
            ctx.SaveChanges();
        }
    }
}
