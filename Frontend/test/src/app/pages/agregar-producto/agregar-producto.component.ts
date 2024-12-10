import { Component, OnInit } from '@angular/core';
import { TiposService } from '../../service/tipos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  tipos: any[] = [];
  selectedTipo: string = '';

  constructor(
    private tipo: TiposService, 
    private route: ActivatedRoute, 
    private producto: ProductosService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadData();  

    this.route.params.subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this.tipo.obtenerTipos().subscribe(
      (data) => {
        this.tipos = data;
      },
      (err) => {
        console.log("Error");
      }
    );
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const productoData = {
        Nombre: form.value.nombre,
        Precio: form.value.precio,
        TipoProducto: parseInt(form.value.idTipoProducto, 10), 
        Cantidad: form.value.cantidad
      };
      console.log(productoData);
      this.producto.agregarProductos(productoData).subscribe({
        next: response => {
          console.log('Producto creado exitosamente:', response);
          this.router.navigate(['']); 
        },
        error: (error) => {
          console.error('Error al crear el producto:', error);
        }
      });
    }
  }
}
