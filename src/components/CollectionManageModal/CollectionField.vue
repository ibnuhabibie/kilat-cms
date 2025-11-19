<template>
    <div class="border border-slate-200 rounded-lg bg-white overflow-hidden">
        <!-- Field Header (Collapsible) -->
        <button @click="toggleExpanded" type="button"
            class="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-3 flex-1">
                <!-- Drag Handle -->
                <div class="cursor-move text-slate-400 hover:text-slate-600">
                    <IconGripVertical :size="18" />
                </div>

                <!-- Field Info -->
                <div class="flex items-center gap-3 flex-1">
                    <div class="flex-1 text-left">
                        <div class="flex items-center gap-2">
                            <span class="font-medium text-slate-800">
                                {{ field.name || 'Untitled Field' }}
                            </span>
                            <span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                                {{ field.type }}
                            </span>
                            <span v-if="field.required"
                                class="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                                Required
                            </span>
                            <span v-if="field.unique"
                                class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                                Unique
                            </span>
                        </div>
                        <p v-if="field.type === 'relation'" class="text-xs text-slate-500 mt-0.5">
                            {{ field.relationType }} → {{ field.relationCollection || 'Not set' }}
                        </p>
                    </div>
                </div>

                <!-- Delete Button -->
                <button @click.stop="$emit('delete')"
                    class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <IconTrash :size="16" />
                </button>
            </div>

            <!-- Expand/Collapse Icon -->
            <IconChevronDown :size="20" class="text-slate-400 transition-transform duration-200 ml-2"
                :class="{ 'rotate-180': isExpanded }" />
        </button>

        <!-- Field Content (Expandable) -->
        <Transition name="accordion">
            <div v-if="isExpanded" class="px-4 pb-4 space-y-3 bg-slate-50">
                <!-- Field Name & Type -->
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">
                            Field Name
                        </label>
                        <input v-model="field.name" type="text" placeholder="e.g., title, price"
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">
                            Field Type
                        </label>
                        <select v-model="field.type"
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="text">Text</option>
                            <option value="textarea">Textarea</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            <option value="url">URL</option>
                            <option value="date">Date</option>
                            <option value="datetime">Date & Time</option>
                            <option value="boolean">Boolean</option>
                            <option value="select">Select</option>
                            <option value="multiselect">Multi-Select</option>
                            <option value="relation">Relation</option>
                            <option value="media">Media</option>
                            <option value="richtext">Rich Text</option>
                            <option value="json">JSON</option>
                        </select>
                    </div>
                </div>

                <!-- Relation Configuration (if type is relation) -->
                <div v-if="field.type === 'relation'" class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">
                            Related Collection
                        </label>
                        <select v-model="field.relationCollection"
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select collection...</option>
                            <option value="users">Users</option>
                            <option value="categories">Categories</option>
                            <option value="tags">Tags</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">
                            Relation Type
                        </label>
                        <select v-model="field.relationType"
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="one-to-one">One to One</option>
                            <option value="one-to-many">One to Many</option>
                            <option value="many-to-many">Many to Many</option>
                        </select>
                    </div>
                </div>

                <!-- Validation Options -->
                <div class="flex flex-wrap gap-3">
                    <label class="flex items-center gap-2 text-sm text-slate-700">
                        <input v-model="field.required" type="checkbox"
                            class="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        Required
                    </label>
                    <label class="flex items-center gap-2 text-sm text-slate-700">
                        <input v-model="field.unique" type="checkbox"
                            class="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        Unique
                    </label>
                    <label v-if="field.type === 'text' || field.type === 'textarea'"
                        class="flex items-center gap-2 text-sm text-slate-700">
                        <input v-model="field.searchable" type="checkbox"
                            class="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        Searchable
                    </label>
                </div>

                <!-- Default Value -->
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">
                        Default Value (optional)
                    </label>
                    <input v-model="field.defaultValue" type="text" placeholder="Enter default value"
                        class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { IconGripVertical, IconTrash, IconChevronDown } from '@tabler/icons-vue'

const props = defineProps({
    field: {
        type: Object,
        required: true
    },
    expanded: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['delete', 'toggle'])

const isExpanded = ref(props.expanded)

function toggleExpanded() {
    isExpanded.value = !isExpanded.value
    emit('toggle', isExpanded.value)
}

// Watch for external changes to expanded prop
import { watch } from 'vue'
watch(() => props.expanded, (newValue) => {
    isExpanded.value = newValue
})
</script>

<style scoped>
/* Accordion animation */
.accordion-enter-active,
.accordion-leave-active {
    transition: all 0.3s ease;
    overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
    max-height: 0;
    opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
    max-height: 500px;
    opacity: 1;
}
</style>
