<template>
  <!-- Scrollable Data Area -->
  <div class="flex-1 overflow-auto">
    <table class="min-w-full bg-white text-sm">
      <thead class="bg-gray-200 border-b sticky top-0 z-10">
        <tr>
          <th class="w-10 p-3 border-r sticky left-0 z-20">
            <input type="checkbox" />
          </th>

          <th v-for="field in fields" :key="field.key" class="text-left font-semibold p-3">
            {{ field.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-t hover:bg-gray-50">
          <td class="p-3 bg-white border-r">
            <input type="checkbox" />
          </td>

          <td v-for="field in fields" :key="field.key" class="p-3 whitespace-nowrap">
            {{ item[field.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Sticky Footer Pagination -->
</template>

<script setup>
const fields = [
  { key: 'name', label: 'Name' },
  { key: 'address', label: 'Address' },
  { key: 'email', label: 'Email' },
  { key: 'rating', label: 'Rating' },
]

const items = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: 'Restaurant ' + (i + 1),
  address: 'Street ' + (i + 1),
  email: `contact${i + 1}@example.com`,
  rating: (Math.random() * 5).toFixed(1),
}))
</script>
