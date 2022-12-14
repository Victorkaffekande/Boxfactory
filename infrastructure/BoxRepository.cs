using Application.Interfaces;
using Domain.Enteties;
using SQLitePCL;

namespace infrastructure;

public class BoxRepository : IBoxRepository
{
    private readonly DatabaseContext _context;

    public BoxRepository(DatabaseContext context)
    {
        _context = context;
    }

    public List<Box> GetAllBoxes()
    {
        return _context.BoxTable.ToList();
    }

    public Box GetBoxById(int id)
    {
        return _context.BoxTable.Find(id);
    }

    public void RebuildDb()
    {
        _context.Database.EnsureDeleted();
        _context.Database.EnsureCreated();
    }

    public Box UpdateBox(Box box, int id)
    {
        var oldBox = GetBoxById(id);
        if (oldBox.Id.Equals(box.Id))
        {
            oldBox.Color = box.Color;
            oldBox.Depth = box.Depth;
            oldBox.Height = box.Height;
            oldBox.Name = box.Name;
            oldBox.Thickness = box.Thickness;
            oldBox.Width = box.Width;
        }

        _context.BoxTable.Update(oldBox ?? throw new InvalidOperationException());
        _context.SaveChanges();
        return box;
    }

    public Box DeleteBox(int id)
    {
        var movie = _context.BoxTable.Find(id);
        _context.BoxTable.Remove(movie ?? throw new InvalidOperationException());
        _context.SaveChanges();
        return movie;
    }

    public Box CreateBox(Box box)
    {
        _context.BoxTable.Add(box ?? throw new InvalidOperationException());
        _context.SaveChanges();
        return box;
    }
}