import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import http from '../utils/http'

export interface User {
    id: string
    email: string
    name: string
    avatar?: string
}

export interface Session {
    user: User
    token: string
    expiresAt: string
}

export const useAuthStore = defineStore('auth', () => {
    // State
    const session = ref<Session | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // Computed
    const isAuthenticated = computed(() => session.value !== null)
    const currentUser = computed(() => session.value?.user || null)

    // Actions
    async function login(email: string, password: string) {
        isLoading.value = true
        error.value = null

        try {
            const response = await http.post('/auth/sign-in/email', {
                email,
                password,
            })

            const data = response.data

            // Handle response structure
            const user = data.user || data
            const sessionData = data.session || data
            const token = sessionData.token || data.token

            if (!user || !token) {
                throw new Error('Invalid response from server')
            }

            const newSession: Session = {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    avatar: user.image || user.avatar
                },
                token: token,
                expiresAt: sessionData.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            }

            session.value = newSession
            localStorage.setItem('kilat-session', JSON.stringify(newSession))
            return { success: true }
        } catch (err) {
            console.error('Login error:', err)
            error.value = err instanceof Error ? err.message : 'Login failed'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    async function register(name: string, email: string, password: string) {
        isLoading.value = true
        error.value = null

        try {
            const response = await http.post('/auth/sign-up/email', {
                name,
                email,
                password,
            })

            const data = response.data

            const user = data.user || data
            const sessionData = data.session || data
            const token = sessionData.token || data.token

            if (!user || !token) {
                throw new Error('Invalid response from server')
            }

            const newSession: Session = {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    avatar: user.image || user.avatar
                },
                token: token,
                expiresAt: sessionData.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            }

            session.value = newSession
            localStorage.setItem('kilat-session', JSON.stringify(newSession))
            return { success: true }
        } catch (err) {
            console.error('Registration error:', err)
            error.value = err instanceof Error ? err.message : 'Registration failed'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        try {
            await http.post('/auth/sign-out')
        } catch (e) {
            console.error('Logout API call failed', e)
        }

        session.value = null
        localStorage.removeItem('kilat-session')
        error.value = null
    }

    function restoreSession() {
        try {
            const savedSession = localStorage.getItem('kilat-session')
            if (savedSession) {
                const parsedSession = JSON.parse(savedSession) as Session

                // Check if session is expired
                const expiresAt = new Date(parsedSession.expiresAt)
                if (expiresAt > new Date()) {
                    session.value = parsedSession
                    return true
                } else {
                    // Session expired, clear it
                    localStorage.removeItem('kilat-session')
                    return false
                }
            }
            return false
        } catch (err) {
            console.error('Failed to restore session:', err)
            localStorage.removeItem('kilat-session')
            return false
        }
    }

    async function checkAuth() {
        // Try to restore session from localStorage
        const restored = restoreSession()

        if (restored && session.value) {
            return true
        }

        return false
    }

    return {
        // State
        session,
        isLoading,
        error,

        // Computed
        isAuthenticated,
        currentUser,

        // Actions
        login,
        register,
        logout,
        restoreSession,
        checkAuth
    }
})
