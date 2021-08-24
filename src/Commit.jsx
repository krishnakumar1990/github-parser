import React from "react";
import "./css/Commit.css";

// Stateless component
// Component receives the list of commits as an object from Parent class (props.recentCommits)
// Iterated the object, print the commit name and associated metadata

const Commit = (props) => {
  return (
    <div className="commit">
      <h3> Most Recent commits for {props.repo}</h3>
      {props.recentCommits.map((item) => (
        <div className="commit-name" key={item.sha}>
          <p>
            <span>
              <a href="https://github.com/">{item.commit.message}</a>
            </span>
          </p>
          <p>
            <strong>Committed on</strong>{" "}
            {new Date(item.commit.committer.date).toDateString()}
            <span key={item.commit.author.name}>
              <strong>Author</strong> :
              <a href={item.author != null ? item.author.html_url : ""}>
                {item.commit.author.name}
              </a>
              <strong>committer</strong> :
              <a href={item.committer != null ? item.committer.html_url : ""}>
                {item.commit.committer.name}
              </a>
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Commit;
