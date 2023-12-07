import { ref, push, get } from 'firebase/database'
import { db } from '../config/firebase-config'

export const createCategory = (category) => {
  return push(
    ref(db, 'categories'),
    {
      category
    }
  )
    .then(result => {
      return getCategoryById(result.key)
    })
}

export const getCategoryById = (id) => {
  const categoryRef = ref(db, `categories/${id}`)

  return get(categoryRef).then((result) => {
    if (!result.exists()) {
      throw new Error(`category with ${id} does not exist!`)
    }

    const category = result.val()
    category.id = id
    return category
  })
}

const fromCategoriesDocument = snapshot => {
  const categoriesDocument = snapshot.val()

  return Object.keys(categoriesDocument).map(key => {
    const category = categoriesDocument[key]

    return {
      ...category
    }
  })
}

export const getAllCategories = () => {
  return get(ref(db, 'categories'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return []
      }

      return fromCategoriesDocument(snapshot)
    })
}
