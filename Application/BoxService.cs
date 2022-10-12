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
        throw new NotImplementedException();
    }

    public Box GetBoxById(int id)
    {
        throw new NotImplementedException();
    }

    public void RebuildDb()
    {
        _repo.RebuildDb();   
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