const isScreenWidthInitialState = {
  px: 0,
  sm: false,
  md: false,
  lg: false,
}
export const isScreenWidth = (state = isScreenWidthInitialState, action) => {
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
          px: action.width,
        }
      }else if (action.width >= 768){
        if (state.md) break
        return {
          ...base,
          md: true,
          px: action.width,
        }
      }else{
        if (state.sm) break
        return {
          ...base,
          sm: true,
          px: action.width,
        }
      }
    default:
      return state
  }
  return state
}

export const loadWebsites = (state = false, action) => {
  if (action.type === "DONE") {
    return true
  }
  return state
}

export const isSortWebsitesReverse = (state = false, action) => {
  if (action.type === "SORT_REVERSE") {
    return !state
  }
  return state
}
