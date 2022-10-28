using Application.DTO;

namespace Application.Interfaces;

public interface IAuthenticationService
{
    String Register(LoginAndRegisterDto dto);
    String Login(LoginAndRegisterDto dto);
}