<template>
    <div class="relative h-full flex items-center">
        <button @click="isDropdownOpen = !isDropdownOpen" class="h-9 flex items-center gap-2">
            <!-- Name -->
            <span class="text-sm font-medium text-slate-800 max-w-[120px] truncate">
                {{ currentUser?.name || 'User' }}
            </span>

            <!-- Avatar -->
            <img v-if="currentUser?.avatar" :src="currentUser.avatar" :alt="currentUser.name"
                class="w-8 h-8 rounded-full border border-slate-200" />
            <div v-else
                class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border border-slate-200">
                <span class="text-white font-semibold text-xs">{{ currentUser?.name?.charAt(0) || 'U' }}</span>
            </div>

            <!-- Chevron -->
            <IconChevronDown :size="16" class="text-slate-400 transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-180': isDropdownOpen }" />
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isDropdownOpen"
            class="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden min-w-[240px]">
            <!-- User Info -->
            <div class="px-4 py-3 border-b border-slate-100">
                <div class="flex items-center gap-3">
                    <img v-if="currentUser?.avatar" :src="currentUser.avatar" :alt="currentUser.name"
                        class="w-10 h-10 rounded-full border-2 border-slate-200" />
                    <div v-else
                        class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center border-2 border-slate-200">
                        <span class="text-white font-semibold text-sm">{{ currentUser?.name?.charAt(0) || 'U' }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-slate-800 truncate">{{ currentUser?.name || 'User' }}</p>
                        <p class="text-xs text-slate-500 truncate">{{ currentUser?.email || '' }}</p>
                    </div>
                </div>
            </div>

            <!-- Menu Items -->
            <div class="py-1">
                <button
                    class="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3">
                    <IconUser :size="16" class="text-slate-400" />
                    <span>Profile Settings</span>
                </button>
                <button
                    class="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3">
                    <IconSettings :size="16" class="text-slate-400" />
                    <span>Account Settings</span>
                </button>
                <button
                    class="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3">
                    <IconHelp :size="16" class="text-slate-400" />
                    <span>Help & Support</span>
                </button>
            </div>

            <!-- Logout -->
            <div class="border-t border-slate-200 py-1">
                <button @click="handleLogout"
                    class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 font-medium">
                    <IconLogout :size="16" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { storeToRefs } from 'pinia'
import { IconChevronDown, IconUser, IconSettings, IconHelp, IconLogout } from '@tabler/icons-vue'

const router = useRouter()
const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const isDropdownOpen = ref(false)

async function handleLogout() {
    await authStore.logout()
    router.push('/login')
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
        isDropdownOpen.value = false
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside)
}
</script>
