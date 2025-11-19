<template>
    <div class="relative h-full flex items-center">
        <button @click="isWorkspaceDropdownOpen = !isWorkspaceDropdownOpen"
            class="h-9 px-3 bg-white border border-slate-200 rounded-lg text-left hover:border-blue-300 hover:shadow-sm transition-all duration-200 flex items-center gap-3 min-w-[200px]">
            <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-slate-800 truncate">{{ currentWorkspace.name }}</div>
            </div>
            <svg class="w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-180': isWorkspaceDropdownOpen }" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isWorkspaceDropdownOpen"
            class="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden min-w-[280px]">
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
</template>

<script setup>
import { ref } from 'vue'
import { useCmsStore } from '../../stores/cms'
import { storeToRefs } from 'pinia'

const store = useCmsStore()
const { workspaces, currentWorkspace } = storeToRefs(store)
const isWorkspaceDropdownOpen = ref(false)

const selectWorkspace = (workspaceId) => {
    store.setWorkspace(workspaceId)
    isWorkspaceDropdownOpen.value = false
}

const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
        isWorkspaceDropdownOpen.value = false
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside)
}
</script>