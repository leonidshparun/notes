import { combineReducers } from "redux"
import viewReducer from "./view"

const appReducer = combineReducers({
  view: viewReducer,
})


export default appReducer