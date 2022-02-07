import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonService } from './data/person.service';
import { ChangeNameComponent } from './dialogs/change-name/change-name.component';
import { IPerson } from './Interface/IPerson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exercise';

  constructor() { }
  
}
