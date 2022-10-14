namespace Application.DTO;

public class BoxDTO
{
    public String Name { get; set; }
    public String Color { get; set; }
    public int Thickness { get; set; }
    public int Width { get; set; }
    public int Depth { get; set; }
    public int Height { get; set; }
    public double TotalVolume => Height * Width * Depth;
    
}
