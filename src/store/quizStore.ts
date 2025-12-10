import { defineStore } from 'pinia'
import { ref, computed, onUnmounted } from 'vue'

import { fetchQuestions } from '@/services/quizService'
import type { Category, Question } from '@/types/types'
import {
  BrainCircuit,
  Microscope,
  Globe,
  Film,
  Trophy,
  Monitor,
} from 'lucide-vue-next'

export type { Category } from '@/types/types'

export const useQuizStore = defineStore('quiz', () => {
  // State
  const screen = ref<'landing' | 'quiz' | 'results'>('landing')
  const selectedCategory = ref<Category | null>(null)
  const questions = ref<Question[]>([])
  const currentQuestion = ref<number>(0)
  const score = ref<number>(0)
  const answered = ref<boolean>(false)
  const selectedAnswer = ref<number | null>(null)
  const timer = ref<number>(15)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  let timerInterval: number | null = null

  const categories = ref<Category[]>([
    {
      id: 9,
      name: 'General Knowledge',
      icon: BrainCircuit,
      apiId: 9,
      color: 'from-rose-500 to-orange-500',
      lightColor: 'bg-rose-500/10',
      description: 'Test your wits',
    },
    {
      id: 17,
      name: 'Science & Nature',
      icon: Microscope,
      apiId: 17,
      color: 'from-cyan-500 to-blue-500',
      lightColor: 'bg-cyan-500/10',
      description: 'Explore discoveries',
    },
    {
      id: 22,
      name: 'Geography',
      icon: Globe,
      apiId: 22,
      color: 'from-emerald-500 to-teal-500',
      lightColor: 'bg-emerald-500/10',
      description: 'Around the world',
    },
    {
      id: 11,
      name: 'Movies',
      icon: Film,
      apiId: 11,
      color: 'from-purple-500 to-pink-500',
      lightColor: 'bg-purple-500/10',
      description: 'Cinema classics',
    },
    {
      id: 21,
      name: 'Sports',
      icon: Trophy,
      apiId: 21,
      color: 'from-amber-500 to-yellow-500',
      lightColor: 'bg-amber-500/10',
      description: 'Game on',
    },
    {
      id: 18,
      name: 'Computers',
      icon: Monitor,
      apiId: 18,
      color: 'from-indigo-500 to-violet-500',
      lightColor: 'bg-indigo-500/10',
      description: 'Tech savvy',
    },
  ])

  // Getters (Computed)
  const currentQ = computed(
    () => questions.value[currentQuestion.value] || { q: '', a: [], correct: 0 },
  )
  const progress = computed(() =>
    questions.value.length ? ((currentQuestion.value + 1) / questions.value.length) * 100 : 0,
  )
  const percentage = computed(() =>
    questions.value.length ? Math.round((score.value / questions.value.length) * 100) : 0,
  )
  const resultMessage = computed(() => {
    const pct = percentage.value
    if (pct === 100) return { msg: "Perfect Score! You're a Trivia Master!", emoji: '🏆' }
    if (pct >= 80) return { msg: 'Outstanding! Genius Level!', emoji: '⭐' }
    if (pct >= 60) return { msg: 'Great Job! Well Done!', emoji: '👍' }
    return { msg: 'Good Effort! Try Again!', emoji: '💪' }
  })

  // Actions
  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval)
    timerInterval = window.setInterval(() => {
      if (timer.value > 0 && !answered.value) {
        timer.value--
      } else if (timer.value === 0 && !answered.value) {
        handleAnswer(null)
      }
    }, 1000)
  }

  const resetQuizState = () => {
    questions.value = []
    currentQuestion.value = 0
    score.value = 0
    answered.value = false
    selectedAnswer.value = null
    timer.value = 15
  }

  const startQuiz = async (category: Category) => {
    selectedCategory.value = category
    loading.value = true
    error.value = null
    screen.value = 'quiz'
    resetQuizState()

    try {
      const fetchedQuestions = await fetchQuestions(category)
      if (fetchedQuestions.length === 0) {
        throw new Error('No questions were returned for this category.')
      }
      questions.value = fetchedQuestions
      startTimer()
    } catch (err) {
      console.error('Failed to start quiz:', err)
      const message = err instanceof Error ? err.message : 'An unknown error occurred.'
      error.value = `Failed to load questions: ${message}`
    } finally {
      loading.value = false
    }
  }

  const retryQuestions = () => {
    if (selectedCategory.value) {
      startQuiz(selectedCategory.value)
    }
  }

  const handleAnswer = (index: number | null) => {
    if (answered.value) return
    answered.value = true
    selectedAnswer.value = index
    if (index === currentQ.value.correct) {
      score.value++
    }
  }

  const nextQuestion = () => {
    if (currentQuestion.value < questions.value.length - 1) {
      currentQuestion.value++
      answered.value = false
      selectedAnswer.value = null
      timer.value = 15
    } else {
      screen.value = 'results'
    }
  }

  const resetQuiz = () => {
    resetQuizState()
    selectedCategory.value = null
    screen.value = 'landing'
    if (timerInterval) clearInterval(timerInterval)
  }

  onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval)
  })

  return {
    screen,
    selectedCategory,
    questions,
    currentQuestion,
    score,
    answered,
    selectedAnswer,
    timer,
    loading,
    error,
    categories,
    currentQ,
    progress,
    percentage,
    resultMessage,
    startQuiz,
    handleAnswer,
    nextQuestion,
    resetQuiz,
    retryQuestions,
  }
})
