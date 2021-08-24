import React, { Component } from "react";
import Repository from "./Repository";
import Search from "./Search";
import Sort from "./Sort";
import "./css/Main.css";
import Commit from "./Commit";

const myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer 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"
);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      org: " ",
      repo: "",
      orgValid: false,
      noOfRepos: null,
      currentPage: null,
      totalNoOfPages: null,
      perPage: 30,
      recentCommits: null,
      commitView: false,
      repoView: false,
      branchList: null,
      formValidation: true,
    };
  }

  /* Event handler to update the Organization Name */
  updateOrg = (value) => {
    this.setState({ org: value, repoView: false });
  };

  /* Event handler to check if an organization is valid.
   * For a valid organization, list of repositories are fetched
   * and repo state is updated.
   */

  validateOrg = async (element) => {
    let { orgValid, totalNoOfPages, noOfRepos } = this.state;

    await fetch(`https://api.github.com/orgs/${this.state.org}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let resultJson = JSON.parse(result);
        /* Obtain the total number of repositories in an organization */
        noOfRepos = resultJson.public_repos;
        /* Obtain the total number of pages required to display the entire repository list.*/
        totalNoOfPages = Math.ceil(noOfRepos / this.state.perPage);

        if (resultJson.message !== "Not Found") {
          orgValid = result ? true : false;
          this.setState({
            noOfRepos: noOfRepos,
            totalNoOfPages: totalNoOfPages,
            orgValid: orgValid,
            currentPage: 1,
            formValidation: true,
          });
          this.getRepos(this.state.currentPage);
        } else {
          this.setState({ orgValid: false, formValidation: false });
        }
      })
      .catch((error) => {
        this.setState({ orgValid: false, formValidation: false });
        console.log("error", error);
      });
  };

  getRepos = async (element) => {
    let { org, perPage, totalNoOfPages } = this.state;

    let repoList = [];

    for (let i = 1; i <= totalNoOfPages; i++) {
      /* Create a single list to hold all the repositories*/
      let repo;
      /* Make calls to GitHub /repos to obtain the repositoties for each page*/
      await fetch(
        `https://api.github.com/orgs/${org}/repos?page=${i}&${perPage}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          repo = JSON.parse(result);
          // combines the individual page result to a single repository list
          Array.prototype.push.apply(repoList, repo);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    /* Update
     * repos : Entire list of repositories for an organization
     * repoView : Setting the repoView displays the list of repositories
     * orgValid : Setting the orgValid to true, helps displays cerain element in the UI
     */
    if (repoList.length > 0) {
      this.setState({ repos: repoList, repoView: true, commitView: false });
    } else this.setState({ orgValid: false, repos: repoList, repoView: false });
  };

  /* Receives user selected sort by option and sorts the repository list */
  sortRepos = (element) => {
    let sortRepoList = this.state.repos;
    switch (element) {
      case "stargazers_count":
        sortRepoList.sort((a, b) => b.stargazers_count - a.stargazers_count);
        this.setState({ repos: sortRepoList });
        break;
      case "forks_count":
        sortRepoList.sort((a, b) => b.forks_count - a.forks_count);
        this.setState({ repos: sortRepoList });
        break;
      case "language":
        sortRepoList.sort((a, b) =>
          a.language > b.language ? 1 : b.language > a.language ? -1 : 0
        );
        this.setState({ repos: sortRepoList });
        break;
      default:
        break;
    }
  };

  /*
   * Event handler function to get the latest commits list for a repo.
   *  and updates the state of the recentCommits object
   */

  getCommits = async (element) => {
    let { org } = this.state;

    if (element.target.className !== undefined) {
      let repoSelection = element.target.className;
      await fetch(
        `https://api.github.com/repos/${org}/${repoSelection}/commits?page=1&per_page=100`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let commitList = JSON.parse(result);
          if (commitList != null) {
            /* Update
             * recentCommits : Latets commits for a repo get stored in recentCommits
             * repoView : Setting the repoView hides the list of repositories
             * commitView : Setting the commitView dispplays the list of commits
             * repo : Contains the repository name for which the commit list is displayed
             */
            this.setState({
              recentCommits: commitList,
              commitView: true,
              repoView: false,
              repo: repoSelection,
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  render() {
    return (
      <div id="main">
        <Search
          updateOrg={this.updateOrg}
          onClick={this.validateOrg}
          orgName={this.state.org}
          formValidation={this.state.formValidation}
          orgValid={this.state.orgValid}
        />
        {this.state.repoView ? <Sort onChange={this.sortRepos} /> : null}
        {this.state.repoView ? (
          <Repository
            repos={this.state.repos}
            page={this.state.currentPage}
            onClick={this.getCommits}
            org={this.state.org}
          />
        ) : null}
        {this.state.commitView ? (
          <Commit
            recentCommits={this.state.recentCommits}
            org={this.state.org}
            repo={this.state.repo}
          />
        ) : null}
      </div>
    );
  }
}

export default Main;
