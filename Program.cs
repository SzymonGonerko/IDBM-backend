using IDBM;
using IDBM.entities;
using IDBM.Services;
using Microsoft.EntityFrameworkCore;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Host.UseNLog();

builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseConnection")));


builder.Services.AddScoped<MoviesSeeder>();


builder.Services.AddScoped<IMovieService, MovieService>();


var appInsightsConnection = builder.Configuration["ApplicationInsights:ConnectionString"];
builder.Services.AddControllers();
builder.Services.AddApplicationInsightsTelemetry();


var provider = builder.Services.BuildServiceProvider();
var config = provider.GetRequiredService<IConfiguration>();
builder.Services.AddCors(options =>
{
    var frontendURL = config.GetValue<string>("Frontend_url");
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(frontendURL)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<MoviesSeeder>();
    seeder.Seed();
}


app.UseHttpsRedirection();
app.UseCors();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();
