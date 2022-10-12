using Domain.Enteties;

namespace Application.Interfaces;

public interface IBoxRepository
{
    List<Box> GetAllBoxes();
    Box GetBoxById(int id);
    void RebuildDb();
    Box UpdateBox(Box box);
    Box DeleteBox(Box box);
    Box CreateBox(Box box);
}