import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {Ticket} from "../../models/ticket.model";
import {Kind} from "../../models/kind.model";
import {User} from "../../models/user.model";
import {Project} from "../../models/project.model";
import {Category} from "../../models/category.model";
import {Priority} from "../../models/priority.model";
import {Status} from "../../models/status.model";
import {TicketService} from "../../services/ticket/ticket.service";
import {KindService} from "../../services/kind/kind.service";
import {UserService} from "../../services/user/user.service";
import {ProjectService} from "../../services/project/project.service";
import {CategoryService} from "../../services/category/category.service";
import {PriorityService} from "../../services/priority/priority.service";
import {StatusService} from "../../services/status/status.service";

@Component({
    selector: 'app-crud-ticket-update',
    templateUrl: './crud-ticket-update.component.html',
    styleUrls: ['./crud-ticket-update.component.css']
})
export class CrudTicketUpdateComponent implements OnInit {

    kinds: Kind[] = [];
    users: User[] = [];
    projects: Project[] = [];
    categories: Category[] = [];
    priorities: Priority[] = [];
    statuss: Status[] = [];
    ticket: Ticket = new Ticket();
    selectedValueKind: number | undefined = 0;
    selectedValueUser: number | undefined = 0;
    selectedValueProject: number | undefined = 0;
    selectedValueCategory: number | undefined = 0;
    selectedValuePriority: number | undefined = 0;
    selectedValueStatus: number | undefined = 0;

    formsActualiza = this.formBuilder.group({
        validateTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        validateDescription: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        validateKind: ['', [Validators.required]],
        validateUser: ['', [Validators.required]],
        validateProject: ['', [Validators.required]],
        validateCategory: ['', [Validators.required]],
        validatePriority: ['', [Validators.required]],
        validateStatus: ['', [Validators.required]],
    });

    constructor(
        private ticketService: TicketService,
        private kindService: KindService,
        private userService: UserService,
        private projectService: ProjectService,
        private categoryService: CategoryService,
        private priorityService: PriorityService,
        private statusService: StatusService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CrudTicketUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { ticket: Ticket }
    ) {
    }

    ngOnInit(): void {
        this.loadKind();
        this.loadUser();
        this.loadProject();
        this.loadCategory();
        this.loadPriority();
        this.loadStatus();

        if (this.data.ticket) {
            this.ticket = this.data.ticket;
            this.obtenerDataTicket(this.ticket);
        }

    }

    compararElementos(opcionSeleccionada: string, valorActual: string): boolean {
        return opcionSeleccionada === valorActual;
    }

    obtenerDataTicket(ticket: Ticket): void {
        this.ticketService.search(ticket.id).subscribe(data => {
            this.ticket = data;
            console.log("ticket: ", this.ticket);
            console.log("this.ticket.user?.id: ", this.ticket.user?.id);
            this.selectedValueKind = this.ticket.kind?.id;
            this.selectedValueUser = this.ticket.user?.id;
            this.selectedValueProject = this.ticket.project?.id;
            this.selectedValueCategory = this.ticket.category?.id;
            this.selectedValuePriority = this.ticket.priority?.id;
            this.selectedValueStatus = this.ticket.status?.id;
            this.cargarDatosFormulario(this.ticket);
        });
    }

    loadKind(): void {
        this.kindService.list().subscribe(
            data => {
                this.kinds = data;
                if (this.data.ticket) {
                    this.ticket = this.data.ticket;
                    this.cargarDatosFormulario(this.ticket);
                }
            }
        );
    }

    changeKind(id: number): void {
        this.ticket.kind = this.kinds.find(s => s.id === id);
    }

    loadUser(): void {
        this.userService.list().subscribe(
            data => {
                this.users = data;
                if (this.data.ticket) {
                    this.ticket = this.data.ticket;
                    this.cargarDatosFormulario(this.ticket);
                }
            }
        );
    }

    changeUser(id: number): void {
        this.ticket.user = this.users.find(s => s.id === id);
    }

    loadProject(): void {
        this.projectService.list().subscribe(
            data => {
                this.projects = data;
                if (this.data.ticket) {
                    this.ticket = this.data.ticket;
                    this.cargarDatosFormulario(this.ticket);
                }
            }
        );
    }

    changeProject(id: number): void {
        this.ticket.project = this.projects.find(s => s.id === id);
    }

    loadCategory(): void {
        this.categoryService.list().subscribe(
            data => {
                this.categories = data;
                if (this.data.ticket) {
                    this.ticket = this.data.ticket;
                    this.cargarDatosFormulario(this.ticket);
                }
            }
        );
    }

    changeCategory(id: number): void {
        this.ticket.category = this.categories.find(s => s.id === id);
    }

    loadPriority(): void {
        this.priorityService.list().subscribe(
            data => {
                this.priorities = data;
                if (this.data.ticket) {
                    this.ticket = this.data.ticket;
                    this.cargarDatosFormulario(this.ticket);
                }
            }
        );
    }

    changePriority(id: number): void {
        this.ticket.priority = this.priorities.find(s => s.id === id);
    }

    loadStatus(): void {
        this.statusService.list().subscribe(
            data => {
                this.statuss = data;
                if (this.data.ticket) {
                    this.ticket = this.data.ticket;
                    this.cargarDatosFormulario(this.ticket);
                }
            }
        );
    }

    changeStatus(id: number): void {
        this.ticket.status = this.statuss.find(s => s.id === id);
    }

    cargarDatosFormulario(ticket: Ticket): void {
        console.log("ticket.user?.id2: ", ticket.user?.id);
        console.log("ticket.user?.id?.toString(): ", ticket.user?.id?.toString());
        this.formsActualiza.patchValue({
            validateTitle: ticket.title,
            validateDescription: ticket.description,
            validateKind: ticket.kind?.id?.toString() ?? '',
            validateUser: ticket.user?.id?.toString() ?? '',
            validateProject: ticket.project?.id?.toString() ?? '',
            validateCategory: ticket.category?.id?.toString() ?? '',
            validatePriority: ticket.priority?.id?.toString() ?? '',
            validateStatus: ticket.status?.id?.toString() ?? '',
        });
    }

    actualiza(): void {
        this.ticketService.update(this.ticket).subscribe({
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
