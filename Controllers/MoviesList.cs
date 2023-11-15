namespace IDBM.Controllers
{
    public class MoviesList
    {
        public Dictionary<char, List<string>> GroupedByTag { get; set; }
        
        public MoviesList(List<string> listOfTags)
        {
            char[] charsList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
            GroupedByTag = new Dictionary<char, List<string>>();
            for (int i = 0; i < listOfTags.Count; i++)
            {
                char firstLetter = listOfTags[i][0];
                bool statement = charsList.Contains(firstLetter);

                if (!GroupedByTag.ContainsKey(firstLetter) && statement)
                {
                    GroupedByTag[firstLetter] = new List<string>();
                }
                if (listOfTags[i].StartsWith(firstLetter) && statement)
                {
                    GroupedByTag[firstLetter].Add(listOfTags[i]);
                }
            }
        }
       
    }
}
