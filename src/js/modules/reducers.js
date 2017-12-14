export const initialState = {
  kiki: {
    text: "hi i am kiki.",
    age: 21,
  },
  selectedItem: null,
}

const kiki = (kiki = initialState.kiki, action) => {
  switch (action.type) {
    case "UPDATE_ALL":
      return {
        ...kiki,
        text: action.text + new Date(Date.now()).toString(),
        age: kiki.age + 1,
      }

    case "UPDATE_TEXT":
      return {
        ...kiki,
        text: action.text + new Date(Date.now()).toString()
      }

    case "UPDATE_AGE":
      return {
        ...kiki,
        age: kiki.age + 1,
      }

    default:
      return kiki
  }
}

const selectedItem = (state = initialState.selectedItem, action) => {
  switch (action.type) {
    case "SELECT_ITEM":
      return action.item

    default:
      return state
  }
}

export const reducers = {
  kiki,
  selectedItem,
}

export default reducers
