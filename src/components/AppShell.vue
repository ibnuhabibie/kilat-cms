<template>
  <div class="flex h-screen bg-gray-50 text-gray-900">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <CollectionTable />
    </main>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import HeaderBar from './HeaderBar.vue'
import CollectionTable from './CollectionTable.vue'

</script>
