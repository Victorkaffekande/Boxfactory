using Application.Interfaces;
using Domain.Enteties;

namespace Application;

public class BoxService : IBoxService
{
    private IBoxRepository _repo;

    public BoxService(IBoxRepository repo)
    {
        _repo = repo;
    }

    public List<Box> GetAllBoxes()
    {
        return _repo.GetAllBoxes();
    }

    public Box GetBoxById(int id)
    {
        return _repo.GetBoxById(id);
    }

    public void RebuildDb()
    {
        _repo.RebuildDb();   
    }

    public Box UpdateBox(Box box, int id)
    {
        return _repo.UpdateBox(box, id);
    }

    public Box DeleteBox(int id)
    {
        return _repo.DeleteBox(id);
    }

    public Box CreateBox(Box box)
    {
        return _repo.CreateBox(box);
    }
}