const action = {
  updateKiki: {
    type: "UPDATE_ALL",
    text: "世界は時間と共に... ",
  },
  selectItem: (item) => {
    return {
      type: "SELECT_ITEM",
      item: item,
    }
  },
  showTrigger: {
    type: "SHOW"
  },
  hideTrigger: {
    type: "HIDE"
  },
}
export default action
