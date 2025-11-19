import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCollectionStore = defineStore('collection', () => {
    // State
    const collections = ref([
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
    ])

    const currentCollection = ref('restaurants')
    const items = ref<any[]>([])
    const fields = ref<any[]>([])
    const searchQuery = ref('')

    const pagination = ref({
        currentPage: 1,
        itemsPerPage: 10,
        totalRecords: 0
    })

    const sort = ref({
        field: '',
        order: 'asc' // 'asc' or 'desc'
    })

    // Actions
    function setCollection(name: string) {
        currentCollection.value = name
        pagination.value.currentPage = 1
        fetchItems()
    }

    function setPage(page: number) {
        pagination.value.currentPage = page
        fetchItems()
    }

    function setItemsPerPage(count: number) {
        pagination.value.itemsPerPage = count
        pagination.value.currentPage = 1 // Reset to first page on size change
        fetchItems()
    }

    function setSearch(query: string) {
        searchQuery.value = query
        pagination.value.currentPage = 1
        fetchItems()
    }

    function fetchItems() {
        // Mock data generation based on collection and pagination
        // In a real app, this would be an API call

        // Generate fields based on collection (mock)
        if (currentCollection.value === 'restaurants') {
            fields.value = [
                { key: 'name', label: 'Name', minWidth: 'min-w-[200px]' },
                { key: 'address', label: 'Address', minWidth: 'min-w-[250px]' },
                { key: 'email', label: 'Email', minWidth: 'min-w-[200px]' },
                { key: 'phone', label: 'Phone', minWidth: 'min-w-[150px]' },
                { key: 'website', label: 'Website', minWidth: 'min-w-[200px]' },
                { key: 'status', label: 'Status', minWidth: 'min-w-[120px]' },
                { key: 'category', label: 'Category', minWidth: 'min-w-[150px]' },
                { key: 'rating', label: 'Rating', minWidth: 'min-w-[100px]' },
                { key: 'description', label: 'Description', minWidth: 'min-w-[300px]' },
                { key: 'tags', label: 'Tags', minWidth: 'min-w-[200px]' },
                { key: 'createdAt', label: 'Created At', minWidth: 'min-w-[180px]' },
                { key: 'updatedAt', label: 'Updated At', minWidth: 'min-w-[180px]' },
            ]
        } else {
            // Generic fields for other collections
            fields.value = [
                { key: 'name', label: 'Name', minWidth: 'min-w-[200px]' },
                { key: 'id', label: 'ID', minWidth: 'min-w-[100px]' },
                { key: 'status', label: 'Status', minWidth: 'min-w-[120px]' },
                { key: 'createdAt', label: 'Created At', minWidth: 'min-w-[180px]' },
            ]
        }

        // Generate mock items
        const count = 50 // Mock total
        pagination.value.totalRecords = count

        const start = (pagination.value.currentPage - 1) * pagination.value.itemsPerPage
        const end = start + pagination.value.itemsPerPage

        items.value = Array.from({ length: pagination.value.itemsPerPage }).map((_, i) => {
            const index = start + i
            if (index >= count) return null

            if (currentCollection.value === 'restaurants') {
                return {
                    id: index + 1,
                    name: 'Restaurant ' + (index + 1),
                    address: 'Street ' + (index + 1) + ', City, Country',
                    email: `contact${index + 1}@example.com`,
                    phone: `+1 555 01${(index + 1).toString().padStart(2, '0')}`,
                    website: `www.restaurant${index + 1}.com`,
                    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
                    category: ['Italian', 'Chinese', 'Mexican', 'Indian', 'American'][Math.floor(Math.random() * 5)],
                    rating: (Math.random() * 5).toFixed(1),
                    description: 'A wonderful place to dine with family and friends. Enjoy our delicious meals prepared by top chefs.',
                    tags: 'Dining, Family, Casual',
                    createdAt: new Date().toLocaleDateString(),
                    updatedAt: new Date().toLocaleDateString(),
                }
            } else {
                return {
                    id: index + 1,
                    name: `${currentCollection.value} Item ${index + 1}`,
                    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
                    createdAt: new Date().toLocaleDateString(),
                }
            }
        }).filter(Boolean)
    }

    // Initial fetch
    fetchItems()

    return {
        collections,
        currentCollection,
        items,
        fields,
        pagination,
        searchQuery,
        sort,
        setCollection,
        setPage,
        setItemsPerPage,
        setSearch,
        fetchItems
    }
})
