import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeNameComponent } from 'src/app/dialogs/change-name/change-name.component';
import { IPerson } from 'src/app/Interface/IPerson';

interface ITableItem extends IPerson {
  employmentYear: string;
  salary: number;
}
@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnChanges {
  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'city', 'employmentYear', 'salary', 'options'];
  @Input() people!: IPerson[];
  @Output() idToBeDeleted = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource!: MatTableDataSource<ITableItem>;
  filteredPersons!: any;
  isLoading!: boolean;
  @Input() newPeople!: ITableItem[];

  constructor(
    private _dialog: MatDialog,
  ) { }

  ngOnChanges(change: SimpleChanges): void {
    console.log(this.newPeople, "newPeople");
    
    if (!this.people) {
      this.isLoading = false;
    } else {

      this.isLoading = true;
    }
    this.dataSource = new MatTableDataSource(this.newPeople);
    this.dataSource.sort = this.sort;

  }

  deleteUser(id: number) {
    this.idToBeDeleted.emit(id);
  }

  editUser(person: ITableItem) {    
    this._dialog.open(ChangeNameComponent, {
      data: person,
    });
  }

  onCityChange(cityName: any) {
    this.filteredPersons = this.people.filter(p => p.city === cityName);
    this.dataSource = new MatTableDataSource(this.filteredPersons);
  }


}
