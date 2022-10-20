using Application.DTO;
using Application.Interfaces;
using Domain.Enteties;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class BoxController : ControllerBase
{
    private IBoxService _boxService;

    public BoxController(IBoxService boxService)
    {
        _boxService = boxService;
    }

    [HttpGet]
    [Route("Rebuild")]
    public void RebuildDb()
    {
        _boxService.RebuildDb();
    }

    [HttpGet()]
    [Route("Boxes")]
    public ActionResult GetAllBoxes()
    {
        return Ok(_boxService.GetAllBoxes());
    }

    [HttpGet]
    [Route("GetBoxById/{id}")]
    public ActionResult<Box> GetSingleBox([FromRoute] int id)
    {
        return Ok(_boxService.GetBoxById(id));
    }

    [HttpPost]
    [Route("CreateBox")]
    public ActionResult<Box> CreateBox(BoxDTO dto)
    {
        try
        {
            var result = _boxService.CreateBox(dto);
            return Created("Box/CreateBox/" + result.Id, result);
        }
        catch (ValidationException e)
        {
            return BadRequest(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpDelete]
    [Route("DeleteBox/{id}")]
    public ActionResult DeleteBox([FromRoute] int id)
    {
        try
        {
            return Ok(_boxService.DeleteBox(id));
        }
        catch (KeyNotFoundException e)
        {
            return NotFound("No box was found with id: " + id);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.ToString());
        }
    }

    [HttpPut]
    [Route("UpdateBox/{id}")]
    public ActionResult UpdateBox([FromBody] Box box, [FromRoute] int id)
    {
        try
        {
            return Ok(_boxService.UpdateBox(box, id));
        }
        catch (KeyNotFoundException e)
        {
            return NotFound("No box was found with id: " + id);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.ToString());
        }
    }
}