import { Component } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name', cellClass: 'pill' },
    { name: 'Gender' },
    { name: 'Company' },
  ];

  getRowClass(row: any, index: number) {
    console.log('index');
    return {
      'row-bg-grey': index % 2 === 0,
    };
  }
}
