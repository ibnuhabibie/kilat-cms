<template>
  <div class="h-full flex flex-col bg-slate-50 border-r border-slate-200 w-64">
    <!-- Search Input -->
    <div class="px-4 py-2">
      <div class="relative group">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IconSearch :size="16" class="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input v-model="searchQuery" type="text" placeholder="Search collections..."
          class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 pb-4">
      <div v-if="filteredCollections.length === 0" class="text-center py-8 text-slate-400 text-sm">
        No collections found
      </div>
      <ul class="space-y-1">
        <li v-for="item in filteredCollections" :key="item.name">
          <router-link :to="`/collections/${item.name}`"
            class="flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden"
            :class="{
              'bg-blue-50 text-blue-700 font-medium': isActive(item),
              'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm': !isActive(item),
            }">
            <div v-if="isActive(item)"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"></div>
            <span class="relative z-10 text-sm">{{ item.label }}</span>

            <!-- Chevron for active state -->
            <IconChevronRight v-if="isActive(item)" :size="16" class="ml-auto text-blue-500" />
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Footer - New Collection Button -->
    <div class="h-16 flex items-center px-4 border-t border-slate-200 bg-white">
      <button @click="openModal()"
        class="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 group">
        <IconPlus :size="16" class="transition-transform group-hover:rotate-90" />
        New Collection
      </button>
    </div>
  </div>

  <!-- Collection Management Modal -->
  <CollectionManageModal :isOpen="isModalOpen" :collection="selectedCollection" @close="closeModal" @save="handleSave"
    @truncate="handleTruncate" @duplicate="handleDuplicate" @delete="handleDelete" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCmsStore } from '../../stores/cms'
import { storeToRefs } from 'pinia'
import { IconSearch, IconChevronRight, IconPlus } from '@tabler/icons-vue'
import CollectionManageModal from '../CollectionManageModal/CollectionManageModal.vue'

const route = useRoute()
const store = useCmsStore()
const { collections } = storeToRefs(store)
const searchQuery = ref('')
const isModalOpen = ref(false)
const selectedCollection = ref(null)

const filteredCollections = computed(() => {
  if (!searchQuery.value) return collections.value
  const query = searchQuery.value.toLowerCase()
  return collections.value.filter(
    (item) => item.label.toLowerCase().includes(query) || item.name.toLowerCase().includes(query),
  )
})

const isActive = (item) => {
  return route.params.collectionName === item.name
}

function openModal(collection = null) {
  selectedCollection.value = collection
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedCollection.value = null
}

function handleSave(collectionData) {
  console.log('Save collection:', collectionData)
  // TODO: Implement save logic
  // store.saveCollection(collectionData)
}

function handleTruncate(collectionData) {
  console.log('Truncate collection:', collectionData)
  // TODO: Implement truncate logic
  // store.truncateCollection(collectionData.name)
}

function handleDuplicate(collectionData) {
  console.log('Duplicate collection:', collectionData)
  // TODO: Implement duplicate logic
  // store.duplicateCollection(collectionData)
}

function handleDelete(collectionData) {
  console.log('Delete collection:', collectionData)
  // TODO: Implement delete logic
  // store.deleteCollection(collectionData.name)
}
</script>
