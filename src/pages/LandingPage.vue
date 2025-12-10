<template>
  <div
    class="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-base-100"
  >
    <div class="absolute inset-0 bg-linear-to-br from-primary/30 to-secondary/30 opacity-50"></div>
    <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

    <div class="relative max-w-4xl w-full text-center z-10">
      <div class="mb-12">
        <div class="inline-block bg-base-100/30 backdrop-blur-lg p-8 rounded-3xl shadow-2xl mb-8">
          <Brain class="w-24 h-24 text-accent" :stroke-width="1.5" />
        </div>
        <h1 class="text-6xl font-black text-neutral-100 mb-4">Trivia Master</h1>
        <p class="text-lg text-neutral-300">10 questions • 15 seconds each • Real-time scoring</p>
      </div>
      <CategorySelector :categories="categories" :loading="loading" @select="startQuiz" />
      <p class="mt-8 text-neutral-400 text-sm">Powered by Open Trivia Database</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategorySelector from '../components/CategorySelector.vue'
import { Brain } from 'lucide-vue-next'
import { useQuizStore } from '@/store/quizStore'
import type { Category } from '@/types/types'
import { useRouter } from 'vue-router'

const quiz = useQuizStore()
const router = useRouter()

const categories = quiz.categories
const loading = quiz.loading

function startQuiz(category: Category) {
  quiz.startQuiz(category).then(() => {
    router.push('/quiz')
  })
}
</script>
