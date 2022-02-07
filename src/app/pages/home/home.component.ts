import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { PersonService } from 'src/app/data/person.service';
import { ChangeNameComponent } from 'src/app/dialogs/change-name/change-name.component';
import { IEmploymentData } from 'src/app/Interface/IEmploymentData';
import { IPerson } from 'src/app/Interface/IPerson';

interface ITableItem extends IPerson {
  employmentYear: string;
  salary: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  people!: IPerson[];
  newName!: string;
  person!: IPerson;
  id!: number;//event
  combinedPerson!: ITableItem;
  newPeople: ITableItem[] = [];
  USER_INFORMATION: any=[];

  constructor(
    private _personService: PersonService,
    private _dialog: MatDialog,
    private _router: Router

  ) {
    // setTimeout(() => {
      const ID_TO_GET: number[] = [];

      this._personService.getPersons().subscribe(
        res => {
          this.people = res;
          for (let i = 0; i <= this.people.length - 1; i++) {
            ID_TO_GET.push(this.people[i].id);
          }
          const getPersonInformationCalls = ID_TO_GET.map((id) =>
            this._personService.getUserInformation(id)
          );
          forkJoin(getPersonInformationCalls).subscribe((p) => {
            this.USER_INFORMATION = p;
          })
    
          for (let i = 0; i <= this.people.length - 1; i++) {
            this.combinedPerson = { ...this.people[i], ...this.USER_INFORMATION[i] };
            this.newPeople.push(this.combinedPerson);
          }

        }
      )

      // -----------------without forkjoin----------------
      // this._personService.getPersons().subscribe(
      //   res => {
      //     this.people = res
      //     for (let i = 0; i < this.people.length; i++){
      //       console.log(this.people[i].id, " this.people[i]");

      //       this._personService.getUserInformation(this.people[i].id).subscribe(
      //         res => {
      //           console.log(res)
      //           this.combinedPerson = { ...this.people[i], ...res };
      //           this.newPeople.push(this.combinedPerson);
      //         }
      //       )
      //     }
      //   }
      // );
      // --------------------------
    // }, 1000);
  }
  ngOnInit(): void {
  }

  changeNameDialog(person: ITableItem) {    
    this.person = person;
    this._dialog.open(ChangeNameComponent, {
      data: this.person
    });
  }

  addPerson() {
    this._router.navigate(['/addPerson']);
  }

  deleteUser(deleteId: number) {
    console.log(this.newPeople);

    this.newPeople.splice(
      this.newPeople.findIndex((people) => people.id === deleteId), 1
    )
    console.log(this.newPeople);
    
    const newArray = this.newPeople.slice();
    this.newPeople = newArray;


    // old code
    // this._personService.deletePerson(deleteId).subscribe(
    //   res => this.people = res
    // );
    // const newArray = this.people.slice();
    // this.people = newArray;
  }

  getPersonDetails(personNumber: number) {
    this._personService.getUserInformation(personNumber).subscribe(
      res => {
        return of(res);
      }
    )
  }

  changePersonInformation(updatedPerson: ITableItem): Observable<boolean> {
    console.log(updatedPerson, " updated person in home argument");
    
    let id = updatedPerson.id;
    for (let i = this.newPeople.length - 1; i >= 0; i--) {
      if (this.newPeople[i].id === id) {
        if (updatedPerson.name !== this.newPeople[i].name) {
          this.newPeople[i].name = updatedPerson.name;
          console.log(this.newPeople[i].name, updatedPerson.name);
          
        }
        if (updatedPerson.phoneNumber !== this.newPeople[i].phoneNumber) {
          this.newPeople[i].phoneNumber = updatedPerson.phoneNumber; 
        }
        if (updatedPerson.city !== this.newPeople[i].city) {
          this.newPeople[i].city = updatedPerson.city;
        } 
        if (updatedPerson.salary !== this.newPeople[i].salary) {
          this.newPeople[i].salary = updatedPerson.salary;
        } 
        if (updatedPerson.employmentYear !== this.newPeople[i].employmentYear) {
          this.newPeople[i].employmentYear = updatedPerson.employmentYear;
        } 
        break;
      }
    }
    console.log(this.newPeople, "after edit");
    
    const newArray = this.newPeople.slice();
    this.newPeople = newArray;
    console.log(newArray, " newarray");
    
    return of(true);
  }

  // getAllUsersInformation() {
  //   this._personService.getAllUsersInformation().subscribe(
  //     res => {
  //       return of(res)
  //     }
  //   )
  // }


}
