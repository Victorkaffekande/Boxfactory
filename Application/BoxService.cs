using Application.DTO;
using Application.Interfaces;
using Application.Validators;
using AutoMapper;
using Domain.Enteties;
using FluentValidation;

namespace Application;

public class BoxService : IBoxService
{
    private IBoxRepository _repo;
    private IMapper _mapper;
    private IValidator<BoxDTO> _BoxDtoValidator;
    private IValidator<Box> _boxValidator;

    public BoxService(IBoxRepository repo,
        IMapper mapper,
        IValidator<BoxDTO> boxDtoValidator,
        IValidator<Box> boxValidator)
    {
        _repo = repo;
        _mapper = mapper;
        _BoxDtoValidator = boxDtoValidator;
        _boxValidator = boxValidator;
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
        var val = _boxValidator.Validate(box);
        if (!val.IsValid) throw new ValidationException(val.ToString());
        return _repo.UpdateBox(box, id);
    }

    public Box DeleteBox(int id)
    {
        return _repo.DeleteBox(id);
    }

    public Box CreateBox(BoxDTO dto)
    {
        var val = _BoxDtoValidator.Validate(dto);
        if (!val.IsValid) throw new ValidationException(val.ToString());

        return _repo.CreateBox(_mapper.Map<Box>(dto));
    }
}