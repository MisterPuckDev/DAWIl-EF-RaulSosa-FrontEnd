import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppMaterialModule} from './app.material.module';
import {CrudTicketComponent} from "./components/crud-ticket/crud-ticket.component";
import {CrudTicketAddComponent} from "./components/crud-ticket-add/crud-ticket-add.component";
import {CrudTicketUpdateComponent} from "./components/crud-ticket-update/crud-ticket-update.component";
import {JwtInterceptorService} from "./services/auth/jwt-interceptor.service";
import {CrudUserComponent} from "./components/crud-user/crud-user.component";
import {CrudUserAddComponent} from "./components/crud-user-add/crud-user-add.component";
import {CrudUserUpdateComponent} from "./components/crud-user-update/crud-user-update.component";
import {ReporteUserComponent} from "./components/reporte-user/reporte-user.component";

@NgModule({
    declarations: [
        AppComponent,
        CrudTicketComponent,
        CrudTicketAddComponent,
        CrudTicketUpdateComponent,
        CrudUserComponent,
        CrudUserAddComponent,
        CrudUserUpdateComponent,
        ReporteUserComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AppMaterialModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
