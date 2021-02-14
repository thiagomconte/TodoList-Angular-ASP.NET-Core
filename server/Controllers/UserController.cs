using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IRepo _repo;
        public UserController(IRepo repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(User user)
        {
            try
            {
                await _repo.AddUser(user);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok("Usuário cadastrado");
                }
                return BadRequest("Error");
            }
            catch (System.Exception)
            {

                return BadRequest("Error");
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthModel user){
            try
            {
                var account = await _repo.Authenticate(user);
                if( account == null ){
                    return BadRequest("Credenciais incorretas");
                }
                var token = TokenService.GenerateToken(account);
                account.Password = "";
                return Ok(new{ account, token});
            }
            catch (System.Exception ex)
            {
                
                return BadRequest($"Credenciais incorretas :{ex}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _repo.GetAllUsers();
                return Ok(users);
            }
            catch (System.Exception)
            {

                return BadRequest("Error");
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                await _repo.DeleteUser(id);
                if( await _repo.SaveChangesAsync()){
                    return Ok("Usuario removido");
                }else{
                    return BadRequest("Error");
                }
            }
            catch (System.Exception)
            {
                
                return BadRequest("Error");
            }
        }

        [HttpGet("isAuth")]
        [Authorize]
        public IActionResult IsAuth(){
            return Ok("Autenticado");
        }
    }
}