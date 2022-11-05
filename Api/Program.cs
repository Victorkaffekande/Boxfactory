using System.Text;
using Application.DTO;
using Application.Helpers;
using Application.Interfaces;
using AutoMapper;
using Domain.Enteties;
using FluentValidation;
using infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlite("Data source=db.db"));

builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());

var mapper = new MapperConfiguration(config =>
    config.CreateMap<BoxDTO, Box>()).CreateMapper();

builder.Services.AddSingleton(mapper);
builder.Services.AddScoped<IUserRepository, UserRepository>();
Application.DependencyResolver.DependencyResolverService.RegisterApplicationLayer(builder.Services);
infrastructure.DependencyResolver.DependencyResolverService.RegisterInfrastructure(builder.Services);
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = false,
        ValidateIssuer = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration.GetValue<String>("AppSettings:Secret")))
    };
});
builder.Services.AddAuthorization(option =>
{
    option.AddPolicy("AdminPolicy", (policy) => { policy.RequireRole("Admin"); });
});


builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
{
    options.SetIsOriginAllowed(origin => true)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
});


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();