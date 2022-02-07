import { Injectable } from '@angular/core';
import { Observable, of, timer, map } from 'rxjs';
import { IEmploymentData } from '../Interface/IEmploymentData';
import { IPerson } from '../Interface/IPerson';

const PEOPLE: IPerson[] = [
  { name: 'Christian', id: 1, phoneNumber: 111111, city:'Malmö'},
  { name: 'Jonathan', id: 2, phoneNumber: 222222, city: 'Löddeköpinge'},
  { name: 'Yunyan', id: 3, phoneNumber: 333333, city: 'Lund'},
  { name: 'Bob', id: 4, phoneNumber: 444444, city: 'Bob'},
]

const EMPLOYMENT_DATA: IEmploymentData[] = [
  { personId: 1, employmentYear: "2001", salary: 111111 },
  { personId: 2, employmentYear: "2002", salary: 222222 },
  { personId: 3, employmentYear: "2003", salary: 333333 },
  // { personId: 4, employmentYear: "2004", salary: 444444 },
]

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  // newPEOPLE!: any[];
  // newPerson: any;

  constructor() { }

  getPersons(): Observable<IPerson[]> {
    
    return timer(1000).pipe(map(n => PEOPLE));
  }

  getUserInformation(personNumber: number): Observable<any> {//Fråga om detta
    return of(EMPLOYMENT_DATA.find(p => p.personId === personNumber));
  }
  
  changePersonInformation(updatedPerson: IPerson): Observable<boolean> {
    let id = updatedPerson.id;    
    for (let i = PEOPLE.length-1; i >= 0; i--){
      if (PEOPLE[i].id === id) {
        if (updatedPerson.name) PEOPLE[i].name = updatedPerson.name;
        if (updatedPerson.phoneNumber) PEOPLE[i].phoneNumber = updatedPerson.phoneNumber;
        if (updatedPerson.city) PEOPLE[i].city = updatedPerson.city;
        break;
      }
    }
    return of(true);
  }

  addPerson(newPerson: IPerson): Observable<IPerson>{
    PEOPLE.push(newPerson);
    // PEOPLE.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    return of(newPerson);
  }

  deletePerson(deleteId: number): Observable<IPerson[]>{
    PEOPLE.splice(
      PEOPLE.findIndex((people) => people.id === deleteId), 1
    )

    // PEOPLE.sort((a,b)=>(a.id > b.id)? 1 : ((b.id > a.id) ? -1 : 0))

    return of(PEOPLE);
  }

  // getAllUsersInformation(): Observable<IEmploymentData[]>{
  //   return of(EMPLOYMENT_DATA)
  // }

  getUser(personNumber: number) {
    return of(PEOPLE.find(p => p.id === personNumber));
  }

}
