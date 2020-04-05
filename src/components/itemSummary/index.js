import React from "react";

export default props => {
  return (
    <>
      <div className="imageView">
        <img src={props.imageUrl} alt="Smiley face" height="125" width="185" />
      </div>
      <div align="left">
        <strong>{props.productName}</strong>
      </div>
      <div className="priceView">
        <div className="priceViewItem">
          <strong>₹{props.price.price}</strong>
        </div>
        <div className="priceViewItem" style={{ color: "grey" }}>
          <strike>{`₹${props.price.finalPrice}`}</strike>
        </div>
        <div className="priceViewItem" style={{ color: "green" }}>
          {props.price.totalDiscount}% off
        </div>
      </div>
    </>
  );
};
