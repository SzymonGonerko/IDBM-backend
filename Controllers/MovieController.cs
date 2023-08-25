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
        [HttpGet]
        public ActionResult<IEnumerable<Movie>> GetAll()
        {
            var movies = _dbContext.Movies.ToList();
            return Ok(movies);
        }
        [HttpGet("{title}")]
        public ActionResult<string> GetTitle([FromRoute] string title)
        {
            var movies = _dbContext.Movies.
                Where(x => x.Title == title.ToLower() || x.Title.Contains(title.ToLower())).ToList();
            Console.WriteLine(title);
            return Ok(movies);
        }
    }
}
