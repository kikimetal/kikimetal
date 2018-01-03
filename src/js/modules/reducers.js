const isScreenWidthInitialState = {
  sm: false,
  md: false,
  lg: false,
  xl: false,
}
export const isScreenWidth = (state = isScreenWidthInitialState, action) => {
  const base = {
    sm: false,
    md: false,
    lg: false,
    xl: false,
  }
  switch (action.type) {
    case "SET_WIDTH":
      if (action.width >= 1900){
        // 変更がない場合は break で抜けて state を返さないと、
        // ブレークポイントまたいでないのに redux から レンダー命令が出ちゃう
        // -> リサイズするたびにスクロール位置がリセットされてやばい
        if (state.xl) break
        return {
          ...base,
          xl: true,
        }
      }
      if (action.width >= 1240){
        if (state.lg) break
        return {
          ...base,
          lg: true,
        }
      }
      if (action.width >= 768){
        if (state.md) break
        return {
          ...base,
          md: true,
        }
      }
      else{
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
