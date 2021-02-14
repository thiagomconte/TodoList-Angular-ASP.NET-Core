using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.models;
using BC = BCrypt.Net.BCrypt;

namespace server.Data
{
    public class Repo : IRepo
    {
        private readonly Context _context;
        public Repo(Context context)
        {
            _context = context;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        //!TODOS
        public async Task<Todo> AddTodo(Todo todo)
        {
            await _context.Todos.AddAsync(todo);
            return todo;
        }

        public async Task<Todo[]> GetTodosAsyncByUserId(int userId)
        {
            IQueryable<Todo> query = _context.Todos.Where(t => t.UserId == userId);
            return await query.ToArrayAsync();
        }
        public async Task DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo != null)
            {
                _context.Todos.Remove(todo);
            }
        }



        //!USERS
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
            }
        }

        public Task UpdateUser(User user)
        {
            throw new System.NotImplementedException();
        }

        public async Task AddUser(User user)
        {
            user.Password = BC.HashPassword(user.Password);
            await _context.Users.AddAsync(user);
        }

        public async Task<User> Authenticate(AuthModel user)
        {
            var account = await _context.Users.SingleOrDefaultAsync(u => u.Email == user.email);
            if (account == null || !BC.Verify(user.password, account.Password))
            {
                return null;
            }
            else
            {
                return account;
            }
        }
    }
}