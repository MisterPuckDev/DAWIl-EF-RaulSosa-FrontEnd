import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {User} from 'src/app/models/user.model';
import {UserService} from "../../services/user/user.service";
import {CrudUserAddComponent} from "../crud-user-add/crud-user-add.component";
import {CrudUserUpdateComponent} from "../crud-user-update/crud-user-update.component";

@Component({
    selector: 'app-crud-user',
    templateUrl: './crud-user.component.html',
    styleUrls: ['./crud-user.component.css']
})
export class CrudUserComponent implements OnInit {


    dataSource = new MatTableDataSource<User>(); // Inicializa el dataSource

    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    displayedColumns: string[] = ['id', 'username', 'name', 'lastname', 'email', 'password', 'isActive', 'kind', 'acciones'];

    constructor(
        private dialogService: MatDialog,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.reload();
    }

    openAddDialog() {
        const dialogRef = this.dialogService.open(CrudUserAddComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.reload();
            }
        });
    }

    openUpdateDialog(obj: User) {

        const dialogRef = this.dialogService.open(CrudUserUpdateComponent, {
            width: '400px', // O cualquier tamaño adecuado
            data: {user: {...obj}} // Clonar el objeto antes de pasarlo al diálogo
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(">>> result >> " + result);
            if (result === 1) {
                this.reload();
            }
        });
    }

    elimina(obj: User) {
        this.userService.delete(obj.id || 0).subscribe(
            x => {
                this.reload();
            }
        );
    }

    private reload() {
        this.userService.list().subscribe(
            User => {
                this.dataSource.data = User;
                this.dataSource.paginator = this.paginator;
            }
        );
    }
}
