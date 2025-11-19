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
          <svg class="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input type="text" placeholder="Search data…"
          class="pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl w-64 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm"
          v-model="searchQuery" @input="setSearch($event.target.value)" />
      </div>

      <button
        class="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-slate-900/20 flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        New Record
      </button>
    </div>
  </header>
</template>

<script setup>
import { useCmsStore } from '../stores/cms'
import { storeToRefs } from 'pinia'

const store = useCmsStore()
const { searchQuery } = storeToRefs(store)
const { setSearch } = store
</script>
