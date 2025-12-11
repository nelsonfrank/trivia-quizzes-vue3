<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-4 md:p-10 shadow-2xl">
    <div class="mb-6">
      <slot name="progress"></slot>
    </div>
    <h2 class="text-2xl md:text-3xl font-bold text-white mb-10 leading-relaxed">
      {{ question.q }}
    </h2>
    <div class="flex flex-col gap-4">
      <button
        v-for="(answer, i) in question.a"
        :key="i"
        @click="$emit('answer', i)"
        :disabled="answered"
        :class="[
          'w-full p-6 text-left rounded-2xl font-medium text-lg transition-all duration-300 flex justify-between items-center',
          !answered
            ? 'bg-white/10 hover:bg-white/20 text-white hover:scale-[1.02]'
            : i === question.correct
              ? 'bg-green-500/30 border-2 border-green-400 text-white'
              : selectedAnswer === i
                ? 'bg-red-500/30 border-2 border-red-400 text-white'
                : 'bg-white/5 text-white/50',
        ]"
      >
        <span>{{ answer }}</span>
        <slot name="icon" :i="i" />
      </button>
    </div>
    <button
      v-if="answered"
      @click="$emit('next')"
      class="mt-8 w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 text-xl transition hover:scale-105"
    >
      <slot name="next-label"></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '@/types/types'

defineProps<{
  question: Question
  answered: boolean
  selectedAnswer: number | null
}>()
defineEmits(['answer', 'next'])
</script>
