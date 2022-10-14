using Domain.Enteties;

namespace Application.Interfaces;

public interface IBoxRepository
{
    List<Box> GetAllBoxes();
    Box GetBoxById(int id);
    void RebuildDb();
    Box UpdateBox(Box box, int id);
    Box DeleteBox(int id);
    Box CreateBox(Box box);
}