import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";
import "./Panel-Items.css";

class App extends Component {
  state = { category: [], selected: "ALL ITEMS" };
  selectItem = (val) => {
    this.setState({ selected: val });
  };
  getCategories = (data) => {
    const arr = data.map((item) => {
      return item.category;
    });
    const categorySet = new Set(arr);
    const uniqueCategories = [...categorySet];
    const res = uniqueCategories.map((item) => {
      return (
        <div
          className={`item cat-item ${
            this.state.selected === item.toUpperCase() ? "selected" : ""
          }`}
          key={item}
        >
          <div
            className="content"
            onClick={() => {
              this.selectItem(item.toUpperCase());
            }}
          >
            <span className="header">{item.toUpperCase()}</span>
          </div>
        </div>
      );
    });
    return res;
  };
  componentDidMount() {
    const search = async () => {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      const categories = this.getCategories(data);
      console.log(categories);
      this.setState({ category: categories });
    };
    search();
  }
  render() {
    return (
      <div>
        <Header />
        <div>
          <div className="rounded"></div>
          <div className="ui middle aligned divided list panel-cont">
            <div
              className={`item cat-item ${
                this.state.selected === "ALL ITEMS" ? "selected" : ""
              }`}
            >
              <div className="content">
                <span className="header" id="item1">
                  ALL ITEMS
                </span>
              </div>
            </div>
            {this.state.category}
          </div>

          <button
            onClick={() => {
              fetch("https://fakestoreapi.com/products")
                .then((res) => res.json())
                .then((json) => console.log(json));
            }}
          >
            click ME!!
          </button>
        </div>
      </div>
    );
  }
}

export default App;
