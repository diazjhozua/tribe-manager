using tribe_manager.application;
using tribe_manager.infrastructure;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services
        .AddApplication()
        .AddInfrastructure(builder.Configuration);

    builder.Services.AddControllers();
}

var app = builder.Build();
{
    if (builder.Environment.IsProduction())
    {
        app.UseExceptionHandler("/error");
    }

    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}

