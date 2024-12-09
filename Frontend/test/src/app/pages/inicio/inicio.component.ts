import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { ReportesService } from '../../service/reportes.service';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,  
  imports: [HttpClientModule, CommonModule],  
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ReportesService]  
})
export class InicioComponent implements OnInit {
  reporte: any;

  constructor(private generar: ReportesService, private route: ActivatedRoute) {}

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
}
