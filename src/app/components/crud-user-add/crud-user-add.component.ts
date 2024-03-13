import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user.model";

@Component({
    selector: 'app-crud-user-add',
    templateUrl: './crud-user-add.component.html',
    styleUrls: ['./crud-user-add.component.css']
})
export class CrudUserAddComponent implements OnInit {

    formsRegistra = this.formBuilder.group({
        validateUser: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        validateName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        validateLast: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        validateEmail: ['', [Validators.required]],
        validatePassword: ['', [Validators.required]],
        validateActive: ['', [Validators.required]],
        validateKind: ['', [Validators.required]],
    });

    users: User = {
        id: 0,
        username: "",
        name: "",
        lastname: "",
        email: "",
        password: "",
        isActive: 0,
        kind: 0,
    }

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CrudUserAddComponent>
    ) {
    }

    ngOnInit(): void {
    }

    add(): void {
        if (this.formsRegistra.valid) {
            this.userService.add(this.users).subscribe(
                result => {
                    console.log('Ticket agregado exitosamente', result);
                    this.dialogRef.close(1); // Cierra el modal y envía el código 1 para indicar éxito
                },
                error => {
                    console.error('Error al agregar el user', error);
                }
            );
        }
    }

    exit(): void {
        this.dialogRef.close();
    }

}
