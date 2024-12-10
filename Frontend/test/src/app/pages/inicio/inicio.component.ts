import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { ReportesService } from '../../service/reportes.service';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProductosService } from '../../service/productos.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,  
  imports: [HttpClientModule, CommonModule, RouterModule],  
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ReportesService],
  
})
export class InicioComponent implements OnInit {
  reporte: any[] = [];
  productoSeleccionado: any;
  


  constructor(
    private generar: ReportesService, 
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    private productos: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarReporte();  
    this.route.params.subscribe(() => {
      this.cargarReporte();
    });

  }

  cargarReporte(): void {
    this.generar.obtenerReportes().subscribe(
      (data) => {
        this.reporte = data;
        
      },
      (err) => {
        console.log("Error");
      }
    );
  }

  confirmarEliminacion(id: number, nombre: string): void {
    const confirmed = window.confirm(`¿Está seguro de eliminar ${nombre}?`);
    if (confirmed) {
      this.productos.eliminarProductos(id).subscribe(
        () => {
          console.log(`Producto con ID ${id} eliminado.`);
          this.cargarReporte(); 
        },
        (err) => {
          console.log("Error al eliminar el producto", err);
        }
      );
    }
  }

  modificarProducto(producto: any): void {
    this.productoSeleccionado = producto;
    this.router.navigate(['/productos/modificar', { producto: JSON.stringify(this.productoSeleccionado) }]);
   
  }

  
}
