# Authentication Setup

## Overview

The Kilat CMS now includes a complete authentication system with login, session management, and route protection.

## Features

✅ **Login Page** - Beautiful, modern login interface
✅ **Email/Password Authentication** - Simple credential-based login
✅ **Session Management** - Persistent sessions with localStorage
✅ **Route Guards** - Automatic redirection for protected routes
✅ **Logout Functionality** - Clean session termination
✅ **User Profile Display** - Shows current user in sidebar

## Demo Credentials

For testing purposes, use these credentials:

```
Email: admin@kilat.com
Password: password
```

## How It Works

### 1. Authentication Store (`src/stores/auth.ts`)

The auth store manages:
- User session state
- Login/logout actions
- Session persistence via localStorage
- Session validation and expiration

### 2. Login Page (`src/components/LoginPage.vue`)

Features:
- Email and password inputs
- Show/hide password toggle
- Loading states during authentication
- Error message display
- Remember me checkbox
- Demo credentials display
- Responsive design

### 3. Router Guards (`src/router/index.ts`)

The router includes navigation guards that:
- Check authentication status before each route
- Redirect unauthenticated users to `/login`
- Redirect authenticated users away from login page
- Preserve intended destination with `redirect` query parameter

### 4. Protected Routes

All collection routes require authentication:
```typescript
{
  path: '/collections/:collectionName',
  meta: { requiresAuth: true }
}
```

### 5. User Profile in Sidebar

The sidebar footer displays:
- User avatar (or initials)
- User name
- User email
- Logout button

## Usage

### Accessing the Application

1. Navigate to the application
2. If not logged in, you'll be redirected to `/login`
3. Enter credentials and click "Sign In"
4. On successful login, you'll be redirected to the collections page

### Logging Out

Click the "Logout" button in the sidebar footer to:
- Clear the session
- Remove localStorage data
- Redirect to login page

### Session Persistence

Sessions are stored in localStorage and will persist across:
- Page refreshes
- Browser restarts (until expiration)
- Tab closures

Sessions expire after 24 hours by default.

## Integration with Backend API

To connect to your actual backend API, update the `login` function in `src/stores/auth.ts`:

```typescript
async function login(email: string, password: string) {
  isLoading.value = true
  error.value = null

  try {
    // Replace with your actual API endpoint
    const response = await fetch('http://localhost:3000/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await response.json()
    
    const session: Session = {
      user: data.user,
      token: data.session.token,
      expiresAt: data.session.expiresAt
    }

    session.value = session
    localStorage.setItem('kilat-session', JSON.stringify(session))
    
    return { success: true }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login failed'
    return { success: false, error: error.value }
  } finally {
    isLoading.value = false
  }
}
```

## Security Considerations

### Current Implementation (Development)

⚠️ **For development only:**
- Credentials are hardcoded
- No actual backend validation
- Sessions stored in localStorage (vulnerable to XSS)

### Production Recommendations

For production deployment:

1. **Use HTTP-only Cookies** instead of localStorage
2. **Implement CSRF Protection**
3. **Use Secure HTTPS** connections
4. **Add Rate Limiting** to prevent brute force attacks
5. **Implement Token Refresh** mechanism
6. **Add Multi-Factor Authentication** (optional)
7. **Use Environment Variables** for API endpoints
8. **Implement Proper Password Hashing** on backend
9. **Add Session Timeout Warnings**
10. **Log Authentication Events** for security auditing

## File Structure

```
src/
├── stores/
│   └── auth.ts              # Authentication store
├── components/
│   ├── LoginPage.vue        # Login page component
│   └── Sidebar.vue          # Updated with user profile
└── router/
    └── index.ts             # Router with auth guards
```

## API Integration Example

When integrating with the Kilat API (from `kilat-api` project):

```typescript
// In auth.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include' // For cookies
  })
  
  // Handle response...
}
```

## Next Steps

1. **Connect to Backend API** - Replace mock authentication with real API calls
2. **Add Password Reset** - Implement forgot password flow
3. **Add Registration** - Create sign-up page
4. **Add OAuth Providers** - Google, GitHub, etc.
5. **Implement Token Refresh** - Auto-refresh expired tokens
6. **Add User Settings** - Profile management page
7. **Add Role-Based Access** - Different permissions per role
8. **Add Audit Logging** - Track user actions

## Troubleshooting

### Can't Login

- Check that you're using the correct demo credentials
- Check browser console for errors
- Clear localStorage and try again

### Redirected to Login After Refresh

- Check that session hasn't expired
- Verify localStorage contains `kilat-session`
- Check browser console for session validation errors

### Logout Not Working

- Check browser console for errors
- Verify router is properly configured
- Clear localStorage manually if needed
