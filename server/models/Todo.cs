using System.ComponentModel.DataAnnotations;

namespace server.models
{
    public class Todo
    {

        public Todo(){ }

        public Todo(int id, string description, int userId)
        {
            this.Id = id;
            this.description = description;
            this.UserId = userId;
        }


        [Key]
        public int Id { get; set; }

        [Required]
        public string description { get; set; }
        public int UserId { get; set; }
    }
}