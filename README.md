# Getting Started with Github Parser

**Github parser** is a simple and interactive web application build for users who wants to quickly browse organizations, view their repositories, and explore recent commits made by contributors.  This tool will be a life-saver for users who believe that Github UI is too complicated for some basic operations. It removes the need to authenticate, simplifies the UI elements, and makes it much more user-friendly. Let's get started. 

![Github Parser](parser.gif)
## Prerequisites

### Environment Setup
To run this application, you should have the following applications or softwares installed on your machine: 

* Make sure that you have the latest version of [Node](https://nodejs.org/en/) installed on your machine. You can verify if node is installed, by running the following command in a terminal window: 
  * `node --version`
* A package manager called npm. It is automatically included in your installation of Node.
* A good code editor to work with our project files. I highly recommend using the editor Visual Studio Code. You can grab it at [code.visualstudio.com](https://code.visualstudio.com/).

### Generate Git personal access token

* Follow the steps to create a new [personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
* Make a note of the `personal access token`, as we might need this in the next section.



## Steps

1. After cloning the repository to your local machine, open the `github-parser` directory in a terminal window.
2. Navigate to the following directory and open the `src/Main.jsx` file.
3. In line #9, replace the `<Enter your Personal Access Token>` with the your `Personal Access Token` obtained from the Generate Git personal access token section.
4. Save your changes and navigate back to the root folder of the project. 
5. Run `npm install` command to install all dependencies in the local node_modules folder. If you encounter permission issues, try to add `sudo` to your command `sudo npm isntall` and re run it. 
6. After successfully installing all dependencies, run `npm start` command. 
7. If everything goes well, you should be able to see a `localhost:3000` window open up on your browser.
8. Provide an `Organization` name and click on the `Search Github` button. 
9. If your `Organization` is invalid, you would see an error message : `Please enter a valid Organization`
10. Enter `Netflix` as the organization name, and click on the `Search Github` button. 
11. After a validation check, and after fetching the results from Github API, the list of repositories available in this organization will be displayed as card layout.
12. You can also view the total number of repositories under this organization.
13. Each repository card would contain the following information
   1. Repository name 
   2. Description (can contain `null` values in it)
   3. Metadata
      1. Language (can contain `null` values in it)
      2. Fork count 
      3. Star count
  
11. Using the `Sort By` dropdown field, you can sort the repositories based on the following metrics: 
    1. Star count
    2. Fork count 
    3. Language 

12. Hover over the repository card, and you can notice the card gets highlighted with a shadow. 
13. Click on the `Repository card` to view the list of recent commits for a particular repo. 
14. Commit window for a repository contains information about commit summary, commit date, author and committer information. 


## Feature Improvements

1. Ability to `search` for a particular repository in the repository view screen.
2. Add additional `sort by` metrics for repositories. 
3. Include `pagination` for repositories.
4. Include a `branch selector` dropdown for commit window to sort last commits based off branches.
5. Use GraphQL API for faster response time and data handling



