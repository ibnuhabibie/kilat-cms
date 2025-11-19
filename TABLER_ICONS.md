# Tabler Icons Integration

## Overview

Successfully integrated `@tabler/icons-vue` package to replace all SVG icons throughout the Kilat CMS application with clean, consistent Tabler Icons.

## Installation

```bash
npm install @tabler/icons-vue
```

## Icons Replaced

### 1. **Sidebar Component** (`src/components/Sidebar/Sidebar.vue`)
- ✅ `IconSearch` - Search input icon
- ✅ `IconChevronRight` - Active collection indicator
- ✅ `IconPlus` - New Collection button

### 2. **WorkspaceDropdown Component** (`src/components/Widget/WorkspaceDropdown.vue`)
- ✅ `IconChevronDown` - Dropdown toggle icon
- ✅ `IconPlus` - New Workspace button

### 3. **ProfileDropdown Component** (`src/components/Widget/ProfileDropdown.vue`)
- ✅ `IconChevronDown` - Dropdown toggle icon
- ✅ `IconUser` - Profile Settings menu item
- ✅ `IconSettings` - Account Settings menu item
- ✅ `IconHelp` - Help & Support menu item
- ✅ `IconLogout` - Logout button

### 4. **CollectionHeader Component** (`src/components/CollectionTable/CollectionHeader.vue`)
- ✅ `IconSearch` - Search input icon
- ✅ `IconPlus` - New Record button

### 5. **CollectionTable Component** (`src/components/CollectionTable/CollectionTable.vue`)
- ✅ `IconEdit` - Edit action button
- ✅ `IconTrash` - Delete action button

## Benefits

1. **Consistency** - All icons now use the same design system
2. **Maintainability** - Easier to update and manage icons
3. **Performance** - Optimized icon components
4. **Accessibility** - Better screen reader support
5. **Size Control** - Easy to adjust icon sizes with `:size` prop
6. **Tree Shaking** - Only imports icons that are actually used

## Usage Example

```vue
<template>
  <IconSearch :size="16" class="text-slate-400" />
</template>

<script setup>
import { IconSearch } from '@tabler/icons-vue'
</script>
```

## Icon Sizes Used

- **16px** - Standard size for most UI elements (buttons, inputs, menu items)
- Consistent sizing across all components for visual harmony

## Remaining SVG Icons

The following components still use SVG icons and may need updating in future:

- `LoginPage.vue` - Email, password, eye icons, loading spinner
- `CollectionFooter.vue` - Pagination arrows

These can be updated later if needed.

## Documentation

For more icons and documentation, visit:
- [Tabler Icons Website](https://tabler-icons.io/)
- [Vue Package Documentation](https://github.com/tabler/tabler-icons/tree/master/packages/icons-vue)

## Available Icons

All Tabler Icons are available. Common ones used in CMS applications:

- `IconSearch`, `IconPlus`, `IconEdit`, `IconTrash`
- `IconChevronDown`, `IconChevronRight`, `IconChevronLeft`, `IconChevronUp`
- `IconUser`, `IconSettings`, `IconHelp`, `IconLogout`
- `IconFilter`, `IconSortAscending`, `IconSortDescending`
- `IconEye`, `IconEyeOff`, `IconMail`, `IconLock`
- And 4000+ more...
