// Main Entry Point - Imports and initializes all modules

import { initTailwindConfig } from './modules/config.js';
import { initJobLoading } from './modules/jobService.js';
import { initApplyButtons } from './modules/applyButton.js';
import { initFilters } from './modules/filters.js';
import { initSearch } from './modules/search.js';
import { initPagination } from './modules/pagination.js';

// Initialize Tailwind configuration
initTailwindConfig();

// Initialize all functionality
initApplyButtons();
initFilters();
initSearch();
initPagination();
initJobLoading();
