using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymManagement_API.Migrations
{
    /// <inheritdoc />
    public partial class defaultvalue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "MembershipId",
                table: "Users",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "Email", "Firstname", "IsAdmin", "Lastname", "MembershipId", "Password", "Phone", "Username" },
                values: new object[] { new Guid("9e29f03a-9dbc-4436-96c5-f403627c5e89"), null, "admin@gym.com", "Admin", true, "User", null, "Admin@123", null, "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("9e29f03a-9dbc-4436-96c5-f403627c5e89"));

            migrationBuilder.AlterColumn<Guid>(
                name: "MembershipId",
                table: "Users",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);
        }
    }
}
