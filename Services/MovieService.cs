using IDBM.DTOs;
using IDBM.entities;
using Microsoft.EntityFrameworkCore;

namespace IDBM.Services
{
    public class MovieService : IMovieService
    {
        private readonly MovieDbContext _dbContext;

        public MovieService(MovieDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<MovieDto>> GetMoviesByLanguageAsync(string language)
        {
            var movies = await _dbContext.Movies
                .Where(m => m.Language.ToLower() == language.ToLower())
                .ToListAsync();

            return movies.Select(MapToMovieDto);
        }

        public async Task<IEnumerable<string>> FlatSearchAsync(string text, string language, string typeData)
        {
            if (string.IsNullOrWhiteSpace(text) || string.IsNullOrWhiteSpace(language))
                return Enumerable.Empty<string>();

            var normalizedText = text.ToLower();
            var normalizedLanguage = language.ToLower();

            if (typeData == "Director")
            {
                var results = await _dbContext.Movies
                    .Where(m => m.Language.ToLower() == normalizedLanguage &&
                                !string.IsNullOrEmpty(m.Director) &&
                                m.Director.ToLower().Contains(normalizedText))
                    .Select(m => m.Director)
                    .Distinct()
                    .Take(30)
                    .ToListAsync();

                return results;
            }

            if (typeData == "Title")
            {
                var results = await _dbContext.Movies
                    .Where(m => m.Language.ToLower() == normalizedLanguage &&
                                !string.IsNullOrEmpty(m.Title) &&
                                m.Title.ToLower().Contains(normalizedText))
                    .Select(m => m.Title)
                    .Distinct()
                    .Take(30)
                    .ToListAsync();

                return results;
            }

            return Enumerable.Empty<string>();
        }

        public async Task<IEnumerable<MovieDto>> DeepSearchAsync(string text, string language, string typeData)
        {
            var normalizedText = text.ToLower();
            var normalizedLanguage = language.ToLower();

            List<Movie> query;

            if (typeData == "Director")
            {
                query = await _dbContext.Movies
                    .Where(m => m.Director.ToLower().Contains(normalizedText) &&
                                m.Language.ToLower() == normalizedLanguage)
                    .ToListAsync();
            }
            else if (typeData == "Title")
            {
                query = await _dbContext.Movies
                    .Where(m => m.Title.ToLower().StartsWith(normalizedText) &&
                                m.Language.ToLower() == normalizedLanguage)
                    .ToListAsync();
            }
            else
            {
                return Enumerable.Empty<MovieDto>();
            }

            return query.Select(MapToMovieDto);
        }

        public async Task<IEnumerable<MovieDto>> SearchByGenresYearsAsync(List<string> genres, int startYear, int endYear, string language, bool trailerOption)
        {
            var query = _dbContext.Movies
                .Where(m => m.Language.ToLower() == language.ToLower() &&
                            m.Year >= startYear &&
                            m.Year <= endYear);

            if (trailerOption)
            {
                query = query.Where(m => m.HasTrailer);
            }

            var matchedMovies = await query.ToListAsync();

            return matchedMovies
                .Where(movie => genres.All(genre => movie.Genre.ToLower().Contains(genre.ToLower())))
                .Select(MapToMovieDto);
        }

        private static MovieDto MapToMovieDto(Movie m) => new MovieDto
        {
            IdWeb = m.IdWeb,
            Title = m.Title,
            Description = m.Description,
            Year = m.Year,
            Genre = m.Genre,
            PosterUrl = m.PosterUrl,
            Actors = m.Actors,
            Director = m.Director,
            HasTrailer = m.HasTrailer,
            Language = m.Language
        };

    }
}
