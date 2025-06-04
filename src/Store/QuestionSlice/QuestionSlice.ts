// @ts-ignore
// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Questions: null,
  QuestionId: null,
}
const QuestionSlice = createSlice({
  name: 'Question',
  initialState,
  reducers: {
    GetQuestions: (state, action) => {
      state.Questions = action.payload
    },
    AddQuestion: (state, action) => {
      if (!state.Questions) {
        state.Questions = [action.payload]
      } else {
        state.Questions = [action.payload, ...state.Questions]
      }
    },
    EditingQuestionId: (state, action) => {
      state.QuestionId = action.payload
    },
    RemoveQuestionId: (state) => {
      state.QuestionId = null
    },
  },
})
export const {
  EditingQuestionId,
  RemoveQuestionId,
  GetQuestions,
  AddQuestion,
} = QuestionSlice.actions
export default QuestionSlice.reducer
