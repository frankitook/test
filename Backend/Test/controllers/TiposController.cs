using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;



namespace test.Controllers{
    [ApiController]
    [Route("tipos")]
    public class TipoController() : ControllerBase{
       

        [HttpGet]
        public async Task<IActionResult> GetTipos(){

            var conexionString = Config.GetConnectionString();

            using var conexion = new MySqlConnection(conexionString);
            await conexion.OpenAsync();

            string query = "SELECT * FROM tipoproductos";


            using var comando = new MySqlCommand(query, conexion);
            using var reader = await comando.ExecuteReaderAsync();

            var resultados = new List<Tipo>();

            while (await reader.ReadAsync()){
                resultados.Add(new Tipo
                {
                    IdTipoProducto = Convert.ToInt32(reader["idTipoProducto"]),
                    Descripcion = reader["descripcion"]?.ToString() ?? string.Empty,
                    
                });
            }

            return Ok(resultados);
        }
    }
}