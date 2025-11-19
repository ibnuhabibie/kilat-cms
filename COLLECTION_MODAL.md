# Collection Management Modal

## Overview

A comprehensive sidebar modal for creating and managing collections in Kilat CMS. This modal provides a complete interface for configuring collection structures, field types, validations, relations, and collection-level actions.

## Features

### ✨ Collection Configuration
- **Collection Name** - Define the collection identifier
- **Field Management** - Add, edit, remove, and reorder fields
- **Field Types** - Support for 14 different field types
- **Validation Rules** - Required, unique, and searchable options
- **Relations** - Configure relationships between collections
- **Default Values** - Set default values for fields

### 🎯 Field Types Supported

1. **Text** - Single-line text input
2. **Textarea** - Multi-line text input
3. **Number** - Numeric values
4. **Email** - Email addresses with validation
5. **URL** - Web addresses
6. **Date** - Date picker
7. **Date & Time** - DateTime picker
8. **Boolean** - True/false toggle
9. **Select** - Single selection dropdown
10. **Multi-Select** - Multiple selection
11. **Relation** - Link to other collections
12. **Media** - File/image uploads
13. **Rich Text** - WYSIWYG editor
14. **JSON** - Structured data

### 🔗 Relation Configuration

For relation fields, you can configure:
- **Related Collection** - Which collection to link to
- **Relation Type**:
  - One to One
  - One to Many
  - Many to Many

### ✅ Validation Options

Each field can have:
- **Required** - Field must have a value
- **Unique** - Value must be unique across all entries
- **Searchable** - Include in search queries (for text fields)
- **Default Value** - Pre-populated value for new entries

### ⚠️ Danger Zone Actions

For existing collections:
- **Truncate Collection** - Delete all entries (keeps structure)
- **Duplicate Collection** - Create a copy with new name
- **Delete Collection** - Permanently remove collection and all data

## Usage

### Opening the Modal

```vue
<script setup>
import { ref } from 'vue'
import CollectionManageModal from './CollectionManageModal.vue'

const isModalOpen = ref(false)
const selectedCollection = ref(null)

// Open for new collection
function createCollection() {
  selectedCollection.value = null
  isModalOpen.value = true
}

// Open for editing existing collection
function editCollection(collection) {
  selectedCollection.value = collection
  isModalOpen.value = true
}
</script>

<template>
  <CollectionManageModal
    :isOpen="isModalOpen"
    :collection="selectedCollection"
    @close="isModalOpen = false"
    @save="handleSave"
    @truncate="handleTruncate"
    @duplicate="handleDuplicate"
    @delete="handleDelete"
  />
</template>
```

### Event Handlers

```javascript
function handleSave(collectionData) {
  // collectionData contains:
  // {
  //   name: 'Collection Name',
  //   fields: [
  //     {
  //       id: 'field-1',
  //       name: 'title',
  //       type: 'text',
  //       required: true,
  //       unique: false,
  //       searchable: true,
  //       defaultValue: ''
  //     },
  //     // ... more fields
  //   ]
  // }
  
  store.saveCollection(collectionData)
}

function handleTruncate(collectionData) {
  // Delete all entries but keep structure
  store.truncateCollection(collectionData.name)
}

function handleDuplicate(collectionData) {
  // Create a copy with new name
  store.duplicateCollection(collectionData)
}

function handleDelete(collectionData) {
  // Permanently delete collection
  store.deleteCollection(collectionData.name)
}
```

## Field Data Structure

Each field in the collection has the following structure:

```typescript
interface Field {
  id: string                    // Unique identifier
  name: string                  // Field name (e.g., 'title', 'price')
  type: string                  // Field type (see supported types)
  required: boolean             // Is field required?
  unique: boolean               // Must value be unique?
  searchable: boolean           // Include in search?
  defaultValue: string          // Default value
  relationCollection?: string   // For relation fields
  relationType?: string         // For relation fields
}
```

## UI Components Used

- **Tabler Icons** - All icons from `@tabler/icons-vue`
- **Teleport** - Modal rendered at body level
- **Transitions** - Smooth slide-in animation
- **Drag Handle** - Visual indicator for field reordering (future feature)

## Styling

The modal uses:
- **Tailwind CSS** - Utility-first styling
- **Backdrop Blur** - Modern glassmorphism effect
- **Smooth Transitions** - 300ms ease animations
- **Responsive Design** - Max width of 2xl (672px)
- **Color Coding** - Different colors for different actions:
  - Blue - Primary actions (save, create)
  - Orange - Warning actions (truncate)
  - Red - Danger actions (delete)

## Accessibility

- **Keyboard Navigation** - Tab through all inputs
- **Focus States** - Clear visual indicators
- **Semantic HTML** - Proper form elements
- **ARIA Labels** - Screen reader support
- **Confirmation Dialogs** - For destructive actions

## Future Enhancements

- [ ] Drag-and-drop field reordering
- [ ] Field validation preview
- [ ] Import/export collection schema
- [ ] Field templates for common patterns
- [ ] Advanced validation rules (regex, min/max, etc.)
- [ ] Conditional field visibility
- [ ] Field groups/sections
- [ ] Auto-generate API endpoints preview

## Integration with Backend

When integrating with the Kilat API:

```javascript
async function handleSave(collectionData) {
  try {
    const response = await fetch('/api/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collectionData)
    })
    
    if (response.ok) {
      // Refresh collections list
      await store.fetchCollections()
    }
  } catch (error) {
    console.error('Failed to save collection:', error)
  }
}
```

## Example Collection Schema

```javascript
{
  name: 'blog-posts',
  fields: [
    {
      id: 'field-1',
      name: 'title',
      type: 'text',
      required: true,
      unique: false,
      searchable: true,
      defaultValue: ''
    },
    {
      id: 'field-2',
      name: 'content',
      type: 'richtext',
      required: true,
      unique: false,
      searchable: true,
      defaultValue: ''
    },
    {
      id: 'field-3',
      name: 'author',
      type: 'relation',
      required: true,
      unique: false,
      searchable: false,
      relationCollection: 'users',
      relationType: 'one-to-many'
    },
    {
      id: 'field-4',
      name: 'published',
      type: 'boolean',
      required: false,
      unique: false,
      searchable: false,
      defaultValue: 'false'
    }
  ]
}
```

## Notes

- Modal uses `Teleport` to render at body level for proper z-index layering
- All destructive actions require confirmation
- Field IDs are auto-generated with incrementing counter
- Empty state shown when no fields added
- Form validation ensures collection name is provided
