import React, { Component } from "react";
import { connect } from "react-redux";
import FeatureListActions from "../actions";
import Table from "../components/table";
import ItemSelection from "../components/selectBox";
import ItemSummary from "../components/itemSummary";
import "./CompareItems.css";
import { cloneDeep } from "lodash";
class CompareItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemsCount: [0],
      selectedOption: null,
      rowHeaders: [],
      tempFeatureList: [],
      isShowOnlyDiff: false,
    };
  }

  componentDidMount() {
    this.props.getFeatureList();
  }

  findIndexofItem = (selectedItem, isOnClear) => {
    if (isOnClear) {
      const index = this.state.selectedItemsCount.findIndex((item) => {
        return item && item[0].value === selectedItem.value;
      });
      return index;
    }
    const index = this.props.itemList.findIndex(
      (item) => item.value === selectedItem.value
    );
    return index;
  };

  /****************Event Handling ******************/
  onSelectItem = (selectedItem) => {
    //finding index of selected item
    const index = this.findIndexofItem(selectedItem);
    //removing the selected item from the main itemList
    const removeCurrentItemFromList = this.props.itemList.splice(index, 1);
    //logic for show only Diff
    let tempFeatureList = cloneDeep(this.props.featuresList);
    tempFeatureList.forEach((highLvlFeatureList) => {
      highLvlFeatureList.features.forEach((subLvlFeatureList) => {
        let values = Object.values(subLvlFeatureList.values);
        let flag = values.every((itemVal) => {
          return itemVal === subLvlFeatureList.values[selectedItem.value];
        });
        if (flag) {
          delete subLvlFeatureList.values;
          delete subLvlFeatureList.featureName;
        }
      });
    });
    //updating the selected itemlist according to the,
    //items should shown less than or equal to 4
    const oldItemList = this.state.selectedItemsCount;
    if (oldItemList.length <= 4) {
      oldItemList.push(removeCurrentItemFromList);
      this.props.setItemList(this.props.itemList);
    }
    this.setState({
      selectedOption: { ...selectedItem },
      selectedItemsCount: oldItemList,
      tempFeatureList: tempFeatureList,
    });
  };
  onShowOnlyDiff = () => {
    if (this.state.selectedItemsCount.length > 2) {
      this.setState({
        isShowOnlyDiff: !this.state.isShowOnlyDiff,
      });
    }
  };
  onClearItem = (ind) => {
    const index = this.findIndexofItem(
      this.state.selectedItemsCount[ind + 1][0],
      true
    );
    const removeCurrentItemFromList = this.state.selectedItemsCount.splice(
      index,
      1
    )[0];
    const currentSeletedItems = this.state.selectedItemsCount;
    const currentOptions = this.props.itemList;
    currentOptions.push({
      ...removeCurrentItemFromList[0],
    });
    this.props.setItemList(currentOptions);
    if (currentSeletedItems.length === 1) {
      this.setState({
        selectedOption: null,
      });
    }
    this.setState({
      selectedItemsCount: currentSeletedItems,
    });
  };

  /****************** Components **********************/
  itemSummaryComponent = (ind) => {
    return (
      <ItemSummary
        imageUrl={
          this.props.compareSummary.images[
            this.state.selectedItemsCount[ind + 1][0].value
          ]
        }
        price={
          this.props.compareSummary.productPricingSummary[
            this.state.selectedItemsCount[ind + 1][0].value
          ]
        }
        productName={
          this.props.compareSummary.titles[
            this.state.selectedItemsCount[ind + 1][0].value
          ].title
        }
      />
    );
  };
  tableComponent = (selectedItem, ind, isShowOnlyDiff) => {
    return (
      <Table
        colId={ind}
        rows={
          isShowOnlyDiff ? this.state.tempFeatureList : this.props.featuresList
        }
        selectedItemKey={selectedItem}
      />
    );
  };
  itemSelectionComponent = (selectedOption, options, onSelectItem) => {
    return (
      <ItemSelection
        selectedOption={selectedOption}
        options={options}
        onSelectItem={onSelectItem}
      />
    );
  };

  render() {
    return (
      <>
        <label>
          {" "}
          <strong>Compare</strong>{" "}
        </label>
        <div>
          {this.state.selectedItemsCount && (
            <small>
              {this.state.selectedItemsCount.length - 1} item selected
            </small>
          )}
        </div>
        <div className="select">
          <div className="showDiffStyle">
            <div>
              <input type="checkbox" onChange={this.onShowOnlyDiff} />
            </div>
            <div style={{ paddingLeft: "0.5rem" }}>Show Only Differences</div>
          </div>
          {this.state.selectedItemsCount.length === 1 ? (
            <div className="listStyling">
              <div className="dummyImageView"></div>
              {this.itemSelectionComponent(
                this.state.selectedOption,
                this.props.itemList,
                this.onSelectItem
              )}
            </div>
          ) : this.state.selectedItemsCount &&
            this.state.selectedItemsCount.length <= 4 ? (
            this.state.selectedItemsCount.map((item, ind) => {
              if (ind < this.state.selectedItemsCount.length - 1) {
                return (
                  <div className="listStyling" key={ind}>
                    <div
                      className="clearItem"
                      onClick={() => {
                        this.onClearItem(ind);
                      }}
                    >
                      x
                    </div>
                    {this.itemSummaryComponent(ind)}
                  </div>
                );
              } else {
                return (
                  <div className="listStyling" key={ind}>
                    <div className="dummyImageView"></div>
                    {this.itemSelectionComponent(
                      item.label,
                      this.props.itemList,
                      this.onSelectItem
                    )}
                  </div>
                );
              }
            })
          ) : (
            this.state.selectedItemsCount.map((item, ind) => {
              console.log(item);
              if (ind < this.state.selectedItemsCount.length - 1) {
                return (
                  <div className="listStyling" key={ind}>
                    <div
                      className="clearItem"
                      onClick={() => {
                        this.onClearItem(ind);
                      }}
                    >
                      x
                    </div>
                    {this.itemSummaryComponent(ind)}
                  </div>
                );
              }
              return "";
            })
          )}
        </div>
        {this.state.selectedItemsCount.length > 1 ? (
          <div className="table-container">
            {this.state.isShowOnlyDiff
              ? this.state.selectedItemsCount &&
                this.state.selectedItemsCount.length <= 5 &&
                this.state.selectedItemsCount.map((selectedItem, ind) => {
                  return (
                    <div key={ind}>
                      {this.tableComponent(selectedItem, ind, true)}
                    </div>
                  );
                })
              : this.state.selectedItemsCount &&
                this.state.selectedItemsCount.length <= 5 &&
                this.state.selectedItemsCount.map((selectedItem, ind) => {
                  return (
                    <div key={ind}>
                      {this.tableComponent(selectedItem, ind)}
                    </div>
                  );
                })}
          </div>
        ) : (
          <div align="center" className="NoData">
            Please select products to compare
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    featuresList: store.reducer.featuresList,
    itemList: store.reducer.itemList,
    compareSummary: store.reducer.compareSummary,
  };
};
const mapActionToProps = {
  getFeatureList: FeatureListActions.getFeatureList,
  setItemList: FeatureListActions.setItemList,
};
export default connect(mapStateToProps, mapActionToProps)(CompareItem);
