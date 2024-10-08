// Simple animation for images on scroll (if needed)
const images = document.querySelectorAll('.animated');

function checkVisibility() {
    images.forEach(image => {
        const rect = image.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            image.classList.add('visible');
        } else {
            image.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
checkVisibility(); // Initial check
