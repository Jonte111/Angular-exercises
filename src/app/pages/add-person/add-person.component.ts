import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/data/person.service';
import { IPerson } from 'src/app/Interface/IPerson';
@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  newPersonName!: string;
  phoneNumber!: number;
  city!: string;
  constructor(
    private _personService: PersonService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  addPerson() {
    if (!this.newPersonName) {
      return;
    }
    const RANDOMID = Math.floor(Math.random() * 1000);
    const NEWPERSON = {
      name: this.newPersonName,
      id: RANDOMID,
      phoneNumber: this.phoneNumber,
      city: this.city
    }

    this._personService.addPerson(NEWPERSON).subscribe(
      res => {
        this._router.navigate(['/']);
      }
    );
    
  }
  goBackHome() {
    this._router.navigate(['/']);
  }
}
