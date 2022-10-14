using Domain.Enteties;

namespace Application.Interfaces;

public interface IBoxService
{
    public List<Box> GetAllBoxes();

    public Box GetBoxById(int id);

    public void RebuildDb();

    public Box UpdateBox(Box box, int id);

    public Box DeleteBox(int id);

    public Box CreateBox(Box box);
}