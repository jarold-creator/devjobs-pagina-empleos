// Job Service Module - Handles fetching and rendering jobs

const jobsSection = document.querySelector('.jobs-list-setion');

/**
 * Fetch jobs from data.json
 * @returns {Promise<Array>} Array of job objects
 */
export async function fetchJobs() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error('Error al cargar los trabajos');
        }
        const data = await response.json();
        return data.jobs;
    } catch (error) {
        console.error('Error:', error);
        // Mostrar mensaje de error al usuario
        if (jobsSection) {
            jobsSection.innerHTML = `
                <div class="p-6 text-center">
                    <p class="text-red-500 dark:text-red-400">Error al cargar los trabajos. Por favor, intenta de nuevo más tarde.</p>
                </div>
            `;
        }
        return [];
    }
}

/**
 * Render jobs to the DOM
 * @param {Array} jobs - Array of job objects to render
 */
export function renderJobs(jobs) {
    if (!jobsSection) return;

    // Limpiar el contenedor
    jobsSection.innerHTML = '';

    // Si no hay trabajos, mostrar mensaje
    if (jobs.length === 0) {
        jobsSection.innerHTML = `
            <div class="p-6 text-center">
                <p class="text-gray-500 dark:text-gray-400">No se encontraron trabajos.</p>
            </div>
        `;
        return;
    }

    // Renderizar cada trabajo
    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30';

        // Agregar atributos data-* para los filtros
        jobCard.setAttribute('data-technologies', job.technologies.join(','));
        jobCard.setAttribute('data-location', (job.location || '').trim());
        jobCard.setAttribute('data-contract', job.contract);
        jobCard.setAttribute('data-experience', job.experience);
        jobCard.setAttribute('data-id', String(job.id));

        jobCard.innerHTML = `
            <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div class="flex-grow">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${job.title}</h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${job.company} | ${job.location}</p>
                    <p class="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        ${job.description}
                    </p>
                </div>
                <div class="flex-shrink-0 mt-4 sm:mt-0">
                    <button class="button-apply-job rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80">Aplicar</button>
                </div>
            </div>
        `;

        jobsSection.appendChild(jobCard);
    });
}

/**
 * Initialize job loading on DOMContentLoaded
 */
export function initJobLoading() {
    document.addEventListener('DOMContentLoaded', async function () {
        const jobs = await fetchJobs();

        // Import pagination module
        const { setAllJobs, getCurrentPageJobs, renderPagination } = await import('./pagination.js');

        // Store all jobs in pagination state
        setAllJobs(jobs);

        // Render first page of jobs
        const jobsToShow = getCurrentPageJobs();
        renderJobs(jobsToShow);

        // Render pagination controls
        renderPagination();
    });
}
