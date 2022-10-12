using Application.Interfaces;
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
    [Route("rebuild")]
    public void RebuildDb()
    {
        _boxService.RebuildDb();
    }
}