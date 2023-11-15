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


        [HttpGet("getAllTitle")]
        public ActionResult GetAllTitle()
        {
            var movies = _dbContext.Movies.ToList();
            var titles = new List<string>();

            foreach (var movie in movies)
            {
                titles.Add(movie.Title);
            }

            MoviesList movieTitles = new MoviesList(titles);
            return Ok(movieTitles.GroupedByTag);
        }

        [HttpGet("getAllDirectors")]
        public ActionResult GetAllDirectors()
        {
            var movies = _dbContext.Movies.ToList();
            var titles = new List<string>();
            
            foreach (var movie in movies)
            {
                List<string> arr = movie.Directors.Split(new char[] { ',' }).ToList();
                foreach (var director in arr)
                {
                    var withoutBrackets = director.Replace("[", string.Empty).Replace("]", string.Empty);
                    var withoutQuote = withoutBrackets.Replace("'", string.Empty).Replace("'", string.Empty);
                    if (withoutQuote != "")
                    {
                        titles.Add(withoutQuote);
                    }
                }

            }
            var result = titles.Distinct().ToList();
            MoviesList movieDirectors = new MoviesList(result);
            return Ok(movieDirectors.GroupedByTag);
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
