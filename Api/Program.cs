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

var mapper = new MapperConfiguration(config =>
    config.CreateMap<BoxDTO, Box>()).CreateMapper();

builder.Services.AddSingleton(mapper);
Application.DependencyResolver.DependencyResolverService.RegisterApplicationLayer(builder.Services);
infrastructure.DependencyResolver.DependencyResolverService.RegisterInfrastructure(builder.Services);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
