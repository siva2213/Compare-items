import api from "../axios";

const featureListActions = {
  getFeatureList: (payload) => {
    return (dispatch) => {
      return api({
        url: `/5e86ec5531000011d8814754`,
        method: "GET",
      })
        .then((resp) => {
          const data = resp.products;
          dispatch({
            type: "COMPARE_SUMMARY",
            value: data.compareSummary,
          });
          dispatch({
            type: "SET_FEATURE_LIST",
            value: data.featuresList,
          });
          const itemList = [];
          const titles = data.compareSummary.titles;
          for (const key in titles) {
            let tempObj = {};
            if (titles.hasOwnProperty(key)) {
              tempObj["label"] = titles[key]["title"];
              tempObj["value"] = key;
            }
            itemList.push(tempObj);
          }
          dispatch({
            type: "SET_ITEM_LIST",
            value: itemList,
          });
          return data;
        })
        .catch((err) => {
          return err;
        });
    };
  },
  setItemList: (payload) => {
    return (dispatch) => {
      dispatch({
        type: "SET_ITEM_LIST",
        value: payload,
      });
    };
  },
};

export default featureListActions;
