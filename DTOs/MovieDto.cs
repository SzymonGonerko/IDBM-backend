namespace IDBM.DTOs
{
    public class MovieDto
    {
        public int IdWeb { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Year { get; set; }
        public string Genre { get; set; }
        public string PosterUrl { get; set; }
        public string Actors { get; set; }
        public string Director { get; set; }
        public bool HasTrailer { get; set; }
        public string Language { get; set; }
    }
}
