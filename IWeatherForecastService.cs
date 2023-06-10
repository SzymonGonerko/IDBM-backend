namespace IDBM
{
    public interface IWeatherForecastService
    {
        IEnumerable<WeatherForecast> Get();
    }
}