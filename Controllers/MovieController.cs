using IDBM.entities;
using Microsoft.AspNetCore.Mvc;

namespace IDBM.Controllers
{
    [Route("Movies")]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _dbContext;
        public MovieController(MovieDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("getAll")]
        public ActionResult<IEnumerable<Movie>> GetAll()
        {
            var movies = _dbContext.Movies.ToList();
            return Ok(movies);
        }


        [HttpPost("getByTitle")]
        public ActionResult<IEnumerable<Movie>> GetTitle([FromBody] FrontendData data)
        {
            var title = data.Title;
            var movies = _dbContext.Movies.
                Where(x => x.Title == title.ToLower() || x.Title.Contains(title.ToLower())).ToList();
            Console.WriteLine(title);
            return Ok(movies);
        }


        [HttpPost("getByGenres")]
        public ActionResult<IEnumerable<Movie>> GetGenre([FromBody] List<FrontendData> data)
        {
            var selected = new List<string>();
            foreach (var rec in data)
            {
                if (rec.IsSelected)
                {
                    selected.Add(rec.Genre);
                }
            }
            var movies = _dbContext.Movies.ToList();
            var result = new List<Movie>();
            foreach (var rec in movies)
            {
                bool isContainsAll = selected.All(x => rec.Genre.Contains(x));
                if (isContainsAll) { result.Add(rec); }
            }
            return Ok(result);
        }
    }
}
