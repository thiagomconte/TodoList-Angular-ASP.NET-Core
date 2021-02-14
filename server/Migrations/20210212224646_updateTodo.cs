using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class updateTodo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "descritpion",
                table: "Todos",
                newName: "description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "description",
                table: "Todos",
                newName: "descritpion");
        }
    }
}
