// Apply Button Module - Handles apply button clicks

/**
 * Initialize apply button event delegation
 */
export function initApplyButtons() {
    const jobsSection = document.querySelector('.jobs-list-setion');

    if (jobsSection) {
        jobsSection.addEventListener('click', function (event) {
            const button = event.target.closest('.button-apply-job');

            if (button) {
                button.textContent = 'Aplicado!';
                button.style.backgroundColor = 'green';
                button.style.cursor = 'not-allowed';
                button.disabled = true;
            }
        });
    }
}
