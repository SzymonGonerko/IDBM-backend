using IDBM.Services;
using Microsoft.AspNetCore.Mvc;

namespace IDBM.Controllers
{
    [ApiController]
    [Route("Movies")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("get_by-language/{language}")]
        public async Task<IActionResult> GetMoviesByLanguage(string language)
        {
            var movies = await _movieService.GetMoviesByLanguageAsync(language);
            if (!movies.Any())
                return NotFound(new { message = $"No movies found in language '{language}'." });

            return Ok(movies);
        }

        [HttpGet("flatSearch")]
        public async Task<IActionResult> FlatSearch([FromQuery] string text, [FromQuery] string language, [FromQuery] string typeData)
        {
            var results = await _movieService.FlatSearchAsync(text, language, typeData);
            if (!results.Any())
                return NotFound(new { message = "Sorry :( no hints found" });

            return Ok(results);
        }

        [HttpGet("deepSearch")]
        public async Task<IActionResult> DeepSearch([FromQuery] string text, [FromQuery] string language, [FromQuery] string typeData)
        {
            var results = await _movieService.DeepSearchAsync(text, language, typeData);
            if (!results.Any())
                return NotFound(new { message = "Sorry X( no movies found." });

            return Ok(results);
        }

        [HttpGet("searchByGenresYears")]
        public async Task<IActionResult> SearchByGenresYears([FromQuery] List<string> genres, [FromQuery] int startYear, [FromQuery] int endYear, [FromQuery] string language, [FromQuery] bool trailerOption)
        {
            var results = await _movieService.SearchByGenresYearsAsync(genres, startYear, endYear, language, trailerOption);
            if (!results.Any())
                return NotFound(new { message = "Sorry :( No movies for the given filters" });

            return Ok(results);
        }
    }
}
