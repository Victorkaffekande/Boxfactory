using Domain.Enteties;

namespace Application.Interfaces;

public interface IUserRepository
{

    public User GetUserByUsername(String username);


    public User CreateNewUser(User user);
}