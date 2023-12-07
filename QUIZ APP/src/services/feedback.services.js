import { ref, push, get, update } from 'firebase/database'
import { db } from '../config/firebase-config'

export const addFeedback = (content, handle) => {
  const feedbackRef = ref(db, 'feedback')
  const newFeedbackKey = push(feedbackRef).key

  const newFeedback = {
    content,
    timestamp: Date.now(),
    user: handle
  }

  const feedbackPath = `/feedback/${newFeedbackKey}`

  const updates = {}
  updates[feedbackPath] = newFeedback

  return update(ref(db), updates)
    .then(() => {})
    .catch((error) => {
      console.error('Error adding comment:', error)
    })
}

export const getAllFeedback = () => {
  return get(ref(db, 'feedback'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return []
      }
      return fromFeedbackDocument(snapshot)
    })
}

const fromFeedbackDocument = snapshot => {
  const feedbackDocument = snapshot.val()

  return Object.keys(feedbackDocument).map(key => {
    const feedback = feedbackDocument[key]

    return {
      ...feedback,
      createdOn: new Date()
    }
  })
}
export const feedbackFormatDate = (timestamp) => {
  const dateObj = new Date(timestamp)

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true // Use 12-hour format
  }

  const formattedDate = dateObj.toLocaleString(undefined, options)

  return formattedDate
}
