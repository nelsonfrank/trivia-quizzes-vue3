<template>
  <div
    class="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6"
  >
    <div v-if="quiz.loading" class="text-center">
      <div class="bg-white/10 backdrop-blur p-12 rounded-3xl">
        <div
          class="animate-spin h-16 w-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
        ></div>
        <p class="text-white text-xl">Loading questions...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="quiz.error" class="text-center">
      <div class="bg-red-500/20 backdrop-blur p-12 rounded-3xl border border-red-500/50">
        <p class="text-white text-2xl font-bold mb-4">Failed to Load Questions</p>
        <p class="text-red-200 mb-8">{{ quiz.error }}</p>
        <button
          @click="quiz.retryQuestions"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition-all flex items-center gap-2 mx-auto"
        >
          <RefreshCw class="w-5 h-5" />
          Reload
        </button>
      </div>
    </div>

    <!-- Quiz Content -->
    <div v-else-if="quiz.questions.length > 0" class="w-full max-w-4xl">
      <div class="flex justify-between items-center mb-6">
        <button @click="goHome" class="flex items-center gap-2 text-white/70 hover:text-white">
          <Home class="w-5 h-5" /> Home
        </button>
        <div class="flex gap-4">
          <div class="bg-white/10 backdrop-blur px-5 py-3 rounded-full flex items-center gap-3">
            <Trophy class="w-5 h-5 text-yellow-400" />
            <span class="text-white font-bold">{{ quiz.score }} / {{ quiz.questions.length }}</span>
          </div>
          <div
            :class="[
              'px-5 py-3 rounded-full flex items-center gap-3 backdrop-blur',
              quiz.timer <= 5 ? 'bg-red-500/30 animate-pulse' : 'bg-white/10',
            ]"
          >
            <Clock class="w-5 h-5 text-white" />
            <span class="text-white font-bold">{{ quiz.timer }}s</span>
          </div>
        </div>
      </div>
      <QuizQuestion
        :question="quiz.currentQ"
        :answered="quiz.answered"
        :selectedAnswer="quiz.selectedAnswer"
        @answer="quiz.handleAnswer"
        @next="next"
      >
        <template #icon="{ i }">
          <CheckCircle
            v-if="quiz.answered && i === quiz.currentQ.correct"
            class="w-7 h-7 text-green-400"
          />
          <XCircle
            v-if="quiz.answered && quiz.selectedAnswer === i && i !== quiz.currentQ.correct"
            class="w-7 h-7 text-red-400"
          />
        </template>
        <template #next-label>
          {{ quiz.currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'View Results' }}
          <ArrowRight class="w-6 h-6" />
        </template>
      </QuizQuestion>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuizQuestion from '../components/QuizQuestion.vue'
import { Home, Trophy, Clock, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-vue-next'
import { useQuizStore } from '../store/quizStore'
import { useRouter } from 'vue-router'

const quiz = useQuizStore()
const router = useRouter()

function goHome() {
  quiz.resetQuiz()
  router.push('/')
}
function next() {
  if (quiz.currentQuestion < quiz.questions.length - 1) {
    quiz.nextQuestion()
  } else {
    router.push('/results')
  }
}
</script>
