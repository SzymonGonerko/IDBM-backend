using IDBM;
using IDBM.entities;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddDbContext<MovieDbContext>();
builder.Services.AddScoped<MoviesSeeder>();
builder.Services.AddControllers();

var provider = builder.Services.BuildServiceProvider();
var config = provider.GetRequiredService<IConfiguration>();
builder.Services.AddCors(setup => 
{
    var frontendURL = config.GetValue<string>("Frontend_url");
    setup.AddDefaultPolicy(builder => 
    {
        builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader();
    });
});


// NLog: Setup NLog for Dependency injection
builder.Logging.ClearProviders();
builder.Host.UseNLog();


var app = builder.Build();

// Configure the HTTP request pipeline.

var scope = app.Services.CreateScope();
var seeder = scope.ServiceProvider.GetRequiredService<MoviesSeeder>();
seeder.Seed();


app.UseHttpsRedirection();

app.UseCors();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
