using Application.DTO;
using AutoMapper;
using Domain.Enteties;
using FluentValidation;
using infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<BoxDbContext>(options => options.UseSqlite("Data source=db.db"));

builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());

var mapper = new MapperConfiguration(config =>
    config.CreateMap<BoxDTO, Box>()).CreateMapper();

builder.Services.AddSingleton(mapper);
Application.DependencyResolver.DependencyResolverService.RegisterApplicationLayer(builder.Services);
infrastructure.DependencyResolver.DependencyResolverService.RegisterInfrastructure(builder.Services);

builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(options => {
        options.AllowAnyOrigin();
        options.AllowAnyHeader();
        options.AllowAnyMethod();
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
