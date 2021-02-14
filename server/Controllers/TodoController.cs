using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
        private readonly IRepo _repo;
        public TodoController(IRepo repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo(Todo todo){
            try
            {
                var todoReturned = await _repo.AddTodo(todo);
                if(await _repo.SaveChangesAsync()){
                    return Ok(todoReturned);
                }else{
                    return BadRequest("Error");
                }
            }
            catch (System.Exception ex)
            {
                
                return BadRequest($"Error :{ex}");
            }
        }

        [HttpGet("getTodosByUserId/{id}")]
        public async Task<IActionResult> GetTodosByUserId(int id){
            try
            {
                var todo = await _repo.GetTodosAsyncByUserId(id);
                return Ok(todo);
            }
            catch (System.Exception)
            {
                
                return BadRequest("Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id){
            try
            {
                await _repo.DeleteTodo(id);
                if( await _repo.SaveChangesAsync()){
                    return Ok("Tarefa removida");
                }else{
                    return BadRequest("Error");
                }
            }
            catch (System.Exception)
            {
                
                return BadRequest("Error");
            }
        }
    }
}