using CsvHelper.Configuration.Attributes;

namespace IDBM.entities
{
    public class Movie
    {
        public int? Id { get; set; }
        [Name("title")]
        public string Title { get; set; }

        [Name("year")]
        public string Year { get; set; }

        [Name("directors")]
        public string Directors { get; set; }

        [Name("actors")]
        public string Actors { get; set; }

        [Name("genre")]
        public string Genre { get; set; }

        [Name("plot")]
        public string Plot { get; set; }

        [Name("poster")]
        public string Poster { get; set; }

        [Name("countries")]
        public string Countries { get; set; }

        [Name("url")]
        public string Url { get; set; }
    }
}
