import React, { Component } from "react";
import "./css/Sort.css";

class Sort extends Component {
  state = { value: "" };

  // Event handler function for sort by dropdown selection.
  // When user make a choice, an event is raised to the parent class (Main) along with the user choice
  // State for the repository list (repo) is updated in the parent Class by sortRepos function

  sortRepos = (element) => {
    console.log(element.target.value);
    this.setState({ value: element.target.value });
    this.props.onChange(element.target.value);
  };

  render() {
    return (
      <div id="sort">
        <div className="sort">Sort By</div>
        <select
          className="sort"
          onChange={this.sortRepos}
          value={this.state.value}
        >
          <option value="stargazers_count">Star Count</option>
          <option value="forks_count">Fork Count</option>
          <option value="language">Language</option>
        </select>
      </div>
    );
  }
}

export default Sort;
