import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-central-emails',
  standalone: true,

  imports: [CommonModule,RouterLink],

  templateUrl: './central-emails.html',
  styleUrls: ['./central-emails.css'],
})
export class CentralEmails {

}