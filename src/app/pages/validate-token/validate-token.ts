import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-validate-token',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './validate-token.html',
  styleUrl: './validate-token.css',
})
export class ValidateToken {}
