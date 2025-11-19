<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
                <!-- Backdrop -->
                <div @click="handleBackdropClick" class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                <!-- Modal Content -->
                <Transition name="slide">
                    <div v-if="isOpen" :class="modalClasses">
                        <!-- Header Slot (Optional) -->
                        <div v-if="$slots.header" class="flex-shrink-0">
                            <slot name="header" :close="handleClose" />
                        </div>

                        <!-- Default Slot (Main Content) -->
                        <div class="flex-1 overflow-y-auto">
                            <slot :close="handleClose" />
                        </div>

                        <!-- Footer Slot (Optional) -->
                        <div v-if="$slots.footer" class="flex-shrink-0">
                            <slot name="footer" :close="handleClose" />
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    position: {
        type: String,
        default: 'right', // 'right', 'left', 'center'
        validator: (value) => ['right', 'left', 'center'].includes(value)
    },
    maxWidth: {
        type: String,
        default: '2xl' // 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'
    },
    closeOnBackdrop: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['close'])

const modalClasses = computed(() => {
    const baseClasses = 'absolute bg-white shadow-2xl flex flex-col'

    const positionClasses = {
        right: 'right-0 top-0 h-full',
        left: 'left-0 top-0 h-full',
        center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl max-h-[90vh]'
    }

    const widthClasses = {
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-md',
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-xl',
        '2xl': 'w-full max-w-2xl',
        '3xl': 'w-full max-w-3xl',
        '4xl': 'w-full max-w-4xl',
        full: 'w-full'
    }

    return `${baseClasses} ${positionClasses[props.position]} ${widthClasses[props.maxWidth]}`
})

function handleBackdropClick() {
    if (props.closeOnBackdrop) {
        handleClose()
    }
}

function handleClose() {
    emit('close')
}
</script>

<style scoped>
/* Fade transition for backdrop */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Slide transition for modal content */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Right position slide */
.slide-enter-active .right-0,
.slide-leave-active .right-0 {
    transition: transform 0.3s ease;
}

.slide-enter-from .right-0 {
    transform: translateX(100%);
}

.slide-leave-to .right-0 {
    transform: translateX(100%);
}

/* Left position slide */
.slide-enter-from .left-0 {
    transform: translateX(-100%);
}

.slide-leave-to .left-0 {
    transform: translateX(-100%);
}

/* Center position scale */
.slide-enter-from {
    opacity: 0;
}

.slide-leave-to {
    opacity: 0;
}
</style>
