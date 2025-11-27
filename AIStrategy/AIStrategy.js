
        // FAQ Accordion - Only one open at a time
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const wasActive = item.classList.contains('active');

                // Close all FAQ items first
                document.querySelectorAll('.faq-item').forEach(faqItem => {
                    faqItem.classList.remove('active');
                });

                // If the clicked item wasn't active, open it
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        });



    