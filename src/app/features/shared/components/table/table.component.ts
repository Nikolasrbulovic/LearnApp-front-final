import { Component, Input } from '@angular/core'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { Column } from './types'

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() columns: Column[] = []
  @Input() rows: any[] = []

  getRowClass(row: any, index: number) {
    return {
      'row-bg-grey': index % 2 === 0,
    }
  }
}
