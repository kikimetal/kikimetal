export const initialState = {
  kiki: {
    text: "hi i am kiki.",
    age: 21,
  },
  selectedItem: null,
  isShowTrigger: true,
  isScreenWidth: {
    sm: true,
    md: false,
    lg: false,
  },
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

const isShowTrigger = (state = initialState.isShowTrigger, action) => {
  switch (action.type) {
    case "SHOW":
      return true
    case "HIDE":
      return false
    default:
      return state
  }
}

const isScreenWidth = (state = initialState.isScreenWidth, action) => {
  const base = {
    sm: false,
    md: false,
    lg: false,
  }
  switch (action.type) {
    case "SET":
      if (action.width >= 1240){
        // 変更がない場合は break で抜けて state を返さないと、
        // ブレークポイントまたいでないのに redux から レンダー命令が出ちゃう
        if (state.lg) break
        return {
          ...base,
          lg: true,
        }
      }else if (action.width >= 768){
        if (state.md) break
        return {
          ...base,
          md: true,
        }
      }else{
        if (state.sm) break
        return {
          ...base,
          sm: true,
        }
      }
    default:
      return state
  }
  return state
}

export const reducers = {
  kiki,
  selectedItem,
  isShowTrigger,
  isScreenWidth,
}

export default reducers
