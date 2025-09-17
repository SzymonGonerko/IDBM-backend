using CsvHelper.Configuration.Attributes;

namespace IDBM.entities
{
    public class Movie
    {
        public int Id { get; set; }

        [Name("ID")]
        public int IdWeb { get; set; }

        [Name("Tytuł")]
        public string Title { get; set; }

        [Name("Opis")]
        public string Description { get; set; }

        [Name("Rok")]
        public int Year { get; set; }

        [Name("Gatunek")]
        public string Genre { get; set; }

        [Name("Plakat")]
        public string PosterUrl { get; set; }

        [Name("Aktorzy")]
        public string Actors { get; set; }

        [Name("Reżyser")]
        public string Director { get; set; }

        [Name("Trailer")]
        public bool HasTrailer { get; set; }

        [Name("Język")]
        public string Language { get; set; }
    }
}
