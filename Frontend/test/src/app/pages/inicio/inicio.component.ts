import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { ReportesService } from '../../service/reportes.service';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProductosService } from '../../service/productos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,  
  imports: [HttpClientModule, CommonModule, RouterModule],  
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ReportesService]  
})
export class InicioComponent implements OnInit {
  reporte: any;

  constructor(
    private generar: ReportesService, 
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    private productos: ProductosService
  ) {}

  ngOnInit(): void {
    this.loadData();  

    this.route.params.subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this.generar.obtenerReportes().subscribe(
      (data) => {
        this.reporte = data;
      },
      (err) => {
        console.log("Error");
      }
    );
  }

  confirmDelete(id: number, nombre: string): void {
    const confirmed = window.confirm(`¿Está seguro de eliminar ${nombre}?`);
    if (confirmed) {
      this.productos.eliminarProductos(id).subscribe(
        () => {
          console.log(`Producto con ID ${id} eliminado.`);
          
          this.loadData();
        },
        (err) => {
          console.log("Error al eliminar el producto", err);
        }
      );
    }
  }
}
