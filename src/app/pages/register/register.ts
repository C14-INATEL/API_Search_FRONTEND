import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/UserService/userService';
import { userInterface } from '../../core/UserService/userInterface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  mostrarSenha: boolean = false;

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  constructor(private userService: UserService) {}

  user: userInterface = {
    email: '',
    password: '',
    name: ''
  }

  save(): void {
   this.userService
    .saveUser(this.user)
    .subscribe({
    next: (response) => {
      console.log('User saved with success:');
      console.log(response);
    },
    error: (error) => {
      console.error('Error saving user:', error.message);
    }
  });
}
}