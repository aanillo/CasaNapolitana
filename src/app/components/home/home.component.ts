import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

  currentIndex = 0;
  totalSlides = 3;
  intervalId: any;

  constructor(private router: Router) {

  }

  ngAfterViewInit(): void {
    this.startCarousel();

    window.addEventListener('resize', () => {
      this.updateTransform();
    });
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
      this.updateTransform();
    }, 5000);
  }

  updateTransform() {
    const track = this.carouselTrack.nativeElement;
    track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  goToCarta() {
    this.router.navigate(['/carta']);
  }

  goToReserva() {
    this.router.navigate(['/book']);
  }
}
