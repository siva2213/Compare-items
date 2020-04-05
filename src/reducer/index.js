const initialState = {
  featuresList: [],
  itemList: [],
  compareSummary: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FEATURE_LIST":
      return {
        ...state,
        featuresList: action.value
      };
    case "COMPARE_SUMMARY":
      return {
        ...state,
        compareSummary: action.value
      };
    case "SET_ITEM_LIST":
      return {
        ...state,
        itemList: action.value
      };
    default:
      return state;
  }
};

export default reducer;
