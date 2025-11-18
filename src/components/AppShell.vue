<template>
  <div class="flex h-screen bg-gray-50 text-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 border-r bg-white">
      <Sidebar />
    </aside>

    <!-- Main content -->
    <main class="flex-1 flex flex-col">
      <HeaderBar />
      <CollectionTable />
      <footer class="h-14 border-t bg-white flex items-center justify-between px-4 text-sm">
        <span>Showing 10 records</span>

        <div class="flex space-x-2">
          <button class="px-3 py-1 border rounded hover:bg-gray-100">Prev</button>
          <button class="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import HeaderBar from './HeaderBar.vue'
import CollectionTable from './CollectionTable.vue'
</script>
