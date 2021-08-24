import React, { Component } from "react";

// Component that handles the search organization field

class Search extends Component {
  state = {
    updateOrg: this.props.updateOrg,
    orgValid: this.props.orgValid,
    orgName: undefined,
    formValidation: this.props.formValidation,
  };

  // Event handler function for search field input
  // Search component raises an event to the parent Class Main
  // with the value of user input

  updateOrg = (element) => {
    this.props.updateOrg(element.target.value);
  };

  // Event handler function for search field submission
  // Search component raises an event to the parent Class Main
  // with the value of user input
  validateOrg = (element) => {
    this.props.onClick();
  };

  render() {
    return (
      <div id="search">
        <input
          className="search"
          type="text"
          name="org"
          value={this.state.orgName}
          placeholder="Enter Organization Name"
          onChange={this.updateOrg}
        />
        <button
          className="searchButton"
          onClick={this.validateOrg}
          disabled={this.validateOrg ? false : true}
        >
          Search Github
        </button>
        <div className="error">
          {this.props.formValidation
            ? ""
            : "Please enter a valid organization name "}
        </div>
      </div>
    );
  }
}

export default Search;
