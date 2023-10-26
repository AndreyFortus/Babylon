import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-lessons-slider',
  templateUrl: './lessons-slider.component.html',
  styleUrls: ['./lessons-slider.component.css']
})
export class LessonsSliderComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    const slider = document.querySelector('.slide') as HTMLElement;
    const prevButton = document.getElementById('prevButton') as HTMLElement;
    const nextButton = document.getElementById('nextButton') as HTMLElement;

    let slideIndex = 0;
    let slideWidth = 0;
    let hasScrolled = false;

    const firstSlide = slider.firstElementChild as HTMLElement;

    if (firstSlide) {
      slideWidth = firstSlide.clientWidth;
    }

    function moveSlide(offset: number) {
      if (!hasScrolled) {
        slideIndex += offset;
        slider.style.transform = `translateX(-${slideWidth * 2 * slideIndex}px)`;
      }
    }

    prevButton.addEventListener('click', () => {
      if (slideIndex > 0) {
        moveSlide(-1);
        hasScrolled = false;
      }
    });

    nextButton.addEventListener('click', () => {
      const numSlides = slider.childElementCount;
      if (slideIndex < numSlides - 1) {
        moveSlide(1);
        hasScrolled = true;
      }
    });
  }
}