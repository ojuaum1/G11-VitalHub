using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository _medicoRepository;
        public MedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_medicoRepository.ListarTodos());
        }

        [HttpGet("BuscarPorID/{doctorId:Guid}")]
        public IActionResult BuscarPorID([FromRoute] Guid doctorId)
        {
            var unformattedDoctor = _medicoRepository.BuscarPorId(doctorId);

            string formattedAddress = $"{unformattedDoctor.Endereco!.Logradouro}, {unformattedDoctor.Endereco.Numero}";
            string formattedCep = Convert.ToUInt64(unformattedDoctor.Endereco.Cep).ToString(@"00000\-000");

            var response = new GetDoctorByIdViewModel(
                doctorId: unformattedDoctor.Id,
                specialty: unformattedDoctor.Especialidade!.Especialidade1!,
                crm: unformattedDoctor.Crm!,
                address: formattedAddress,
                cep: formattedCep,
                city: unformattedDoctor.Endereco!.Cidade!
            );

            return Ok(response);
        }

        [Authorize]
        [HttpPut]
        public IActionResult AtualizarPerfil(MedicoViewModel medico)
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(_medicoRepository.AtualizarPerfil(idUsuario, medico));
        }


        [HttpPost]
        public IActionResult Post(MedicoViewModel medicoModel)
        {
            Usuario user = new Usuario();

            user.Nome = medicoModel.Nome;
            user.Email = medicoModel.Email;
            user.TipoUsuarioId = medicoModel.IdTipoUsuario;
            user.Foto = medicoModel.Foto;
            user.Senha = medicoModel.Senha;

            user.Medico = new Medico();

            user.Medico.Crm = medicoModel.Crm;
            user.Medico.EspecialidadeId = medicoModel.EspecialidadeId;

            _medicoRepository.Cadastrar(user);

            return Ok();
        }

        [HttpGet("BuscarConsultasPorData")]
        public IActionResult BuscarPorData(DateTime data, Guid id)
        {
            return Ok(_medicoRepository.ListarConsultasPorData(data, id));
        }

        [HttpGet("BuscarPorIdClinica")]
        public IActionResult GetByIdClinica(Guid id)
        {

            return Ok(_medicoRepository.ListarPorClinica(id)); ;
        }
    }
}
