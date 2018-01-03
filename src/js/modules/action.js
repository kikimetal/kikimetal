export const setScreenWidth = width => ({
  type: "SET_WIDTH",
  width,
})

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
