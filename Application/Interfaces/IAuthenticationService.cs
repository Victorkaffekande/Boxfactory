using Application.DTO;
using Domain.Enteties;

namespace Application.Interfaces;

public interface IAuthenticationService
{
    String Register(LoginAndRegisterDto dto);
    String Login(LoginAndRegisterDto dto);
}