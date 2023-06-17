using IDBM.entities;
using Microsoft.AspNetCore.Mvc;

namespace IDBM.Controllers
{
    [Route("api/Movie")]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _dbContext;
        public MovieController(MovieDbContext dbContext) 
        {
            _dbContext = dbContext;
        }
        public ActionResult<IEnumerable<Movie>> GetAll()
        {
            var movies = _dbContext.Movies.ToList();
            return Ok(movies);
        }
    }
}
