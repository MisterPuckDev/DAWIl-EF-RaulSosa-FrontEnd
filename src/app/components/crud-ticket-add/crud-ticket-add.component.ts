import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Ticket} from 'src/app/models/ticket.model';
import {MatDialogRef} from '@angular/material/dialog';
import {TicketService} from "../../services/ticket/ticket.service";
import {KindService} from "../../services/kind/kind.service";
import {UserService} from "../../services/user/user.service";
import {ProjectService} from "../../services/project/project.service";
import {CategoryService} from "../../services/category/category.service";
import {PriorityService} from "../../services/priority/priority.service";
import {StatusService} from "../../services/status/status.service";
import {Kind} from "../../models/kind.model";
import {User} from "../../models/user.model";
import {Project} from "../../models/project.model";
import {Category} from "../../models/category.model";
import {Priority} from "../../models/priority.model";
import {Status} from "../../models/status.model";

@Component({
    selector: 'app-crud-ticket-add',
    templateUrl: './crud-ticket-add.component.html',
    styleUrls: ['./crud-ticket-add.component.css']
})
export class CrudTicketAddComponent implements OnInit {

    kinds: Kind[] = [];
    users: User[] = [];
    projects: Project[] = [];
    categories: Category[] = [];
    priorities: Priority[] = [];
    statuss: Status[] = [];

    formsRegistra = this.formBuilder.group({
        validateTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        validateDescription: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        validateKind: ['', [Validators.required]],
        validateUser: ['', [Validators.required]],
        validateProject: ['', [Validators.required]],
        validateCategory: ['', [Validators.required]],
        validatePriority: ['', [Validators.required]],
        validateStatus: ['', [Validators.required]],
    });

    tickets: Ticket = {
        id: 0,
        title: "",
        description: "",
        kind: {},
        user: {},
        project: {},
        category: {},
        priority: {},
        status: {},
    }

    constructor(
        private ticketService: TicketService,
        private kindService: KindService,
        private userService: UserService,
        private projectService: ProjectService,
        private categoryService: CategoryService,
        private priorityService: PriorityService,
        private statusService: StatusService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CrudTicketAddComponent>
    ) {
    }

    ngOnInit(): void {
        this.loadKind();
        this.loadUser();
        this.loadProject();
        this.loadCategory();
        this.loadPriority();
        this.loadStatus();
    }

    loadKind(): void {
        this.kindService.list().subscribe(
            data => {
                this.kinds = data;
            }
        );
    }

    changeKind(id: number): void {
        if (!this.tickets.kind) {
            this.tickets.kind = new Kind();
        }
        this.tickets.kind.id = id;
    }

    loadUser(): void {
        this.userService.list().subscribe(
            data => {
                this.users = data;
            }
        );
    }

    changeUser(id: number): void {
        if (!this.tickets.user) {
            this.tickets.user = new User();
        }
        this.tickets.user.id = id;
    }

    loadProject(): void {
        this.projectService.list().subscribe(
            data => {
                this.projects = data;
            }
        );
    }

    changeProject(id: number): void {
        if (!this.tickets.project) {
            this.tickets.project = new Project();
        }
        this.tickets.project.id = id;
    }

    loadCategory(): void {
        this.categoryService.list().subscribe(
            data => {
                this.categories = data;
            }
        );
    }

    changeCategory(id: number): void {
        if (!this.tickets.category) {
            this.tickets.category = new Category();
        }
        this.tickets.category.id = id;
    }

    loadPriority(): void {
        this.priorityService.list().subscribe(
            data => {
                this.priorities = data;
            }
        );
    }

    changePriority(id: number): void {
        if (!this.tickets.priority) {
            this.tickets.priority = new Priority();
        }
        this.tickets.priority.id = id;
    }

    loadStatus(): void {
        this.statusService.list().subscribe(
            data => {
                this.statuss = data;
            }
        );
    }

    changeStatus(id: number): void {
        if (!this.tickets.status) {
            this.tickets.status = new Status();
        }
        this.tickets.status.id = id;
    }

    add(): void {
        if (this.formsRegistra.valid) {
            console.log("ticketsobj: ", this.tickets);
            this.ticketService.add(this.tickets).subscribe(
                result => {
                    console.log('Ticket agregado exitosamente', result);
                    this.dialogRef.close(1); // Cierra el modal y envía el código 1 para indicar éxito
                },
                error => {
                    console.error('Error al agregar el ticket', error);
                }
            );
        }
    }

    exit(): void {
        this.dialogRef.close();
    }

}
