import { ref, push, get, query, equalTo, orderByChild, update, remove, set } from 'firebase/database'
import { db } from '../config/firebase-config'

export const createQuiz = (title, handle, numQuestions, totalPoints, selectedOption, timeLimit, timer, category) => {
  const startTime = Date.now()
  const endTime = startTime + timeLimit * 3600000
  const participants = []

  const quizData = {
    title,
    author: handle,
    numQuestions,
    totalPoints,
    selectedOption,
    timeLimit: endTime,
    category,
    participants,
    state: 'ongoing',
    timer,
    createdOn: startTime,
    endTime
  }

  const newQuizRef = push(ref(db, 'quizzes'), quizData)

  const quizId = newQuizRef.key
  quizData.id = quizId
  update(newQuizRef, { id: quizId })

  return getQuizById(`${newQuizRef.key}`)
}

export const changeState = (quizId) => {
  const quizRef = ref(db, `quizzes/${quizId}`)
  update(quizRef, { state: 'too late' })
  return quizRef
}

export const getQuizById = (id) => {
  const quizRef = ref(db, `quizzes/${id}`)

  return get(quizRef).then((result) => {
    if (!result.exists()) {
      throw new Error(`Quiz with id ${id} does not exist!`)
    }
    const quiz = result.val()
    return quiz
  })
}

export const createQuestion = (questionData, quizId, category) => {
  const questionsRef = ref(db, `questions/${category}/`)

  const newQuestionRef = push(ref(db, `quizzes/${quizId}/questions`), questionData)

  return push(questionsRef).then((categorySnapshot) => {
    const newQuestionId = categorySnapshot.key

    const updates = {}

    updates[`questions/${category}/${newQuestionId}`] = questionData

    return update(ref(db), updates)
      .then(() => getQuestionById(quizId, newQuestionRef.key))
  })
}

export const getAllQuestionsByCategory = (category) => {
  const questionsRef = ref(db, `questions/${category}/`)

  return get(questionsRef).then((result) => {
    if (!result.exists()) {
      throw new Error('There is no questions for this category ')
    }

    const question = result.val()

    return question
  })
}

export const getQuestionsByQuizId = (quizId) => {
  const questionsRef = ref(db, `quizzes/${quizId}/questions`)

  return get(questionsRef).then((result) => {
    if (!result.exists()) {
      throw new Error(`No questions found for quiz ${quizId}!`)
    }

    const questions = result.val()

    const questionArray = Object.values(questions).map((questionData) => {
      const question = [
        questionData.correctAnswer,
        questionData.question,
        questionData.options
      ]
      return question
    })

    return questionArray
  })
}
const fromPostsDocument = snapshot => {
  const quizzesDocument = snapshot.val()

  return Object.keys(quizzesDocument).map(key => {
    const quiz = quizzesDocument[key]

    return {
      ...quiz,
      id: key,
      createdOn: new Date(quiz.createdOn),
      questions: quiz.questions ? Object.entries(quiz.questions) : []
    }
  })
}

export const getAllQuizzes = () => {
  return get(ref(db, 'quizzes'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return []
      }
      return fromPostsDocument(snapshot)
    })
}
export const getEducatorsQuizzes = (handle) => {
  return get(query(ref(db, 'quizzes'), orderByChild('author'), equalTo(handle)))

    .then((userDataSnapshot) => {
      if (!userDataSnapshot.exists()) {
        return []
      }

      const usersDocument = userDataSnapshot.val()
      const quizResults = Object.keys(usersDocument).map((key) => {
        const group = usersDocument[key]

        return group
      })

      return quizResults
    })
}

export const addParticipant = (quizId, handle) => {
  return getQuizById(quizId).then((quiz) => {
    if (!quiz.participants) {
      quiz.participants = []
    }

    const participantExists = quiz.participants.some((participant) => participant === handle)

    if (!participantExists) {
      quiz.participants.push(handle)
      const quizRef = ref(db, `quizzes/${quizId}`)
      return set(quizRef, quiz).then(() => {
        return quiz
      })
    } else {
      return quiz
    }
  })
}
export const getQuestionById = (quizId, questionId) => {
  const questionRef = ref(db, `quizzes/${quizId}/questions/${questionId}`)

  return get(questionRef).then((result) => {
    if (!result.exists()) {
      throw new Error(`Question with id ${questionId} does not exist for quiz ${quizId}!`)
    }

    const question = result.val()
    question.id = questionId

    return question
  })
}

export const setScoreBoards = (handle, quizId, quizTitle, score) => {
  const userRef = ref(db, `/users/${handle}/scoreBoards/`)
  const quizRef = ref(db, `/quizzes/${quizId}/scoreBoards/`)
  const newQuizScoreKey1 = push(userRef).key
  const newQuizScoreKey2 = push(quizRef).key

  const newScore1 = {
    quizTitle,
    score,
    timestamp: formatTimestamp()
  }
  const newScore2 = {
    user: handle,
    score,
    timestamp: formatTimestamp()
  }

  const userPath = `/users/${handle}/scoreBoards/${newQuizScoreKey1}`
  const quizPath = `/quizzes/${quizId}/scoreBoards/${newQuizScoreKey2}`

  const updates = {}
  updates[userPath] = newScore1
  updates[quizPath] = newScore2

  update(ref(db), updates)
    .then(() => {
      console.log(`Score for quiz ${quizTitle} set successfully for user ${handle}`)
    })
    .catch((error) => {
      console.error('Error adding score:', error)
    })
}

const formatTimestamp = () => {
  const now = new Date()
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
  return now.toLocaleString(undefined, options)
}
export const removePost = (quizId) => {
  const removePost = remove(ref(db, `quizzes/${quizId}`))

  Promise.all([removePost])
    .then((res) => { })
    .catch((err) => console.error('Error deleting post:', err))
}

export const getQuizScoreBoard = (quizId) => {
  const quizRef = ref(db, `/quizzes/${quizId}/scoreBoards/`)

  return get(quizRef)
    .then((quizSnapshot) => {
      if (!quizSnapshot.exists()) {
        return []
      }

      const quizDocument = quizSnapshot.val()
      const scoreBoards = Object.keys(quizDocument).map((key) => {
        const scoreBoard = quizDocument[key]
        return scoreBoard
      })

      return scoreBoards
    })
    .catch((error) => {
      console.error('Error getting quiz state:', error)
      throw error
    })
}
