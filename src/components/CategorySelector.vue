<template>
  <div class="bg-base-100/30 backdrop-blur-lg rounded-3xl p-10 shadow-2xl">
    <h2 class="text-3xl font-bold text-neutral-100 mb-8">Select Category</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="$emit('select', cat)"
        :disabled="loading"
        class="group relative overflow-hidden rounded-2xl p-8 bg-base-100/50 transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50"
        :class="categoryStyles[cat.id]?.hoverBg"
      >
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          :class="categoryStyles[cat.id]?.gradient"
        ></div>
        <div class="relative z-10 text-center">
          <div class="text-6xl mb-4">{{ cat.icon }}</div>
          <h3 class="text-xl font-bold text-neutral-100">{{ cat.name }}</h3>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types/types'

defineProps<{ categories: Category[]; loading: boolean }>()
defineEmits(['select'])

const categoryStyles: Record<number, { gradient: string; hoverBg: string }> = {
  9: { gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500', hoverBg: 'hover:bg-blue-500/20' },
  17: { gradient: 'bg-gradient-to-br from-purple-500 to-pink-500', hoverBg: 'hover:bg-purple-500/20' },
  22: { gradient: 'bg-gradient-to-br from-green-500 to-teal-500', hoverBg: 'hover:bg-green-500/20' },
  11: { gradient: 'bg-gradient-to-br from-red-500 to-orange-500', hoverBg: 'hover:bg-red-500/20' },
  21: { gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500', hoverBg: 'hover:bg-yellow-500/20' },
  18: { gradient: 'bg-gradient-to-br from-indigo-500 to-blue-500', hoverBg: 'hover:bg-indigo-500/20' },
}
</script>
