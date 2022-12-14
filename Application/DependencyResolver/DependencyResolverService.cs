using Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Application.DependencyResolver;

public static class DependencyResolverService
{
    public static void RegisterApplicationLayer(IServiceCollection service)
    {
        service.AddScoped<IBoxService, BoxService>();
        service.AddScoped<IAuthenticationService, AuthenticationService>();
    }
}