// Filters Module - Handles all filter functionality

// Estado global de filtros
export const filters = {
    technologies: [],
    locations: [],
    contracts: [],
    experiences: []
};

/**
 * Apply all active filters to job cards
 */
export async function applyAllFilters() {
    // Import pagination module
    const { setFilteredJobs, getCurrentPageJobs, renderPagination } = await import('./pagination.js');
    const { renderJobs } = await import('./jobService.js');

    // Get all jobs from pagination module
    const paginationModule = await import('./pagination.js');
    const allJobs = paginationModule.default?.allJobs || [];

    // If we don't have jobs yet, try to get them from DOM
    const jobCards = document.querySelectorAll('.job-card');

    // Si no hay filtros activos, mostrar todos los trabajos
    const hasActiveFilters = filters.technologies.length > 0 ||
        filters.locations.length > 0 ||
        filters.contracts.length > 0 ||
        filters.experiences.length > 0;

    if (!hasActiveFilters) {
        jobCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }

    // Filtrar trabajos
    jobCards.forEach(card => {
        let shouldShow = true;

        // Filtrar por tecnologías (OR dentro del mismo tipo)
        if (filters.technologies.length > 0) {
            const jobTechs = card.getAttribute('data-technologies');
            if (!jobTechs) {
                shouldShow = false;
            } else {
                const jobTechsArray = jobTechs.split(',').map(tech => tech.trim());
                const hasMatchingTech = filters.technologies.some(selectedTech =>
                    jobTechsArray.includes(selectedTech)
                );
                if (!hasMatchingTech) shouldShow = false;
            }
        }

        // Filtrar por ubicación (OR dentro del mismo tipo)
        if (filters.locations.length > 0 && shouldShow) {
            const jobLocation = card.getAttribute('data-location');
            if (!jobLocation || !filters.locations.includes(jobLocation.trim())) {
                shouldShow = false;
            }
        }

        // Filtrar por tipo de contrato (OR dentro del mismo tipo)
        if (filters.contracts.length > 0 && shouldShow) {
            const jobContract = card.getAttribute('data-contract');
            if (!jobContract || !filters.contracts.includes(jobContract.trim())) {
                shouldShow = false;
            }
        }

        // Filtrar por nivel de experiencia (OR dentro del mismo tipo)
        if (filters.experiences.length > 0 && shouldShow) {
            const jobExperience = card.getAttribute('data-experience');
            if (!jobExperience || !filters.experiences.includes(jobExperience.trim())) {
                shouldShow = false;
            }
        }

        // Mostrar u ocultar el trabajo
        card.style.display = shouldShow ? 'block' : 'none';
    });

    // Update pagination after filtering
    try {
        renderPagination();
    } catch (e) {
        // Pagination might not be initialized yet
    }
}

/**
 * Setup a single filter dropdown
 * @param {Object} config - Filter configuration
 */
function setupFilterDropdown(config) {
    const { buttonId, dropdownId, checkboxClass, searchId, clearId, applyId, filterKey } = config;

    const filterBtn = document.querySelector(buttonId);
    const dropdown = document.querySelector(dropdownId);
    const searchInput = searchId ? document.querySelector(searchId) : null;
    const clearBtn = document.querySelector(clearId);
    const applyBtn = document.querySelector(applyId);

    if (!filterBtn || !dropdown) return;

    // Toggle dropdown
    filterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target) && !filterBtn.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // Prevenir que el dropdown se cierre al hacer clic dentro
    dropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Funcionalidad de búsqueda (si existe)
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase();
            const labels = dropdown.querySelectorAll('label');

            labels.forEach(label => {
                const text = label.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    label.style.display = 'flex';
                } else {
                    label.style.display = 'none';
                }
            });
        });
    }

    // Limpiar filtros
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            const checkboxes = dropdown.querySelectorAll(checkboxClass);
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            filters[filterKey] = [];
            applyAllFilters();
        });
    }

    // Aplicar filtros
    if (applyBtn) {
        applyBtn.addEventListener('click', function () {
            const checkboxes = dropdown.querySelectorAll(`${checkboxClass}:checked`);
            const selectedValues = Array.from(checkboxes).map(cb => cb.value);

            filters[filterKey] = selectedValues;
            applyAllFilters();

            dropdown.classList.add('hidden');
        });
    }

    // Cerrar dropdown con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !dropdown.classList.contains('hidden')) {
            dropdown.classList.add('hidden');
        }
    });
}

/**
 * Initialize all filters
 */
export function initFilters() {
    // Filtro de Tecnología
    setupFilterDropdown({
        buttonId: '#filter-tecnology',
        dropdownId: '#dropdown-tecnology',
        checkboxClass: '.tech-checkbox',
        searchId: '#search-tech',
        clearId: '#clear-tech-filters',
        applyId: '#apply-tech-filters',
        filterKey: 'technologies'
    });

    // Filtro de Ubicación
    setupFilterDropdown({
        buttonId: '#filter-location',
        dropdownId: '#dropdown-location',
        checkboxClass: '.location-checkbox',
        searchId: '#search-location',
        clearId: '#clear-location-filters',
        applyId: '#apply-location-filters',
        filterKey: 'locations'
    });

    // Filtro de Tipo de Contrato
    setupFilterDropdown({
        buttonId: '#filter-contract',
        dropdownId: '#dropdown-contract',
        checkboxClass: '.contract-checkbox',
        searchId: null,
        clearId: '#clear-contract-filters',
        applyId: '#apply-contract-filters',
        filterKey: 'contracts'
    });

    // Filtro de Nivel de Experiencia
    setupFilterDropdown({
        buttonId: '#filter-experience',
        dropdownId: '#dropdown-experience',
        checkboxClass: '.experience-checkbox',
        searchId: null,
        clearId: '#clear-experience-filters',
        applyId: '#apply-experience-filters',
        filterKey: 'experiences'
    });
}
