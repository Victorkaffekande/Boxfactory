using Domain.Enteties;

namespace Application.Interfaces;

public interface IBoxService
{
    public List<Box> GetAllBoxes();

    public Box GetBoxById(int id);

    public void RebuildDb();

    public Box UpdateBox(Box box);

    public Box DeleteBox(Box box);

    public Box CreateBox(Box box);
}