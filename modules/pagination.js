// Pagination Module - Handles pagination logic and UI

// Pagination state
export const paginationState = {
    currentPage: 1,
    jobsPerPage: 5,
    totalJobs: 0
};

// Store reference to all jobs and filtered jobs
let allJobsGlobal = [];
let filteredJobsGlobal = [];

/**
 * Set all jobs (called from jobService)
 * @param {Array} jobs - All jobs from data.json
 */
export function setAllJobs(jobs) {
    allJobsGlobal = jobs;
    filteredJobsGlobal = jobs;
    paginationState.totalJobs = jobs.length;
}

/**
 * Set filtered jobs (called from filters/search)
 * @param {Array} jobs - Filtered jobs
 */
export function setFilteredJobs(jobs) {
    filteredJobsGlobal = jobs;
    paginationState.totalJobs = jobs.length;
    paginationState.currentPage = 1; // Reset to page 1 when filtering
}

/**
 * Get jobs for current page
 * @returns {Array} Jobs to display on current page
 */
export function getCurrentPageJobs() {
    const startIndex = (paginationState.currentPage - 1) * paginationState.jobsPerPage;
    const endIndex = startIndex + paginationState.jobsPerPage;
    return filteredJobsGlobal.slice(startIndex, endIndex);
}

/**
 * Get total number of pages
 * @returns {number} Total pages
 */
function getTotalPages() {
    return Math.ceil(paginationState.totalJobs / paginationState.jobsPerPage);
}

/**
 * Navigate to a specific page
 * @param {number} pageNumber - Page number to navigate to
 */
export async function goToPage(pageNumber) {
    const totalPages = getTotalPages();

    // Validate page number
    if (pageNumber < 1 || pageNumber > totalPages) return;

    paginationState.currentPage = pageNumber;

    // Re-render jobs for new page
    const { renderJobs } = await import('./jobService.js');
    const jobsToShow = getCurrentPageJobs();
    renderJobs(jobsToShow);

    // Update pagination UI
    renderPagination();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Render pagination controls
 */
export function renderPagination() {
    const paginationContainer = document.querySelector('#pagination-container');
    if (!paginationContainer) return;

    const totalPages = getTotalPages();
    const currentPage = paginationState.currentPage;

    // Hide pagination if only 1 page or no jobs
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    const prevDisabled = currentPage === 1;
    paginationHTML += `
        <button 
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 ${prevDisabled ? 'opacity-50 cursor-not-allowed' : ''}"
            ${prevDisabled ? 'disabled' : ''}
            data-page="${currentPage - 1}"
            aria-label="Previous">
            <span class="material-symbols-outlined text-xl">chevron_left</span>
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        paginationHTML += `
            <button 
                class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${isActive
                ? 'bg-primary text-white font-semibold'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }"
                data-page="${i}"
                ${isActive ? 'aria-current="page"' : ''}>
                ${i}
            </button>
        `;
    }

    // Next button
    const nextDisabled = currentPage === totalPages;
    paginationHTML += `
        <button 
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 ${nextDisabled ? 'opacity-50 cursor-not-allowed' : ''}"
            ${nextDisabled ? 'disabled' : ''}
            data-page="${currentPage + 1}"
            aria-label="Next">
            <span class="material-symbols-outlined text-xl">chevron_right</span>
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

/**
 * Initialize pagination
 */
export function initPagination() {
    const paginationContainer = document.querySelector('#pagination-container');
    if (!paginationContainer) return;

    // Event delegation for pagination clicks
    paginationContainer.addEventListener('click', function (e) {
        const button = e.target.closest('button[data-page]');
        if (!button || button.disabled) return;

        const pageNumber = parseInt(button.dataset.page);
        goToPage(pageNumber);
    });
}
