using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;

public static class Config
{
    private static IConfiguration conf;

    public static void Configure(IConfiguration configuration)
    {
        conf = configuration;
    }

    public static string GetConnectionString()
    {
        var connectionString = conf.GetConnectionString("DefaultConnection");

        if (connectionString == null)
        {
            throw new InvalidOperationException("DefaultConnection no está configurada.");
        }

        return connectionString;
    }

    public static MySqlConnection GetConnection()
    {
        return new MySqlConnection(GetConnectionString());
    }
}
