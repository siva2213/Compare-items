import React from "react";
import Select from "react-select";

export default props => {
  return (
    <>
      <span>Add a product</span>
      <Select
        value={props.selectedOption}
        onChange={props.onSelectItem}
        options={props.options}
      />
    </>
  );
};
