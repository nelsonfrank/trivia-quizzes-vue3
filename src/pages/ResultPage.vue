<template>
  <div
    class="min-h-screen bg-linear-to-br from-purple-700 via-pink-600 to-red-600 flex items-center justify-center p-6"
  >
    <div class="max-w-2xl w-full text-center">
      <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-16 shadow-2xl">
        <div class="text-9xl mb-6">{{ quiz.resultMessage.emoji }}</div>
        <h1 class="text-5xl font-bold text-white mb-6">{{ quiz.resultMessage.msg }}</h1>
        <div class="bg-white/20 rounded-2xl p-10 mb-10">
          <div class="text-8xl font-bold text-white">
            {{ quiz.score }} / {{ quiz.questions.length }}
          </div>
          <div class="text-3xl text-white/90 mt-4">{{ quiz.percentage }}% Correct</div>
        </div>
        <div class="space-y-4">
          <button
            @click="playAgain"
            class="w-full bg-white text-purple-700 font-bold py-5 rounded-2xl hover:bg-white/90 transition flex items-center justify-center gap-3 text-xl"
          >
            <RefreshCw class="w-6 h-6" /> Play Again
          </button>
          <button
            @click="goHome"
            class="w-full bg-white/20 text-white font-bold py-5 rounded-2xl hover:bg-white/30 transition flex items-center justify-center gap-3 text-xl"
          >
            <Home class="w-6 h-6" /> Change Category
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, RefreshCw } from 'lucide-vue-next'
import { useQuizStore } from '@/store/quizStore'
import { useRouter } from 'vue-router'

const quiz = useQuizStore()
const router = useRouter()

function playAgain() {
  if (quiz.selectedCategory) {
    quiz.startQuiz(quiz.selectedCategory).then(() => {
      router.push('/quiz')
    })
  }
}
function goHome() {
  quiz.resetQuiz()
  router.push('/')
}
</script>
