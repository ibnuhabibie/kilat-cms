<template>
    <div
        class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Logo and Title -->
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
                    <span class="text-white font-bold text-2xl">K</span>
                </div>
                <h1 class="text-3xl font-bold text-slate-800 mb-2">Welcome to Kilat CMS</h1>
                <p class="text-slate-600">Sign in to manage your content</p>
            </div>

            <!-- Login Card -->
            <div class="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <form @submit.prevent="handleLogin" class="space-y-6">
                    <!-- Email Input -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <input id="email" v-model="email" type="email" required autocomplete="email"
                                class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                :class="{ 'border-red-300 focus:ring-red-500': error }" placeholder="admin@kilat.com" />
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required
                                autocomplete="current-password"
                                class="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                :class="{ 'border-red-300 focus:ring-red-500': error }" placeholder="••••••••" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                                <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error"
                        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
                        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="text-sm">{{ error }}</span>
                    </div>

                    <!-- Remember Me -->
                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                            <input type="checkbox" v-model="rememberMe"
                                class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0" />
                            <span class="ml-2 text-sm text-slate-600">Remember me</span>
                        </label>
                        <a href="#" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Forgot password?
                        </a>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:active:scale-100 flex items-center justify-center gap-2">
                        <svg v-if="isLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <span>{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
                    </button>
                </form>

                <!-- Demo Credentials -->
                <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p class="text-xs font-medium text-blue-900 mb-2">Demo Credentials:</p>
                    <div class="text-xs text-blue-700 space-y-1">
                        <p><strong>Email:</strong> admin@kilat.com</p>
                        <p><strong>Password:</strong> password</p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center mt-6 text-sm text-slate-600">
                Don't have an account?
                <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Sign up</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('admin@kilat.com')
const password = ref('password')
const showPassword = ref(false)
const rememberMe = ref(true)
const error = ref<string | null>(null)
const isLoading = ref(false)

async function handleLogin() {
    error.value = null
    isLoading.value = true

    const result = await authStore.login(email.value, password.value)

    if (result.success) {
        // Redirect to the collections page or dashboard
        const redirect = router.currentRoute.value.query.redirect as string
        router.push(redirect || '/collections/blog-posts')
    } else {
        error.value = result.error || 'Login failed. Please try again.'
    }

    isLoading.value = false
}
</script>
