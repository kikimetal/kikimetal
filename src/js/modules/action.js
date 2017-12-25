export const setScreenWidth = width => ({
  type: "SET_WIDTH",
  width,
})

export const sortReverseWebsites = () => ({
  type: "SORT_REVERSE",
})

export const setWebsitesDataCondition = condition => ({
  type: "SET_WEBSITES_DATA_CONDITION",
  condition,
})

export const setWebsitesData = data => ({
  type: "SET_DATA",
  data,
})
