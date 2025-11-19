<template>
  <header class="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white">
    <div class="flex items-center space-x-2">
      <button
        class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">Filter</button>
      <button
        class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">Sort</button>
      <button
        class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">Hide
        Fields</button>
    </div>

    <div class="flex items-center space-x-3">
      <div class="relative group">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IconSearch :size="16" class="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input type="text" placeholder="Search data…"
          class="pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl w-64 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm"
          v-model="searchQuery" @input="setSearch($event.target.value)" />
      </div>

      <button
        class="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-slate-900/20 flex items-center gap-2">
        <IconPlus :size="16" />
        New Record
      </button>
    </div>
  </header>
</template>

<script setup>
import { useCmsStore } from '../../stores/cms'
import { storeToRefs } from 'pinia'
import { IconSearch, IconPlus } from '@tabler/icons-vue'

const store = useCmsStore()
const { searchQuery } = storeToRefs(store)
const { setSearch } = store
</script>
