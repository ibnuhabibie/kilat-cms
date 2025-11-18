<template>
  <header class="h-14 border-b flex items-center justify-between px-4 bg-white">
    <div class="flex items-center space-x-2">
      <button class="px-3 py-1.5 rounded border hover:bg-gray-100">Filter</button>
      <button class="px-3 py-1.5 rounded border hover:bg-gray-100">Sort</button>
      <button class="px-3 py-1.5 rounded border hover:bg-gray-100">Hide Fields</button>
    </div>

    <div class="flex items-center space-x-3">
      <input
        type="text"
        placeholder="Search data…"
        class="px-3 py-1.5 border rounded-lg w-56 focus:ring"
      />

      <button class="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700">
        + New Record
      </button>
    </div>
  </header>
</template>
