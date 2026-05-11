import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {

  @ViewChild('particles', { static: true })
  particlesRef!: ElementRef;

  @ViewChild('bg', { static: true })
  bgRef!: ElementRef;

  ngAfterViewInit(): void {
    this.generateParticles();
  }

  private generateParticles(): void {
  const container = this.particlesRef.nativeElement;

  for (let i = 0; i < 60; i++) {
    const span = document.createElement('span');

    span.style.left = Math.random() * 100 + 'vw';
    span.style.animationDuration = (6 + Math.random() * 8) + 's';
    span.style.opacity = (0.3 + Math.random()).toString();

    container.appendChild(span);
  }
}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.bgRef) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 40;
    const y = (event.clientY / window.innerHeight - 0.5) * 40;

    this.bgRef.nativeElement.style.transform =
      `translate(${x}px, ${y}px)`;
  }
}