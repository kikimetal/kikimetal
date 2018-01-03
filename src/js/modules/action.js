export const setWindowSize = () => {
  return (dispatch) => {

    const width = window.innerWidth
    const height = window.outerHeight
      ? window.innerHeight
      : window.orientation
        ? screen.width
        : screen.height
        // 肝心な部分。iOS:safari では outerHeight == 0

    dispatch({
      type: "SET_WINDOW_WIDTH",
      width,
    })
    
    dispatch({
      type: "SET_WINDOW_HEIGHT",
      height,
    })

    let size
    if (width < 768) {
      size = "sm"
    } else if (width < 1240) {
      size = "md"
    } else if (width < 1900) {
      size = "lg"
    } else {
      size = "xl"
    }

    dispatch({
      type: "SET_WINDOW_SIZE",
      size,
    })
  }
}

export const reverseWebsite = () => ({
  type: "REVERSE_WEBSITE",
})

export const setWebsitesDataCondition = condition => ({
  type: "SET_WEBSITES_DATA_CONDITION",
  condition,
})

export const setWebsitesData = data => ({
  type: "SET_DATA",
  data,
})


// fetch
// TODO
// export const fetchJSON = (url, ...actions) => {
//   return (dispatch) => {
//     fetch(url)
//       .then((response) => {
//         if(!response.ok) {
//           throw Error(response.statusText);
//         }
//         dispatch(loadComments(false));
//
//         return response;
//       })
//       .then((response) => response.json())
//       .then((comments) => dispatch(fetchCommentsSuccess(comments)))
//       .catch(() => dispatch(getCommentsError(true)));
//   }
// }
