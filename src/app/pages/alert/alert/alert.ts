import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() message: string = '';     
  @Input() title: string = 'Aviso';  
  @Input() btnLabel: string = 'Ok';
  @Output() closed = new EventEmitter(); 

  getIcon(): string {
  switch(this.type) {
    case 'success': return 'assets/Pass.png';
    case 'error':   return 'assets/error.png';
    case 'warning': return 'assets/atention.png';
    default:        return 'assets/Pass.png';
  }
}

  close() {
    this.closed.emit();
  }
}