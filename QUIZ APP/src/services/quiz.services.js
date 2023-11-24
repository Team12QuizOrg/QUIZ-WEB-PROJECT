import { ref, push, get, query, equalTo, orderByChild, update, remove} from 'firebase/database';
import { db } from '../config/firebase-config';

export const createQuiz = (title, handle, numQuestions, totalPoints, selectedOption, timeLimit, category) => {

const startTime = Date.now();
const endTime = startTime + timeLimit;

    const quizData = {
      title: title,
      author: handle,
      numQuestions,
      totalPoints,
      selectedOption,
      timeLimit: endTime,
      category,
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
  
      if (!quiz.questions) quiz.questions = [];
  
      return quiz;
    });
  };
  
  export const createQuestion = (questionData, quizId) => {
    const newQuestionRef = push(ref(db, `quizzes/${quizId}/questions`), questionData);
  
    return getQuestionById(quizId, newQuestionRef.key);
  };
  
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