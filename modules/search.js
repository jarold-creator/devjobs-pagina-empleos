// Search Module - Handles main search bar functionality

import { applyAllFilters } from './filters.js';

/**
 * Initialize main search bar
 */
export function initSearch() {
    const searchInput = document.querySelector('#search-jobs');

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            const jobCards = document.querySelectorAll('.job-card');

            // Si la búsqueda está vacía, aplicar solo los filtros existentes
            if (searchTerm === '') {
                applyAllFilters();
                return;
            }

            // Filtrar trabajos según el término de búsqueda
            jobCards.forEach(card => {
                // Obtener el título del trabajo
                const titleElement = card.querySelector('h3');
                const title = titleElement ? titleElement.textContent.toLowerCase() : '';

                // Obtener la empresa y ubicación
                const companyElement = card.querySelector('p.text-sm.text-gray-500');
                const companyText = companyElement ? companyElement.textContent.toLowerCase() : '';

                // Obtener la descripción
                const descriptionElement = card.querySelector('p.text-sm.text-gray-600');
                const description = descriptionElement ? descriptionElement.textContent.toLowerCase() : '';

                // Obtener las tecnologías
                const technologies = card.getAttribute('data-technologies');
                const techText = technologies ? technologies.toLowerCase() : '';

                // Verificar si el término de búsqueda coincide con algún campo
                const matchesSearch = title.includes(searchTerm) ||
                    companyText.includes(searchTerm) ||
                    description.includes(searchTerm) ||
                    techText.includes(searchTerm);

                // Mostrar u ocultar según coincidencia
                if (matchesSearch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}
