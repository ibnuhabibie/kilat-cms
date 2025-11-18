<template>
  <div class="h-full flex flex-col">
    <div class="h-14 flex items-center border-b">
      <h2 class="text-lg font-bold text-gray-900 tracking-tight pl-4">CMS</h2>
    </div>

    <!-- Search Input -->
    <div class="px-4 py-3 bg-white">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            class="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search collections..."
          class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200"
        />
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto">
      <ul class="space-y-1 py-2">
        <li v-for="item in filteredCollections" :key="item.name">
          <router-link
            :to="`/collections/${item.name}`"
            class="block p-2 mx-3 rounded-lg transition-all duration-200 transform"
            :class="{
              'bg-blue-500 text-white font-semibold shadow-md': isActive(item),
              'text-gray-700 hover:bg-gray-100': !isActive(item),
            }"
          >
            <span class="text-sm font-medium">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="p-3 bg-white border-t border-gray-200">
      <button
        class="w-full p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <span class="flex items-center justify-center">
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Collection
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const searchQuery = ref('')

const collections = [
  { name: 'restaurants', label: 'Restaurants' },
  { name: 'banners', label: 'Banners' },
  { name: 'categories', label: 'Filter Categories' },
  { name: 'products', label: 'Products' },
  { name: 'users', label: 'Users' },
  { name: 'orders', label: 'Orders' },
  { name: 'settings', label: 'Settings' },
  { name: 'analytics', label: 'Analytics' },
  { name: 'reviews', label: 'Reviews' },
  { name: 'coupons', label: 'Coupons' },
  { name: 'shipping', label: 'Shipping Methods' },
  { name: 'payments', label: 'Payment Methods' },
  { name: 'notifications', label: 'Notifications' },
  { name: 'content', label: 'Content Pages' },
  { name: 'media', label: 'Media Library' },
  { name: 'customers', label: 'Customers' },
  { name: 'suppliers', label: 'Suppliers' },
  { name: 'inventory', label: 'Inventory' },
  { name: 'reports', label: 'Reports' },
  { name: 'integrations', label: 'Integrations' },
  { name: 'permissions', label: 'Permissions' },
  { name: 'templates', label: 'Email Templates' },
  { name: 'logs', label: 'Activity Logs' },
  { name: 'api-keys', label: 'API Keys' },
  { name: 'webhooks', label: 'Webhooks' },
  { name: 'languages', label: 'Languages' },
  { name: 'themes', label: 'Themes' },
  { name: 'plugins', label: 'Plugins' },
  { name: 'backup', label: 'Backup & Restore' },
  { name: 'maintenance', label: 'Maintenance' },
]

const filteredCollections = computed(() => {
  if (!searchQuery.value) return collections
  const query = searchQuery.value.toLowerCase()
  return collections.filter(
    (item) => item.label.toLowerCase().includes(query) || item.name.toLowerCase().includes(query),
  )
})

const isActive = (item) => {
  return route.params.collectionName === item.name
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
