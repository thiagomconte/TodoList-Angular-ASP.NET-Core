using System.Collections.Generic;
using System.Threading.Tasks;
using server.models;

namespace server.Data
{
    public interface IRepo
    {
         //GERAL
        Task<bool> SaveChangesAsync();

        //TODOS
        Task<Todo[]> GetTodosAsyncByUserId(int userId);
        Task DeleteTodo(int id);
        Task<Todo> AddTodo(Todo todo);

        //USER
        Task AddUser(User user);
        Task DeleteUser(int id);
        Task UpdateUser(User user);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> Authenticate(AuthModel user);
    }
}