using System.Collections;
using Application;
using Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace infrastructure.DependencyResolver;

public static class DependencyResolverService
{
    public static void RegisterInfrastructure(IServiceCollection services)
    {
        services.AddScoped<IBoxRepository, BoxRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
    }
}