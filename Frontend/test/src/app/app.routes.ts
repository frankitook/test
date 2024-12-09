import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';

export const routes: Routes = [

    {path: '', component:InicioComponent},
    {path: 'productos/nuevo',component:AgregarProductoComponent}
];
