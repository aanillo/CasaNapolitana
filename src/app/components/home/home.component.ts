import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  
  currentSlide: number = 0;
  totalSlides: number = 3;
  private intervalId: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  private updateCarousel() {
    if (this.carouselTrack) {
      const track = this.carouselTrack.nativeElement;
      track.style.transform = `translateX(-${this.currentSlide * 33.333}%)`;
    }
  }

  private resetAutoPlay() {
    clearInterval(this.intervalId);
    this.startAutoPlay();
  }

  
  goToCarta() {
    this.router.navigate(['/carta']);
  }

  goToReserva() {
    this.router.navigate(['/book']);
  }
}