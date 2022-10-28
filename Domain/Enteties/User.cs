namespace Domain.Enteties;

public class User
{
    public int Id { get; set; }
    public String Username { get; set; }
    public String Hash { get; set; }
    public String Salt { get; set; }
    public String? Role { get; set; }
}