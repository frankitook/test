import { Component, OnInit } from '@angular/core';
import { TiposService } from '../../service/tipos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-modificar-producto',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {
  tipos: any[] = [];
  producto: any = {}; 
  productoModificado: any={};

  constructor(
    private tipo: TiposService, 
    private route: ActivatedRoute, 
    private router: Router ,
    private prod:ProductosService
  ) {}

  ngOnInit(): void {
    this.cargarProducto();
    this.cargarTipos();  
  }

  cargarTipos(): void {
    this.tipo.obtenerTipos().subscribe(
      (data) => {
        this.tipos = data;
  
        if (this.producto.tipoProducto) {
          
          this.producto.idTipoProducto = this.tipos.find(
            tipo => tipo.descripcion === this.producto.tipoProducto
          )?.idTipoProducto;
        }
      },
      (err) => {
        console.log("Error al obtener tipos de productos", err);
      }
    );
  }
  

  cargarProducto(): void {
    const productoData = this.route.snapshot.paramMap.get('producto'); 
    if (productoData) {
      this.producto = JSON.parse(productoData);
     
      if (this.tipos.length) {
        this.producto.idTipoProducto = this.tipos.find(tipo => tipo.descripcion === this.producto.tipoProducto)?.idTipoProducto;
      }
    }
  }

  onSubmit(form: any): void {
    if (form.valid) {

      this.productoModificado.IdProducto = this.producto.idProducto;
      this.productoModificado.TipoProducto = parseInt(form.value.idTipoProducto, 10);
      this.productoModificado.Nombre = form.value.nombre;
      this.productoModificado.Precio = form.value.precio;
      this.productoModificado.Cantidad = form.value.cantidad;
      
      console.log(this.productoModificado);
      
      this.prod.modificarProducto(this.productoModificado).subscribe({
        next: response => { 
          this.router.navigate(['']);

        },
        error: (error) => {
          console.error('Error al modificar el producto:', error);
        }
      })
     
    }
  }
}
