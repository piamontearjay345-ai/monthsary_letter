document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const dateInput = document.getElementById('dateInput');
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const letterBody = document.querySelector('.letter-body');
    const flowerBtn = document.getElementById('flowerBtn');
    const flower = document.getElementById('flower');

    const setupFlowerReveal = () => {
        if (!letterBody || !flowerBtn) return;

        const showButtonIfAtBottom = () => {
            const atBottom =
                letterBody.scrollTop + letterBody.clientHeight >=
                letterBody.scrollHeight - 4;

            if (atBottom) {
                flowerBtn.classList.remove('hidden-flower');
                letterBody.removeEventListener('scroll', showButtonIfAtBottom);
            }
        };

        if (letterBody.scrollHeight <= letterBody.clientHeight + 1) {
            flowerBtn.classList.remove('hidden-flower');
        } else {
            letterBody.addEventListener('scroll', showButtonIfAtBottom);
        }
    };

    if (flowerBtn && flower) {
        flowerBtn.addEventListener('click', () => {
            letter.classList.add('show-flower');
            flower.classList.remove('hidden-flower');
            flower.setAttribute('aria-hidden', 'false');
        });
    }

    const handleOpen = () => {
        const password = dateInput.value;

        if (password === '091224') {
            // 1. Fade out the envelope
            envelope.classList.add('fade-out');

            // 2. After fade finishes, hide envelope and show letter
            setTimeout(() => {
                envelope.style.display = 'none';
                
                // Remove hidden class but start the CSS transition
                letter.style.display = 'block';
                setTimeout(() => {
                    letter.classList.remove('hidden');
                    letter.style.opacity = '1';
                    letter.style.transform = 'translateY(0) scale(1)';
                    requestAnimationFrame(() => {
                        setupFlowerReveal();
                    });
                }, 50);
            }, 600);
            
        } else {
            // Incorrect password logic
            alert("Oops! Hint: MMDDYY");
            dateInput.value = "";
        }
    };

    // Trigger on button click
    openBtn.addEventListener('click', handleOpen);

    // Trigger on "Enter" key
    dateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleOpen();
        }
    });
});
