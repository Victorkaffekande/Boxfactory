using Application.Interfaces;
using Domain.Enteties;

namespace infrastructure;

public class UserRepository : IUserRepository
{
    private readonly DatabaseContext _context;

    public UserRepository(DatabaseContext context)
    {
        _context = context;
    }

    public User GetUserByUsername(String username)
    {
        return _context.UserTable.FirstOrDefault(u => u.Username == username) ?? throw new KeyNotFoundException("No user with that Username: " + username);
    }

    public User CreateNewUser(User user)
    {
        _context.UserTable.Add(user);
        _context.SaveChanges();
        return user;
    }
}