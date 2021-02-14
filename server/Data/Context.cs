using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.models;

namespace server.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options){ }
            public DbSet<Todo> Todos { get; set; }
            public DbSet<User> Users { get; set; }

        internal Task<IEnumerable<User>> ToListAsync()
        {
            throw new NotImplementedException();
        }
    }
}