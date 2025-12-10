<template>
  <main class="min-h-screen bg-background relative overflow-hidden">
    <!-- Background glow effects -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

    <div class="relative z-10 container mx-auto px-4 py-12 md:py-20">
      <!-- Hero Section -->
      <div class="text-center mb-16 md:mb-24">
        <div
          class="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-linear-to-br from-primary to-accent mb-6 shadow-lg shadow-primary/25"
        >
          <Brain class="w-10 h-10 md:w-12 md:h-12 text-primary-foreground" />
        </div>

        <h1 class="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight text-balance">
          Trivia Master
        </h1>

        <p class="text-lg md:text-xl text-muted-foreground mb-8 max-w-md mx-auto text-pretty">
          Challenge your knowledge across multiple categories and compete for the top score
        </p>

        <!-- Feature pills -->
        <div class="flex flex-wrap justify-center gap-3 md:gap-4">
          <div
            v-for="feature in features"
            :key="feature.label"
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm"
          >
            <component :is="feature.icon" class="w-4 h-4 text-primary" />
            <span class="text-sm font-medium text-foreground">{{ feature.label }}</span>
            <span class="text-xs text-muted-foreground">{{ feature.sublabel }}</span>
          </div>
        </div>
      </div>

      <!-- Category Selection -->
      <CategorySelector :categories="categories" :loading="loading" @select="startQuiz" />

      <!-- Footer -->
      <footer class="mt-20 text-center">
        <p class="text-sm text-muted-foreground">
          Powered by
          <a
            href="https://opentdb.com"
            class="text-primary hover:underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
            >Open Trivia Database</a
          >
        </p>
      </footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import CategorySelector from '../components/CategorySelector.vue'
import { Brain, Zap, Clock, BarChart3 } from 'lucide-vue-next'
import { useQuizStore } from '@/store/quizStore'
import type { Category } from '@/types/types'
import { useRouter } from 'vue-router'

const quiz = useQuizStore()
const router = useRouter()

const categories = quiz.categories
const loading = quiz.loading

const features = [
  { icon: Zap, label: '10 Questions', sublabel: 'Per round' },
  { icon: Clock, label: '15 Seconds', sublabel: 'Per question' },
  { icon: BarChart3, label: 'Real-time', sublabel: 'Scoring' },
]

function startQuiz(category: Category) {
  quiz.startQuiz(category).then(() => {
    router.push('/quiz')
  })
}
</script>
