document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    let currentIndex = 0;

    const updateCarousel = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    nextButton.addEventListener('click', () => {
        const visibleSlides = window.innerWidth <= 480 ? 2 : window.innerWidth <= 768 ? 3 : 4;
        if (currentIndex < slides.length - visibleSlides) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        const visibleSlides = window.innerWidth <= 480 ? 2 : window.innerWidth <= 768 ? 3 : 4;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - visibleSlides; // Loop to end
        }
        updateCarousel();
    });

    // Auto-play
    let autoPlay = setInterval(() => {
        nextButton.click();
    }, 3000);

    // Pause auto-play on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            nextButton.click();
        }, 3000);
    });

    // Handle window resize
    window.addEventListener('resize', updateCarousel);
});
