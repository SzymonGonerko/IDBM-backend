using CsvHelper;
using CsvHelper.Configuration;
using IDBM.entities;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace IDBM
{
    public class MoviesSeeder
    {
        private readonly MovieDbContext _dbContext;
        public MoviesSeeder(MovieDbContext dbContext) {
            _dbContext = dbContext;


        }
        public void Seed ()
        {
            if (_dbContext.Database.CanConnect()) 
            {
                if (!_dbContext.Movies.Any())
                {
                    var movies = GetMovies<Movie>();
                    for (int i = 0; i < 100;  i++)
                    {
                        Console.WriteLine(movies[i].Title);
                    }
                    _dbContext.Movies.AddRange(movies);
                    _dbContext.SaveChanges();

                }
            
            }

        }

        public List<T> GetMovies<T>()
        {
            CsvConfiguration config = new CsvHelper.Configuration.CsvConfiguration(CultureInfo.InvariantCulture);
            List<T> movies;
            config.MissingFieldFound = null;
            config.BadDataFound = null;
            config.Delimiter = ",";
            string basicPath = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\.."));
            using (var reader = new StreamReader(basicPath + "\\final.csv"))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                movies = csv.GetRecords<T>().ToList();
            }
            return movies;
        }
    }
}
