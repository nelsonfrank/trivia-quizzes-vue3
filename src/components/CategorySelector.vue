<template>
  <div class="max-w-4xl mx-auto">
    <h2
      class="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8"
    >
      Select a Category
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="$emit('select', cat)"
        :disabled="loading"
        class="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 text-left"
      >
        <!-- Gradient overlay on hover -->
        <div
          class="absolute inset-0 rounded-2xl bg-linear-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          :class="cat.color"
        />

        <div class="relative z-10">
          <div
            class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br mb-4 shadow-lg"
            :class="cat.color"
          >
            <component :is="cat.icon" class="w-6 h-6 text-foreground" />
          </div>

          <h3 class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {{ cat.name }}
          </h3>
          <p class="text-sm text-muted-foreground">{{ cat.description }}</p>
        </div>

        <!-- Arrow indicator -->
        <div
          class="absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
        >
          <svg
            class="w-4 h-4 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types/types'

defineProps<{ categories: Category[]; loading: boolean }>()
defineEmits(['select'])
</script>
