






function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const toggleButton = document.querySelector('.menu-toggle');

    if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggleButton.innerHTML = '&#9776;'; // Three-line icon
    } else {
        navLinks.classList.add('open');
        toggleButton.innerHTML = '&#10005;'; // Close (X) icon
    }
}

const track = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = true;

    function updateIndicators() {
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }

    function moveSlide(direction) {
      const slidesPerView = window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : 2;
      const maxIndex = totalSlides - slidesPerView;
      currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
      track.style.transform = `translateX(-${currentIndex * (100 / slidesPerView)}%)`;
      updateIndicators();
    }

    function goToSlide(index) {
      currentIndex = index;
      moveSlide(0);
    }

    // Touch event handling for swipe
    const sliderContainer = document.getElementById('slider-container');

    sliderContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    sliderContainer.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diffX = currentX - startX;

      // Minimal drag threshold to count as a slide move
      if (Math.abs(diffX) > 50) {
        moveSlide(diffX > 0 ? -1 : 1);
        isDragging = false; // Prevent continuous sliding until touch ends
      }
    });

    sliderContainer.addEventListener('touchend', () => {
      isDragging = false;
    });

    let currentIndexTwo = 0;

function moveSlideTwo(direction) {
  const track = document.getElementById('slider-track-2');
  const slides = document.querySelectorAll('#slider-track-2 .slide');
  const slideWidth = slides[0].clientWidth;
  currentIndexTwo += direction;

  // Keep index in bounds
  if (currentIndexTwo < 0) {
    currentIndexTwo = slides.length - 4; // Adjust for visible slides
  } else if (currentIndexTwo > slides.length - 4) {
    currentIndexTwo = 0;
  }

  track.style.transform = `translateX(-${currentIndexTwo * slideWidth}px)`;
}

// Touch gesture support for slider-container-2
const sliderContainerTwo = document.getElementById('slider-container-2');
let touchStartX = 0;
let touchEndX = 0;

sliderContainerTwo.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

sliderContainerTwo.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  if (touchEndX < touchStartX) {
    moveSlideTwo(1); // Swipe left
  } else if (touchEndX > touchStartX) {
    moveSlideTwo(-1); // Swipe right
  }
}
