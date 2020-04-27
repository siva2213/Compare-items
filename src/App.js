import React, { Component } from "react";
import CompareItem from "./views/CompareItems";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "siva"
    };
  }
  render() {
    return (
      <>
        <CompareItem />
      </>
    );
  }
}

export default App;
