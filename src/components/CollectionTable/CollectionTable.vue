<template>
  <CollectionHeader />
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
                <IconEdit :size="16" />
              </button>
              <button class="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors">
                <IconTrash :size="16" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Sticky Footer Pagination -->
  <CollectionFooter :totalRecords="totalRecords" v-model:currentPage="currentPage"
    v-model:itemsPerPage="itemsPerPage" />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCmsStore } from '../../stores/cms'
import CollectionFooter from './CollectionFooter.vue';
import CollectionHeader from './CollectionHeader.vue';
import { IconEdit, IconTrash } from '@tabler/icons-vue'

const store = useCmsStore()
const { items, fields, pagination } = storeToRefs(store)
const { setPage, setItemsPerPage } = store

// Computed properties for v-model binding to store state
import { computed } from 'vue'

const currentPage = computed({
  get: () => pagination.value.currentPage,
  set: (val) => setPage(val)
})

const itemsPerPage = computed({
  get: () => pagination.value.itemsPerPage,
  set: (val) => setItemsPerPage(val)
})

const totalRecords = computed(() => pagination.value.totalRecords)
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

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>