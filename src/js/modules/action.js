export const setScreenWidth = width => ({
  type: "SET_WIDTH",
  width: width,
})

export const loadWebsitesDone = () => ({
  type: "DONE",
})

export const sortReverseWebsites = () => ({
  type: "SORT_REVERSE",
})

export const getWebsitesDataSuccess = () => ({
  type: "GET_DATA_SUCCESS",
})

export const setWebsitesData = data => ({
  type: "SET_DATA",
  data: data,
})
