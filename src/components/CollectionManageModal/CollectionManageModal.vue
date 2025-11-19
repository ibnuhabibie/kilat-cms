<template>
    <Modal :isOpen="isOpen" position="right" maxWidth="2xl" @close="handleCancel">
        <!-- Header Slot -->
        <template #header="{ close }">
            <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div>
                    <h2 class="text-xl font-bold text-slate-800">
                        {{ isEditing ? 'Edit Collection' : 'New Collection' }}
                    </h2>
                    <p class="text-sm text-slate-500 mt-0.5">Configure collection structure and settings</p>
                </div>
                <button @click="close" class="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600">
                    <IconX :size="20" />
                </button>
            </div>
        </template>

        <!-- Main Content -->
        <div class="p-6 space-y-6">
            <!-- Quick Actions (only for existing collections) -->
            <div v-if="isEditing" class="flex items-center gap-2 p-3 bg-slate-100 rounded-lg border border-slate-200">
                <span class="text-xs font-medium text-slate-600 mr-2">Quick Actions:</span>
                <button @click="handleDuplicate"
                    class="px-3 py-1.5 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1.5 text-xs font-medium">
                    <IconCopy :size="14" />
                    Duplicate
                </button>
                <button @click="handleTruncate"
                    class="px-3 py-1.5 bg-white border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors flex items-center gap-1.5 text-xs font-medium">
                    <IconDatabaseOff :size="14" />
                    Truncate
                </button>
                <button @click="handleDelete"
                    class="px-3 py-1.5 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5 text-xs font-medium">
                    <IconTrash :size="14" />
                    Delete
                </button>
            </div>

            <!-- Collection Name -->
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Collection Name
                    <span class="text-red-500">*</span>
                </label>
                <input v-model="formData.name" type="text" placeholder="e.g., Blog Posts, Products"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                <p class="text-xs text-slate-500 mt-1">This will be used as the collection identifier</p>
            </div>

            <!-- Fields Section -->
            <div>
                <div class="flex items-center justify-between mb-3">
                    <label class="block text-sm font-semibold text-slate-700">
                        Fields
                        <span class="text-slate-500 font-normal">({{ formData.fields.length }})</span>
                    </label>
                    <button @click="addField"
                        class="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <IconPlus :size="16" />
                        Add Field
                    </button>
                </div>

                <!-- Fields List (Accordion) -->
                <div class="space-y-2">
                    <div v-for="(field, index) in formData.fields" :key="field.id"
                        class="border border-slate-200 rounded-lg bg-white overflow-hidden">
                        <!-- Field Header (Collapsible) -->
                        <button @click="toggleField(field.id)" type="button"
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
                                <button @click.stop="removeField(index)"
                                    class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    <IconTrash :size="16" />
                                </button>
                            </div>

                            <!-- Expand/Collapse Icon -->
                            <IconChevronDown :size="20" class="text-slate-400 transition-transform duration-200 ml-2"
                                :class="{ 'rotate-180': expandedFields.has(field.id) }" />
                        </button>

                        <!-- Field Content (Expandable) -->
                        <Transition name="accordion">
                            <div v-if="expandedFields.has(field.id)" class="px-4 pb-4 space-y-3 bg-slate-50">
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

                    <!-- Empty State -->
                    <div v-if="formData.fields.length === 0"
                        class="text-center py-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                        <IconDatabase :size="48" class="mx-auto mb-2 opacity-50" />
                        <p class="text-sm">No fields added yet</p>
                        <p class="text-xs mt-1">Click "Add Field" to create your first field</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Slot -->
        <template #footer>
            <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
                <button @click="handleCancel"
                    class="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium">
                    Cancel
                </button>
                <button @click="handleSave"
                    class="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                    <IconDeviceFloppy :size="18" />
                    {{ isEditing ? 'Save Changes' : 'Create Collection' }}
                </button>
            </div>
        </template>
    </Modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
    IconX, IconPlus, IconTrash, IconGripVertical, IconDatabase,
    IconDatabaseOff, IconCopy, IconDeviceFloppy, IconChevronDown
} from '@tabler/icons-vue'
import Modal from '../Widget/Modal.vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    collection: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['close', 'save', 'truncate', 'duplicate', 'delete'])

const isEditing = ref(false)
const formData = ref({
    name: '',
    fields: []
})
const expandedFields = ref(new Set())

let fieldIdCounter = 0

// Watch for collection prop changes
watch(() => props.collection, (newCollection) => {
    if (newCollection) {
        isEditing.value = true
        formData.value = {
            name: newCollection.name || '',
            fields: newCollection.fields ? [...newCollection.fields] : []
        }
        // Expand all fields by default when editing
        expandedFields.value = new Set(formData.value.fields.map(f => f.id))
    } else {
        isEditing.value = false
        resetForm()
    }
}, { immediate: true })

function resetForm() {
    formData.value = {
        name: '',
        fields: []
    }
    expandedFields.value = new Set()
    fieldIdCounter = 0
}

function addField() {
    const newField = {
        id: `field-${++fieldIdCounter}`,
        name: '',
        type: 'text',
        required: false,
        unique: false,
        searchable: false,
        defaultValue: '',
        relationCollection: '',
        relationType: 'one-to-many'
    }
    formData.value.fields.push(newField)
    // Auto-expand newly added field
    expandedFields.value.add(newField.id)
}

function removeField(index) {
    const field = formData.value.fields[index]
    expandedFields.value.delete(field.id)
    formData.value.fields.splice(index, 1)
}

function toggleField(fieldId) {
    if (expandedFields.value.has(fieldId)) {
        expandedFields.value.delete(fieldId)
    } else {
        expandedFields.value.add(fieldId)
    }
}

function handleSave() {
    // Validate
    if (!formData.value.name.trim()) {
        alert('Please enter a collection name')
        return
    }

    emit('save', { ...formData.value })
    handleCancel()
}

function handleCancel() {
    emit('close')
    resetForm()
}

function handleTruncate() {
    if (confirm('Are you sure you want to delete all entries in this collection? This action cannot be undone.')) {
        emit('truncate', formData.value)
        handleCancel()
    }
}

function handleDuplicate() {
    const duplicateName = prompt('Enter name for the duplicated collection:', `${formData.value.name} (Copy)`)
    if (duplicateName) {
        emit('duplicate', { ...formData.value, name: duplicateName })
        handleCancel()
    }
}

function handleDelete() {
    if (confirm(`Are you sure you want to permanently delete the "${formData.value.name}" collection? This action cannot be undone.`)) {
        emit('delete', formData.value)
        handleCancel()
    }
}
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
