import {Kind} from "./kind.model";
import {User} from "./user.model";
import {Project} from "./project.model";
import {Category} from "./category.model";
import {Priority} from "./priority.model";
import {Status} from "./status.model";

export class Ticket {

    id?: number;
    title?: string;
    description?: string;
    kind?: Kind;
    user?: User;
    project?: Project;
    category?: Category;
    priority?: Priority;
    status?: Status;

}
