<template>
  <div class="h-full flex flex-col bg-slate-50 border-r border-slate-200 w-64">
    <!-- Header -->
    <div class="h-14 flex items-center px-6 border-b border-slate-200 bg-white">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
          <span class="text-white font-bold text-lg">K</span>
        </div>
        <h2 class="text-xl font-bold text-slate-800 tracking-tight">Kilat CMS</h2>
      </div>
    </div>

    <!-- Workspace Dropdown -->
    <div class="px-4 pt-4 pb-2">
      <div class="relative">
        <button @click="isWorkspaceDropdownOpen = !isWorkspaceDropdownOpen"
          class="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-left hover:border-blue-300 hover:shadow-sm transition-all duration-200 flex items-center justify-between group">
          <div class="flex-1 min-w-0">
            <div class="text-xs text-slate-500 mb-0.5">Workspace</div>
            <div class="text-sm font-medium text-slate-800 truncate">{{ currentWorkspace.name }}</div>
          </div>
          <svg class="w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-2"
            :class="{ 'rotate-180': isWorkspaceDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isWorkspaceDropdownOpen"
          class="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div class="max-h-64 overflow-y-auto">
            <button v-for="workspace in workspaces" :key="workspace.id" @click="selectWorkspace(workspace.id)"
              class="w-full px-3 py-2.5 text-left hover:bg-slate-50 transition-colors duration-150 border-b border-slate-100 last:border-b-0"
              :class="{ 'bg-blue-50': workspace.id === currentWorkspace.id }">
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-slate-800 truncate">{{ workspace.name }}</div>
                  <div class="text-xs text-slate-500 mt-0.5">{{ workspace.memberCount }} member{{
                    workspace.memberCount !== 1 ? 's' : '' }}</div>
                </div>
                <span class="text-xs px-2 py-0.5 rounded-full flex-shrink-0" :class="{
                  'bg-purple-100 text-purple-700': workspace.role === 'owner',
                  'bg-blue-100 text-blue-700': workspace.role === 'admin',
                  'bg-green-100 text-green-700': workspace.role === 'editor',
                  'bg-slate-100 text-slate-700': workspace.role === 'member'
                }">
                  {{ workspace.role }}
                </span>
              </div>
            </button>
          </div>
          <div class="border-t border-slate-200 p-2">
            <button
              class="w-full px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 font-medium">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              New Workspace
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Input -->
    <div class="px-4 py-2">
      <div class="relative group">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none"
            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input v-model="searchQuery" type="text" placeholder="Search collections..."
          class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 pb-4">
      <div v-if="filteredCollections.length === 0" class="text-center py-8 text-slate-400 text-sm">
        No collections found
      </div>
      <ul class="space-y-1">
        <li v-for="item in filteredCollections" :key="item.name">
          <router-link :to="`/collections/${item.name}`"
            class="flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden"
            :class="{
              'bg-blue-50 text-blue-700 font-medium': isActive(item),
              'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm': !isActive(item),
            }">
            <div v-if="isActive(item)"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"></div>
            <span class="relative z-10 text-sm">{{ item.label }}</span>

            <!-- Chevron for active state -->
            <svg v-if="isActive(item)" class="w-4 h-4 ml-auto text-blue-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="h-16 flex items-center px-4 border-t border-slate-200 bg-white">
      <button
        class="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 group">
        <svg class="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        New Collection
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCmsStore } from '../stores/cms'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useCmsStore()
const { collections, workspaces, currentWorkspace } = storeToRefs(store)
const searchQuery = ref('')
const isWorkspaceDropdownOpen = ref(false)

const filteredCollections = computed(() => {
  if (!searchQuery.value) return collections.value
  const query = searchQuery.value.toLowerCase()
  return collections.value.filter(
    (item) => item.label.toLowerCase().includes(query) || item.name.toLowerCase().includes(query),
  )
})

const isActive = (item) => {
  return route.params.collectionName === item.name
}

const selectWorkspace = (workspaceId) => {
  store.setWorkspace(workspaceId)
  isWorkspaceDropdownOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isWorkspaceDropdownOpen.value = false
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('click', handleClickOutside)
}
</script>

<style scoped>
/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
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
