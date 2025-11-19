<template>
  <HeaderBar />
  <!-- Scrollable Data Area -->
  <div class="flex-1 overflow-auto">
    <table class="min-w-full bg-white text-sm">
      <thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-30">
        <tr>
          <th
            class="w-10 p-3 border-r border-slate-200 sticky left-0 z-40 bg-slate-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
            <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </th>

          <th v-for="field in fields" :key="field.key"
            class="text-left font-semibold text-slate-700 p-3 whitespace-nowrap" :class="field.minWidth">
            {{ field.label }}
          </th>
          <th
            class="w-24 p-3 border-l border-slate-200 sticky right-0 z-40 bg-slate-50 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)] text-center text-slate-700 font-semibold">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id"
          class="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
          <td
            class="p-3 bg-white border-r border-slate-200 sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
            <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </td>

          <td v-for="field in fields" :key="field.key" class="p-3 whitespace-nowrap text-slate-600"
            :class="field.minWidth">
            {{ item[field.key] }}
          </td>
          <td
            class="p-3 bg-white border-l border-slate-200 sticky right-0 z-20 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)]">
            <div class="flex items-center justify-center space-x-2">
              <button class="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button class="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Sticky Footer Pagination -->
  <Footer :totalRecords="totalRecords" v-model:currentPage="currentPage" v-model:itemsPerPage="itemsPerPage" />
</template>

<script setup>
import { ref } from 'vue'

import Footer from './Footer.vue';
import HeaderBar from './HeaderBar.vue';

const totalRecords = ref(150)
const currentPage = ref(1)
const itemsPerPage = ref(10)

const fields = [
  { key: 'name', label: 'Name', minWidth: 'min-w-[200px]' },
  { key: 'address', label: 'Address', minWidth: 'min-w-[250px]' },
  { key: 'email', label: 'Email', minWidth: 'min-w-[200px]' },
  { key: 'phone', label: 'Phone', minWidth: 'min-w-[150px]' },
  { key: 'website', label: 'Website', minWidth: 'min-w-[200px]' },
  { key: 'status', label: 'Status', minWidth: 'min-w-[120px]' },
  { key: 'category', label: 'Category', minWidth: 'min-w-[150px]' },
  { key: 'rating', label: 'Rating', minWidth: 'min-w-[100px]' },
  { key: 'description', label: 'Description', minWidth: 'min-w-[300px]' },
  { key: 'tags', label: 'Tags', minWidth: 'min-w-[200px]' },
  { key: 'createdAt', label: 'Created At', minWidth: 'min-w-[180px]' },
  { key: 'updatedAt', label: 'Updated At', minWidth: 'min-w-[180px]' },
]

const items = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: 'Restaurant ' + (i + 1),
  address: 'Street ' + (i + 1) + ', City, Country',
  email: `contact${i + 1}@example.com`,
  phone: `+1 555 01${(i + 1).toString().padStart(2, '0')}`,
  website: `www.restaurant${i + 1}.com`,
  status: Math.random() > 0.5 ? 'Active' : 'Inactive',
  category: ['Italian', 'Chinese', 'Mexican', 'Indian', 'American'][Math.floor(Math.random() * 5)],
  rating: (Math.random() * 5).toFixed(1),
  description: 'A wonderful place to dine with family and friends. Enjoy our delicious meals prepared by top chefs.',
  tags: 'Dining, Family, Casual',
  createdAt: new Date().toLocaleDateString(),
  updatedAt: new Date().toLocaleDateString(),
}))

</script>


<style scoped>
/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-:hover {
  background: #94a3b8;
}
</style>