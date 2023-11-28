import { ref, push, get, set, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createQuiz = (title, handle, numQuestions, totalPoints, selectedOption, timeLimit, category) => {

  const startTime = Date.now();
  const endTime = startTime + timeLimit;
  const participants = [];
  const quizData = {
    title: title,
    author: handle,
    numQuestions,
    totalPoints,
    selectedOption,
    timeLimit: endTime,
    category,
    participants: participants,
    createdOn: Date.now(),
  };

  const newQuizRef = push(ref(db, 'quizzes'), quizData);

  return getQuizById(newQuizRef.key);
};

export const getQuizById = (id) => {
  const quizRef = ref(db, `quizzes/${id}`);

  return get(quizRef).then((result) => {
    if (!result.exists()) {
      throw new Error(`Quiz with id ${id} does not exist!`);
    }

    const quiz = result.val();
    quiz.id = id;
    quiz.createdOn = new Date();
    if (!quiz.questions) quiz.questions = [];

    return quiz;
  });
};

export const createQuestion = (questionData, quizId, category) => {
  const questionsRef = ref(db, `questions/${category}/`);

  const newQuestionRef = push(ref(db, `quizzes/${quizId}/questions`), questionData);

  return push(questionsRef).then((categorySnapshot) => {
    const newQuestionId = categorySnapshot.key;

    const updates = {};
    updates[`questions/${category}/${newQuestionId}`] = questionData;

    return update(ref(db), updates)
      .then(() => getQuestionById(quizId, newQuestionRef.key));
  });
};


export const getAllQuestionsByCategory = (category) => {
  const questionsRef = ref(db, `questions/${category}/`);

  return get(questionsRef).then((result) => {
    if (!result.exists()) {
      throw new Error(`There is no questions for this category `);
    }

    const question = result.val();

    return question;
  });
}


export const getQuestionById = (quizId, questionId) => {
  const questionRef = ref(db, `quizzes/${quizId}/questions/${questionId}`);

  return get(questionRef).then((result) => {
    if (!result.exists()) {
      throw new Error(`Question with id ${questionId} does not exist for quiz ${quizId}!`);
    }

    const question = result.val();
    question.id = questionId;

    return question;
  });
};

const fromPostsDocument = snapshot => {
  const quizzesDocument = snapshot.val();

  return Object.keys(quizzesDocument).map(key => {
    const quiz = quizzesDocument[key];

    return {
      ...quiz,
      id: key,
      createdOn: new Date(quiz.createdOn),
      questions: quiz.questions ? Object.entries(quiz.questions) : [],
    };
  });
}

export const getAllQuizzes = () => {
  return get(ref(db, 'quizzes'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return [];
      }
      return fromPostsDocument(snapshot);
    });
};

export const addParticipant = (quizId, handle) => {
  return getQuizById(quizId).then((quiz) => {
    if (!quiz.participants) {
      quiz.participants = [];
    }

    const participantExists = quiz.participants.some((participant) => participant === handle);

    if (!participantExists) {
      quiz.participants.push(handle);
      const quizRef = ref(db, `quizzes/${quizId}`);
      return set(quizRef, quiz).then(() => {
        return quiz;
      });
    } else {
      return quiz;
    }
  });
};



// Save quiz state with user-specific path
const saveQuizState = (userId, quizId, quizState) => {
  const storageRef = storage.ref(`quizzes/${userId}/${quizId}/state.json`);
  const stateString = JSON.stringify(quizState);

  return storageRef.putString(stateString).then(() => {
    console.log('Quiz state saved successfully!');
  });
};

// Retrieve quiz state with user-specific path
const getQuizState = (userId, quizId) => {
  const storageRef = storage.ref(`quizzes/${userId}/${quizId}/state.json`);

  return storageRef
    .getString()
    .then((result) => {
      const stateString = result.data;
      return JSON.parse(stateString);
    })
    .catch((error) => {
      console.error('Error getting quiz state:', error);
    });
};


