using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;


namespace test.Controllers
{
    [ApiController]
    [Route("productos")]
    public class ProductoController : ControllerBase
    {
        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarProducto(int id)
        {
            var conexionString = Config.GetConnectionString();

            using var conexion = new MySqlConnection(conexionString);
            await conexion.OpenAsync();

            //ACA TAMBIEN PUEDE USARSE UNA QUERY 
            using var comando = new MySqlCommand("sp_EliminarProducto", conexion)
            {
                CommandType = System.Data.CommandType.StoredProcedure
            };

            comando.Parameters.AddWithValue("@idprod", id);

            var resultado = await comando.ExecuteNonQueryAsync();

            if (resultado > 0)
            {
                return Ok(new { mensaje = "Producto eliminado exitosamente." });
            }
            else
            {
                return NotFound(new { mensaje = "Producto no encontrado." });
            }
        }

    [HttpPost("agregar")]
    public async Task<IActionResult> AgregarProducto([FromBody] Dictionary<string, object> producto){
    var conexionString = Config.GetConnectionString();

    using var conexion = new MySqlConnection(conexionString);
    await conexion.OpenAsync();

    using var comando = new MySqlCommand("sp_InsertarProducto", conexion)
    {
        CommandType = System.Data.CommandType.StoredProcedure
    };

    comando.Parameters.AddWithValue("@nom", producto["Nombre"]);
    comando.Parameters.AddWithValue("@prec", producto["Precio"]);
    comando.Parameters.AddWithValue("@idtipo", producto["TipoProducto"]);
    comando.Parameters.AddWithValue("@cant", producto["Cantidad"]);

    await comando.ExecuteNonQueryAsync();

    return Ok("Producto agregado con éxito.");
}

    [HttpPut("modificar")]
    public async Task<IActionResult> ModificarProducto([FromBody] Dictionary<string,object> producto){

        var conexionString = Config.GetConnectionString();
        using var conexion = new MySqlConnection(conexionString);
        await conexion.OpenAsync();

         using var comando = new MySqlCommand("sp_ModificarProducto", conexion){
        CommandType = System.Data.CommandType.StoredProcedure
    };

    comando.Parameters.AddWithValue("@idprod", producto["IdProducto"]);
    comando.Parameters.AddWithValue("@nom", producto["Nombre"]);
    comando.Parameters.AddWithValue("@prec", producto["Precio"]);
    comando.Parameters.AddWithValue("@idtipo", producto["TipoProducto"]);
    comando.Parameters.AddWithValue("@cant", producto["Cantidad"]);

    await comando.ExecuteNonQueryAsync();

    return Ok("Producto modificado con éxito.");

}

    }
}
