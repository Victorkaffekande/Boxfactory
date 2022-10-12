using Application.Interfaces;
using Domain.Enteties;
using SQLitePCL;

namespace infrastructure;

public class BoxRepository : IBoxRepository
{
    private readonly BoxDbContext _context;
    public BoxRepository(BoxDbContext context)
    {
        _context = context;
    }

    public List<Box> GetAllBoxes()
    {
        throw new NotImplementedException();
    }

    public Box GetBoxById(int id)
    {
        throw new NotImplementedException();
    }

    public void RebuildDb()
    {
        _context.Database.EnsureDeleted();
        _context.Database.EnsureCreated();
    }

    public Box UpdateBox(Box box)
    {
        throw new NotImplementedException();
    }

    public Box DeleteBox(Box box)
    {
        throw new NotImplementedException();
    }

    public Box CreateBox(Box box)
    {
        throw new NotImplementedException();
    }
}