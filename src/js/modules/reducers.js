export const windowSize = (state = "sm", action) => {
  if (action.type === "SET_WINDOW_SIZE") {
    return action.size
  }
  return state
}

export const windowWidth = (state = window.innerWidth, action) => {
  if (action.type === "SET_WINDOW_WIDTH") {
    return action.width
  }
  return state
}

export const windowHeight = (state = window.innerHeight, action) => {
  if (action.type === "SET_WINDOW_HEIGHT") {
    return action.height
  }
  return state
}

export const isReverseWebsite = (state = false, action) => {
  if (action.type === "REVERSE_WEBSITE") {
    return !state
  }
  return state
}

export const websitesDataCondition = (state = false, action) => {
  if (action.type === "SET_WEBSITES_DATA_CONDITION") {
    return action.condition
  }
  return state
}

export const websitesData = (state = [], action) => {
  if (action.type === "SET_DATA") {
    return action.data
  }
  return state
}
