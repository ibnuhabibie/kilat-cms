import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
            // Simulate API call - replace with actual API call to your backend
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock validation - replace with actual API validation
            if (email === 'admin@kilat.com' && password === 'password') {
                const mockSession: Session = {
                    user: {
                        id: '1',
                        email: email,
                        name: 'Admin User',
                        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff'
                    },
                    token: 'mock-jwt-token-' + Date.now(),
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                }

                session.value = mockSession
                localStorage.setItem('kilat-session', JSON.stringify(mockSession))
                return { success: true }
            } else {
                throw new Error('Invalid email or password')
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Login failed'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
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
            // Optionally validate session with backend
            // const isValid = await validateSessionWithBackend(session.value.token)
            // if (!isValid) {
            //     logout()
            //     return false
            // }
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
        logout,
        restoreSession,
        checkAuth
    }
})
