using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymManagement_API.Migrations
{
    /// <inheritdoc />
    public partial class initDocker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Bmi",
                table: "HealInfos",
                newName: "BMI");

            migrationBuilder.RenameColumn(
                name: "ProgressNote",
                table: "HealInfos",
                newName: "Notes");

            migrationBuilder.RenameColumn(
                name: "Goal",
                table: "HealInfos",
                newName: "MedicalConditions");

            migrationBuilder.AlterColumn<decimal>(
                name: "Weight",
                table: "HealInfos",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<decimal>(
                name: "Height",
                table: "HealInfos",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<decimal>(
                name: "BMI",
                table: "HealInfos",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "HealInfos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Allergies",
                table: "HealInfos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BloodType",
                table: "HealInfos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "BodyFatPercentage",
                table: "HealInfos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastHealthCheckDate",
                table: "HealInfos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "HealInfos");

            migrationBuilder.DropColumn(
                name: "Allergies",
                table: "HealInfos");

            migrationBuilder.DropColumn(
                name: "BloodType",
                table: "HealInfos");

            migrationBuilder.DropColumn(
                name: "BodyFatPercentage",
                table: "HealInfos");

            migrationBuilder.DropColumn(
                name: "LastHealthCheckDate",
                table: "HealInfos");

            migrationBuilder.RenameColumn(
                name: "BMI",
                table: "HealInfos",
                newName: "Bmi");

            migrationBuilder.RenameColumn(
                name: "Notes",
                table: "HealInfos",
                newName: "ProgressNote");

            migrationBuilder.RenameColumn(
                name: "MedicalConditions",
                table: "HealInfos",
                newName: "Goal");

            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "HealInfos",
                type: "float",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<double>(
                name: "Height",
                table: "HealInfos",
                type: "float",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<double>(
                name: "Bmi",
                table: "HealInfos",
                type: "float",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }
    }
}
