import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new-password.html',
  styleUrls: ['./new-password.css'],
})
export class NewPassword {
  mostrarSenha: boolean = false;

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}