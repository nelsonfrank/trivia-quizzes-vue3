import type { FunctionalComponent } from 'vue'

export interface Category {
  id: number
  name: string
  icon: FunctionalComponent
  apiId: number
  color: string
  lightColor: string
  description: string
}

export interface Question {
  q: string
  a: string[]
  correct: number
}

export interface OpenTDBResponse {
  response_code: number
  results: {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }[]
}
