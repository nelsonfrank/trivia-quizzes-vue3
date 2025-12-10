import { defineStore } from 'pinia'
import { ref, computed, onUnmounted } from 'vue'

import { decodeHTML, shuffleArray } from '@/utils/utils'
import type { Category, Question, OpenTDBResponse } from '@/types/types'

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
  let timerInterval: number | null = null

  const categories = ref<Category[]>([
    {
      id: 9,
      name: 'General Knowledge',
      icon: '🎯',
      apiId: 9,
    },
    {
      id: 17,
      name: 'Science & Nature',
      icon: '🔬',
      apiId: 17,
    },
    { id: 22, name: 'Geography', icon: '🌍', apiId: 22 },
    { id: 11, name: 'Movies', icon: '🎬', apiId: 11 },
    { id: 21, name: 'Sports', icon: '🏆', apiId: 21 },
    { id: 18, name: 'Computers', icon: '💻', apiId: 18 },
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
    screen.value = 'quiz'
    resetQuizState()

    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category.apiId}&type=multiple`,
      )
      if (!res.ok) throw new Error('Network error')
      const data: OpenTDBResponse = await res.json()
      if (data.response_code !== 0) throw new Error('No questions')

      questions.value = data.results.map((item) => {
        const allAnswers = [item.correct_answer, ...item.incorrect_answers]
        const shuffled = shuffleArray(allAnswers)
        const correctIndex = shuffled.indexOf(item.correct_answer)

        return {
          q: decodeHTML(item.question),
          a: shuffled.map((a) => decodeHTML(a)),
          correct: correctIndex,
        }
      })

      startTimer()
    } catch (error) {
      console.error('Failed to fetch questions:', error)
      // Here you could implement a fallback to local questions
      screen.value = 'landing'
    } finally {
      loading.value = false
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
    categories,
    currentQ,
    progress,
    percentage,
    resultMessage,
    startQuiz,
    handleAnswer,
    nextQuestion,
    resetQuiz,
  }
})
