import { ADD_SINGLE_NODE } from "../actions"

export default (state = {}, action: any) => {
  console.log(state)
  switch(action.type) {
    case ADD_SINGLE_NODE: {
      return state
    }
  }
  return state
}