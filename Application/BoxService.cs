using Application.DTO;
using Application.Interfaces;
using AutoMapper;
using Domain.Enteties;

namespace Application;

public class BoxService : IBoxService
{
    private IBoxRepository _repo;
    private IMapper _mapper;

    public BoxService(IBoxRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
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

    public Box CreateBox(BoxDTO dto)
    {
        Box box = _mapper.Map<Box>(dto);
        double totalValue = box.Depth * box.Height * box.Width;
        box.TotalVolume = totalValue;
            
        return _repo.CreateBox(box);
    }
}