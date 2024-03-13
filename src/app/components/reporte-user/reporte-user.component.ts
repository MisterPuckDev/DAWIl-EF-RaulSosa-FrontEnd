import {MatPaginator} from '@angular/material/paginator';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Category} from "../../models/category.model";
import {UserService} from "../../services/user/user.service";
import {CategoryService} from "../../services/category/category.service";
import {User} from "../../models/user.model";

@Component({
    selector: 'app-consulta-proveedor',
    templateUrl: './reporte-user.component.html',
    styleUrls: ['./reporte-user.component.css']
})
export class ReporteUserComponent implements OnInit {

    categories: Category[] = [];
    category: Category = new Category();

    constructor(private userService: UserService, private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.loadCategory();
    }

    loadCategory(): void {
        this.categoryService.list().subscribe(
            data => {
                this.categories = data;
            }
        );
    }

    changeCategory(id: number): void {
        if (!this.category) {
            this.category = new Category();
        }
        this.category.id = id;
    }

    exportarEXCEL() {

        this.userService.generateDocumentExcel(this.category.id).subscribe(
            response => {
                console.log(response);
                var url = window.URL.createObjectURL(response.data);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.setAttribute('target', 'blank');
                a.href = url;
                a.download = response.filename;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            });
    }

}
