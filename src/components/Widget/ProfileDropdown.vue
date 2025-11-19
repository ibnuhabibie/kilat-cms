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
            <svg class="w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-180': isDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
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
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile Settings</span>
                </button>
                <button
                    class="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Account Settings</span>
                </button>
                <button
                    class="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Help & Support</span>
                </button>
            </div>

            <!-- Logout -->
            <div class="border-t border-slate-200 py-1">
                <button @click="handleLogout"
                    class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 font-medium">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
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
