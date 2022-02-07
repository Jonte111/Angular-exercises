import { Component, OnInit, Inject } from '@angular/core';
import { PersonService } from 'src/app/data/person.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPerson } from 'src/app/Interface/IPerson';
import { HomeComponent } from 'src/app/pages/home/home.component';

interface ITableItem extends IPerson {
  employmentYear: string;
  salary: number;
}

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent implements OnInit {
  newName!: string;
  personData!: IPerson;
  newPhoneNumber!: number;
  newCity!: string;
  salary!: number;
  employmentYear!: string;
  
  constructor(
    private _personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: ITableItem,
    private _dialog: MatDialog,
    private _home: HomeComponent
  ) { }

  ngOnInit(): void {
    this.personData = this.data;
    this.newName = this.data.name;
    this.newPhoneNumber = this.data.phoneNumber;
    this.newCity = this.data.city;
    this.salary = this.data.salary;
    this.employmentYear = this.data.employmentYear;
  }

  closeDialog() {
    this._dialog.closeAll();
  }

  changeInformation() {
    const updatedPerson = {
      id: this.personData.id,
      name: this.newName,
      phoneNumber: this.newPhoneNumber,
      city: this.newCity,
      salary: this.data.salary,
      employmentYear: this.data.employmentYear
    }

    this._home.changePersonInformation(updatedPerson).subscribe(
      res => {
        if (res) {          
          this._dialog.closeAll();
        }
      }
    );

    // old code
    // this._personService.changePersonInformation(updatedPerson).subscribe(
    //   res => {
    //     if (res) {
    //       this._dialog.closeAll();
    //     }
    //   }
    // );

  }

}
