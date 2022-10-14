﻿using Application.DTO;
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
        return _repo.CreateBox(_mapper.Map<Box>(dto));
    }
}