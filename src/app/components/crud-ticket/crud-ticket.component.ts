import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Ticket} from 'src/app/models/ticket.model';
import Swal from 'sweetalert2'
import {TicketService} from "../../services/ticket/ticket.service";
import {CrudTicketAddComponent} from "../crud-ticket-add/crud-ticket-add.component";
import {CrudTicketUpdateComponent} from "../crud-ticket-update/crud-ticket-update.component";

@Component({
    selector: 'app-crud-ticket',
    templateUrl: './crud-ticket.component.html',
    styleUrls: ['./crud-ticket.component.css']
})
export class CrudTicketComponent implements OnInit {


    dataSource = new MatTableDataSource<Ticket>(); // Inicializa el dataSource

    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    displayedColumns: string[] = ['id', 'title', 'description', 'kind', 'user', 'project', 'category', 'priority', 'status', 'acciones'];

    constructor(
        private dialogService: MatDialog,
        private ticketService: TicketService
    ) {
    }

    ngOnInit(): void {
        this.reload();
    }

    openAddDialog() {
        const dialogRef = this.dialogService.open(CrudTicketAddComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.reload();
            }
        });
    }

    openUpdateDialog(obj: Ticket) {

        const dialogRef = this.dialogService.open(CrudTicketUpdateComponent, {
            width: '400px', // O cualquier tamaño adecuado
            data: {ticket: {...obj}} // Clonar el objeto antes de pasarlo al diálogo
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(">>> result >> " + result);
            if (result === 1) {
                this.reload();
            }
        });
    }

    elimina(obj: Ticket) {
        this.ticketService.delete(obj.id || 0).subscribe(
            x => {
                this.reload();
            }
        );
    }

    private reload() {
        this.ticketService.list().subscribe(
            Ticket => {
                this.dataSource.data = Ticket;
                this.dataSource.paginator = this.paginator;
            }
        );
    }
}
