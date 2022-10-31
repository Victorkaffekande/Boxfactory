using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Application.DTO;
using Application.Helpers;
using Application.Interfaces;
using Domain.Enteties;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Application;

public class AuthenticationService : IAuthenticationService
{
    private readonly IUserRepository _repo;
    private readonly AppSettings _appSettings;
    public AuthenticationService(IUserRepository repo,
        IOptions<AppSettings> appSettings)
    {
        _appSettings = appSettings.Value;
        _repo = repo;
    }

    public string Register(LoginAndRegisterDto dto)
    {
        try
        {
            _repo.GetUserByUsername(dto.Username);
        }
        catch (KeyNotFoundException)
        {
            var salt = RandomNumberGenerator.GetBytes(32).ToString();
            var user = new User()
            {
                Username = dto.Username,
                Salt = salt,
                Hash = BCrypt.Net.BCrypt.HashPassword(dto.Password + salt),
                Role = dto.Role
            };
            _repo.CreateNewUser(user);
            return GenerateToken(user);
        }
        throw new Exception("Username" + dto.Username + " Is already taken");
    }

    private String GenerateToken(User user)
    {
        var key =Encoding.UTF8.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("username", user.Username),new Claim("role", user.Role) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
    }

    public string Login(LoginAndRegisterDto dto)
    {
        var user = _repo.GetUserByUsername(dto.Username);
        if (BCrypt.Net.BCrypt.Verify(dto.Password + user.Salt, user.Hash))
        {
            return GenerateToken(user);
        }
        throw new Exception("Invalid Login");
    }
}