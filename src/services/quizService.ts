import { decodeHTML, shuffleArray } from '@/utils/utils'
import type { Category, Question, OpenTDBResponse } from '@/types/types'

export const fetchQuestions = async (category: Category): Promise<Question[]> => {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${category.apiId}&type=multiple`,
    )
    if (!res.ok) throw new Error('Network error')
    const data: OpenTDBResponse = await res.json()
    if (data.response_code !== 0) throw new Error('No questions available for this category.')

    return data.results.map((item) => {
      const allAnswers = [item.correct_answer, ...item.incorrect_answers]
      const shuffled = shuffleArray(allAnswers)
      const correctIndex = shuffled.indexOf(item.correct_answer)

      return {
        q: decodeHTML(item.question),
        a: shuffled.map((a) => decodeHTML(a)),
        correct: correctIndex,
      }
    })
  } catch (error) {
    console.error('Failed to fetch questions:', error)
    throw error // Re-throw the error to be handled by the caller
  }
}
