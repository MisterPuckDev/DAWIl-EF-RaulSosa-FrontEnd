import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/auth/login/login.component";
import {CrudTicketComponent} from "./components/crud-ticket/crud-ticket.component";
import {CrudUserComponent} from "./components/crud-user/crud-user.component";
import {ReporteUserComponent} from "./components/reporte-user/reporte-user.component";


const routes: Routes = [
  {path: "login", component: LoginComponent },
  {path: "ticket", component: CrudTicketComponent},
  {path: "user", component: CrudUserComponent},
  {path: "reporte", component: ReporteUserComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
