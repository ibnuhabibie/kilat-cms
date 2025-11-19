<template>
    <Modal :isOpen="isOpen" :title="isEditing ? 'Edit Collection' : 'New Collection'"
        subtitle="Configure collection structure and settings" position="right" maxWidth="2xl" @close="handleCancel">

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
                    <CollectionField v-for="(field, index) in formData.fields" :key="field.id" :field="field"
                        :expanded="expandedFields.has(field.id)" @delete="removeField(index)"
                        @toggle="(expanded) => toggleField(field.id, expanded)" />

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
            <div class="flex items-center justify-end gap-3">
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
    IconPlus, IconDatabase,
    IconDatabaseOff, IconCopy, IconDeviceFloppy
} from '@tabler/icons-vue'
import Modal from '../Widget/Modal.vue'
import CollectionField from './CollectionField.vue'

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

function toggleField(fieldId, expanded) {
    if (expanded) {
        expandedFields.value.add(fieldId)
    } else {
        expandedFields.value.delete(fieldId)
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
