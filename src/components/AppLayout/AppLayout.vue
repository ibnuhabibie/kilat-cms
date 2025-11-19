<template>
    <div class="flex h-screen bg-gray-50 text-gray-900">
        <div class="h-full flex flex-col bg-slate-50 border-r border-slate-200 w-64">
            <div class="h-14 flex items-center px-6 border-b border-slate-200 bg-white">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                        <span class="text-white font-bold text-lg">K</span>
                    </div>
                    <h2 class="text-xl font-bold text-slate-800 tracking-tight">Kilat CMS</h2>
                </div>
            </div>
            <div class="flex-1">
                <Sidebar />
            </div>
        </div>

        <!-- Main content -->
        <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header class="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white">
                <WorkspaceDropdown />
                <ProfileDropdown />
            </header>
            <CollectionTable />
        </main>
    </div>
</template>

<script setup>
import Sidebar from '../Sidebar/Sidebar.vue';
import ProfileDropdown from '../Widget/ProfileDropdown.vue';
import WorkspaceDropdown from '../Widget/WorkspaceDropdown.vue';
import CollectionTable from '../CollectionTable/CollectionTable.vue';
</script>
