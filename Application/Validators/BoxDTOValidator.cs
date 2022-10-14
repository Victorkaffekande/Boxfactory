using Application.DTO;
using FluentValidation;

namespace Application.Validators;

public class BoxDTOValidator : AbstractValidator<BoxDTO>
{
    public BoxDTOValidator()
    {
        RuleFor(b => b.Name).NotNull();
        RuleFor(b => b.Name).NotEmpty();

        RuleFor(b => b.Color).NotEmpty();
        RuleFor(b => b.Thickness).GreaterThan(0);
        RuleFor(b => b.Width).GreaterThan(0);
        RuleFor(b => b.Depth).GreaterThan(0);
        RuleFor(b => b.Height).GreaterThan(0);

        RuleFor(b => b.TotalVolume.Equals(b.Depth * b.Height * b.Height));
    }
}