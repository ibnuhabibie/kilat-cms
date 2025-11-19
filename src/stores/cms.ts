import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Types
export interface Workspace {
    id: string
    name: string
    slug: string
    role: 'owner' | 'admin' | 'editor' | 'member'
    memberCount: number
    createdAt: string
}

export interface ContentType {
    id: string
    name: string
    slug: string
    description?: string
    entryCount: number
    icon?: string
    createdAt: string
}

export interface Collection {
    name: string
    label: string
}

export const useCmsStore = defineStore('cms', () => {
    // Workspace State
    const workspaces = ref<Workspace[]>([
        {
            id: '1',
            name: 'My Personal Workspace',
            slug: 'my-personal-workspace',
            role: 'owner',
            memberCount: 1,
            createdAt: '2024-01-15'
        },
        {
            id: '2',
            name: 'Acme Corporation',
            slug: 'acme-corp',
            role: 'admin',
            memberCount: 12,
            createdAt: '2024-02-01'
        },
        {
            id: '3',
            name: 'Startup Inc',
            slug: 'startup-inc',
            role: 'editor',
            memberCount: 5,
            createdAt: '2024-03-10'
        },
        {
            id: '4',
            name: 'Design Agency',
            slug: 'design-agency',
            role: 'member',
            memberCount: 8,
            createdAt: '2024-03-20'
        }
    ])

    const currentWorkspace = ref<Workspace>(workspaces.value[0]!)

    // Content Types (Collections) State
    const contentTypes = ref<ContentType[]>([
        {
            id: 'ct-1',
            name: 'Blog Posts',
            slug: 'blog-posts',
            description: 'Articles and blog content',
            entryCount: 45,
            icon: '📝',
            createdAt: '2024-01-20'
        },
        {
            id: 'ct-2',
            name: 'Products',
            slug: 'products',
            description: 'E-commerce product catalog',
            entryCount: 128,
            icon: '🛍️',
            createdAt: '2024-01-22'
        },
        {
            id: 'ct-3',
            name: 'Authors',
            slug: 'authors',
            description: 'Content authors and contributors',
            entryCount: 12,
            icon: '✍️',
            createdAt: '2024-01-25'
        },
        {
            id: 'ct-4',
            name: 'Categories',
            slug: 'categories',
            description: 'Content categorization',
            entryCount: 24,
            icon: '📁',
            createdAt: '2024-02-01'
        },
        {
            id: 'ct-5',
            name: 'Pages',
            slug: 'pages',
            description: 'Static website pages',
            entryCount: 18,
            icon: '📄',
            createdAt: '2024-02-05'
        },
        {
            id: 'ct-6',
            name: 'Media',
            slug: 'media',
            description: 'Images, videos, and files',
            entryCount: 342,
            icon: '🖼️',
            createdAt: '2024-02-10'
        },
        {
            id: 'ct-7',
            name: 'Testimonials',
            slug: 'testimonials',
            description: 'Customer reviews and testimonials',
            entryCount: 56,
            icon: '💬',
            createdAt: '2024-02-15'
        },
        {
            id: 'ct-8',
            name: 'Team Members',
            slug: 'team-members',
            description: 'Company team members',
            entryCount: 15,
            icon: '👥',
            createdAt: '2024-02-20'
        },
        {
            id: 'ct-9',
            name: 'FAQ',
            slug: 'faq',
            description: 'Frequently asked questions',
            entryCount: 32,
            icon: '❓',
            createdAt: '2024-03-01'
        },
        {
            id: 'ct-10',
            name: 'Events',
            slug: 'events',
            description: 'Upcoming events and webinars',
            entryCount: 8,
            icon: '📅',
            createdAt: '2024-03-05'
        }
    ])

    // Legacy collections for backward compatibility
    const collections = computed<Collection[]>(() => {
        return contentTypes.value.map(ct => ({
            name: ct.slug,
            label: ct.name
        }))
    })

    const currentCollection = ref('blog-posts')
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
        order: 'asc' as 'asc' | 'desc'
    })

    // Workspace Actions
    function setWorkspace(workspaceId: string) {
        const workspace = workspaces.value.find(w => w.id === workspaceId)
        if (!workspace) return

        currentWorkspace.value = workspace
        // Reset to first collection when switching workspace
        if (contentTypes.value.length > 0) {
            setCollection(contentTypes.value[0]!.slug)
        }
    }

    function addWorkspace(workspace: Workspace) {
        workspaces.value.push(workspace)
    }

    // Content Type Actions
    function addContentType(contentType: ContentType) {
        contentTypes.value.push(contentType)
    }

    function removeContentType(id: string) {
        const index = contentTypes.value.findIndex(ct => ct.id === id)
        if (index !== -1) {
            contentTypes.value.splice(index, 1)
        }
    }

    // Collection Actions
    function setCollection(slug: string) {
        currentCollection.value = slug
        pagination.value.currentPage = 1
        fetchItems()
    }

    function setPage(page: number) {
        pagination.value.currentPage = page
        fetchItems()
    }

    function setItemsPerPage(count: number) {
        pagination.value.itemsPerPage = count
        pagination.value.currentPage = 1
        fetchItems()
    }

    function setSearch(query: string) {
        searchQuery.value = query
        pagination.value.currentPage = 1
        fetchItems()
    }

    function fetchItems() {
        // Mock data generation based on collection and pagination
        const currentContentType = contentTypes.value.find(ct => ct.slug === currentCollection.value)

        // Generate fields based on collection
        if (currentCollection.value === 'blog-posts') {
            fields.value = [
                { key: 'title', label: 'Title', minWidth: 'min-w-[250px]' },
                { key: 'author', label: 'Author', minWidth: 'min-w-[150px]' },
                { key: 'category', label: 'Category', minWidth: 'min-w-[120px]' },
                { key: 'status', label: 'Status', minWidth: 'min-w-[120px]' },
                { key: 'publishedAt', label: 'Published', minWidth: 'min-w-[150px]' },
                { key: 'views', label: 'Views', minWidth: 'min-w-[100px]' },
                { key: 'createdAt', label: 'Created At', minWidth: 'min-w-[150px]' },
            ]
        } else if (currentCollection.value === 'products') {
            fields.value = [
                { key: 'name', label: 'Product Name', minWidth: 'min-w-[200px]' },
                { key: 'sku', label: 'SKU', minWidth: 'min-w-[120px]' },
                { key: 'price', label: 'Price', minWidth: 'min-w-[100px]' },
                { key: 'stock', label: 'Stock', minWidth: 'min-w-[100px]' },
                { key: 'category', label: 'Category', minWidth: 'min-w-[150px]' },
                { key: 'status', label: 'Status', minWidth: 'min-w-[120px]' },
                { key: 'createdAt', label: 'Created At', minWidth: 'min-w-[150px]' },
            ]
        } else {
            // Generic fields for other collections
            fields.value = [
                { key: 'name', label: 'Name', minWidth: 'min-w-[200px]' },
                { key: 'id', label: 'ID', minWidth: 'min-w-[100px]' },
                { key: 'status', label: 'Status', minWidth: 'min-w-[120px]' },
                { key: 'createdAt', label: 'Created At', minWidth: 'min-w-[150px]' },
            ]
        }

        // Use entry count from content type or default
        const count = currentContentType?.entryCount ?? 50
        pagination.value.totalRecords = count

        const start = (pagination.value.currentPage - 1) * pagination.value.itemsPerPage
        const end = start + pagination.value.itemsPerPage

        // Generate mock items
        items.value = Array.from({ length: pagination.value.itemsPerPage }).map((_, i) => {
            const index = start + i
            if (index >= count) return null

            if (currentCollection.value === 'blog-posts') {
                return {
                    id: index + 1,
                    title: `${['How to', 'Guide to', 'Understanding', 'Introduction to', 'Advanced'][index % 5]} ${['Vue.js', 'React', 'TypeScript', 'Node.js', 'Web Development'][index % 5]}`,
                    author: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'][index % 4],
                    category: ['Technology', 'Tutorial', 'News', 'Review'][index % 4],
                    status: ['Published', 'Draft', 'Scheduled'][index % 3],
                    publishedAt: new Date(2024, index % 12, (index % 28) + 1).toLocaleDateString(),
                    views: Math.floor(Math.random() * 10000),
                    createdAt: new Date(2024, index % 12, (index % 28) + 1).toLocaleDateString(),
                }
            } else if (currentCollection.value === 'products') {
                return {
                    id: index + 1,
                    name: `Product ${index + 1}`,
                    sku: `SKU-${(index + 1).toString().padStart(5, '0')}`,
                    price: `$${(Math.random() * 1000).toFixed(2)}`,
                    stock: Math.floor(Math.random() * 500),
                    category: ['Electronics', 'Clothing', 'Books', 'Home & Garden'][index % 4],
                    status: Math.random() > 0.3 ? 'In Stock' : 'Out of Stock',
                    createdAt: new Date(2024, index % 12, (index % 28) + 1).toLocaleDateString(),
                }
            } else {
                return {
                    id: index + 1,
                    name: `${currentContentType?.name || 'Item'} ${index + 1}`,
                    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
                    createdAt: new Date(2024, index % 12, (index % 28) + 1).toLocaleDateString(),
                }
            }
        }).filter(Boolean)
    }

    // Initial fetch
    fetchItems()

    return {
        // Workspace
        workspaces,
        currentWorkspace,
        setWorkspace,
        addWorkspace,

        // Content Types
        contentTypes,
        addContentType,
        removeContentType,

        // Collections (legacy)
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
