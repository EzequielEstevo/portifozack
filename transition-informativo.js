document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.carousel-informativo .item');
    const dots = document.querySelectorAll('.carousel-informativo .dots li');
    let currentIndex = 0;
    let isTransitioning = false;

    function showItem(index) {
        if (isTransitioning || index === currentIndex) return;
        isTransitioning = true;

        items.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        items[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;

        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showItem(index);
        });
    });

    // Auto-play
    let interval = setInterval(() => {
        let next = (currentIndex + 1) % items.length;
        showItem(next);
    }, 6000);

    // Pause on hover
    const carousel = document.querySelector('.carousel-informativo');
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            let next = (currentIndex + 1) % items.length;
            showItem(next);
        }, 6000);
    });
});
