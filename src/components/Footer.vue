<template>
  <footer class="h-16 border-t border-slate-200 bg-white flex items-center justify-between px-6 text-sm">
    <!-- Records Info -->
    <div class="flex items-center space-x-4">
      <span class="text-slate-600">
        Showing {{ startRecord }} to {{ endRecord }} of {{ totalRecords }} records
      </span>

      <!-- Items per page selector -->
      <div class="flex items-center space-x-2">
        <span class="text-slate-500">Items per page:</span>
        <select
          :value="itemsPerPage"
          @change="handleItemsPerPageChange"
          class="px-2 py-1 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-700 bg-white"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center space-x-2">
      <!-- Previous Button -->
      <button
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
        class="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-1 text-slate-600"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        <span>Prev</span>
      </button>

      <!-- Page Numbers -->
      <div class="flex space-x-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-2 border rounded-lg transition-colors duration-200 font-medium',
            currentPage === page
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50',
          ]"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="goToNextPage"
        :disabled="currentPage >= totalPages"
        class="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-1 text-slate-600"
      >
        <span>Next</span>
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  totalRecords: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
})

// Emits
const emit = defineEmits(['update:currentPage', 'update:itemsPerPage'])

// Computed properties
const totalPages = computed(() => Math.ceil(props.totalRecords / props.itemsPerPage))
const startRecord = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1)
const endRecord = computed(() =>
  Math.min(props.currentPage * props.itemsPerPage, props.totalRecords),
)

// Visible pages calculation (show max 5 pages)
const visiblePages = computed(() => {
  const pages = []
  const maxPagesToShow = 5

  if (totalPages.value <= maxPagesToShow) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    let startPage = Math.max(1, props.currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = startPage + maxPagesToShow - 1

    if (endPage > totalPages.value) {
      endPage = totalPages.value
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
  }

  return pages
})

// Methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

const goToPreviousPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

const goToNextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit('update:currentPage', props.currentPage + 1)
  }
}

const handleItemsPerPageChange = (event) => {
  const newItemsPerPage = parseInt(event.target.value)
  emit('update:itemsPerPage', newItemsPerPage)
}
</script>
