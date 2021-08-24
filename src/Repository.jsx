import React from "react";
import "./css/Repository.css";

// Stateless Component
// props send to this component includes
// props.repos : Contains the list of repository details
// props.onClick : Event handler function is invoked when a user clicks on a repository to view commit lists

const Repository = (props) => {
  return (
    <div className="container">
      <h3>
        <span className="hightlight">{props.repos.length}</span> repositories
        under <span className="hightlight">{props.org} </span>
        Organization
      </h3>
      {/* Iterates the repos object to print the repositories and its associated metadata */}
      {props.repos.map((repo) => (
        <div key={repo.id} className="repo-name">
          <div className="repo-desc">
            <h4>
              <b>{repo.name}</b>
              <a className={repo.name} onClick={props.onClick}>
                View Commits
              </a>
            </h4>
            <p>
              <span>{repo.description}</span>
            </p>
            <p>
              {repo.language != null ? (
                <span className="emoji language">{repo.language} </span>
              ) : null}
              <span className="emoji">{repo.stargazers_count} &#11088;</span>
              <span className="emoji">{repo.forks_count} &#128080;</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Repository;
