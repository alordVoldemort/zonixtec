        document.querySelectorAll('.footer-dropdown-header').forEach(header => {
            header.addEventListener('click', () => {
                const parent = header.parentElement;
                parent.classList.toggle('open');
            });
        });
