using IDBM.DTOs;

namespace IDBM.Services
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieDto>> GetMoviesByLanguageAsync(string language);
        Task<IEnumerable<string>> FlatSearchAsync(string text, string language, string typeData);
        Task<IEnumerable<MovieDto>> DeepSearchAsync(string text, string language, string typeData);
        Task<IEnumerable<MovieDto>> SearchByGenresYearsAsync(List<string> genres, int startYear, int endYear, string language, bool trailerOption);
    }
}
