import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";

@Component({
    selector: 'app-crud-user-update',
    templateUrl: './crud-user-update.component.html',
    styleUrls: ['./crud-user-update.component.css']
})
export class CrudUserUpdateComponent implements OnInit {

    user: User = new User();

    formsActualiza = this.formBuilder.group({
        validateUser: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        validateName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        validateLast: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        validateEmail: ['', [Validators.required]],
        validatePassword: ['', [Validators.required]],
        validateActive: ['', [Validators.required]],
        validateKind: ['', [Validators.required]],
    });

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CrudUserUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { user: User }
    ) {
    }

    ngOnInit(): void {
        if (this.data.user) {
            this.user = this.data.user;
            this.obtenerDataUser(this.user);
        }
    }

    obtenerDataUser(user: User): void {
        this.userService.search(user.id).subscribe(data => {
            this.user = data;
            this.cargarDatosFormulario(this.user);
        });
    }

    cargarDatosFormulario(user: User): void {
        this.formsActualiza.patchValue({
            validateUser: user.username,
            validateName: user.name,
            validateLast: user.lastname,
            validateEmail: user.email,
            validatePassword: user.password,
            validateActive: user.isActive?.toString() ?? '',
            validateKind: user.kind?.toString() ?? '',
        });
    }

    actualiza(): void {
        this.userService.update(this.user).subscribe({
            next: () => {
                this.dialogRef.close(1); // Indica éxito al cerrar
            },
            error: () => {
            }
        });
    }

    salir(): void {
        this.dialogRef.close();
    }

}
