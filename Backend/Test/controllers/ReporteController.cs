using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;



namespace test.Controllers{
    [ApiController]
    [Route("reporte")]
    public class ReporteController() : ControllerBase{
       

        [HttpGet]
        public async Task<IActionResult> GetReporte(){

            var conexionString = Config.GetConnectionString();

            using var conexion = new MySqlConnection(conexionString);
            await conexion.OpenAsync();

            string query = "SELECT * FROM vw_StockProducto";

           

            using var comando = new MySqlCommand(query, conexion);
            using var reader = await comando.ExecuteReaderAsync();

            var resultados = new List<Fila>();

            while (await reader.ReadAsync()){
                resultados.Add(new Fila
                {
                    IdProducto = Convert.ToInt32(reader["idProducto"]),
                    Nombre = reader["nombre"]?.ToString() ?? string.Empty,
                    Precio = Convert.ToDecimal(reader["precio"]),
                    TipoProducto = reader["tipoProducto"].ToString() ?? string.Empty,
                    Cantidad = Convert.ToInt32(reader["cantidad"])
                });
            }

            return Ok(resultados);
        }
    }
}
