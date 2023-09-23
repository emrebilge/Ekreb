# Ekreb Word Scramble Guessing Game
**Author**: Emre Bilge
**Email Address**: emre.e.bilge@vanderbilt.edu
# Introduction:
This project on GitHub serves as my submission for the Change++ challenge. It is a word unscrambling game where the user is prompted with a scrambled word, and has to guess the original based on it. Throughout playing the game, the score and accuracy is updated.

# Technologies used:
Frontend:
   - React
   - JavaScript
   - HTML, CSS
Backend:
   - Node.JS
   - Express
   - Restful API

## Usage
## Prerequisites

Before you can run this application, you need to have Node.js and npm (Node Package Manager) installed on your computer.
You can check if you have Node.js using node -v in the command line

- **Node.js**: You can download and install Node.js from [https://nodejs.org/](https://nodejs.org/).

Once Node.js is installed, you can proceed with the following steps to run the application.

To run the final product, first, navigate to a directory on your local machine where you would like to download the project by using
   cd (directory)

In the desired directory, run:

    git clone https://github.com/ChangePlusPlusVandy/change-coding-challenge-2023-emrebilge.git

Navigate into the downloaded directory that you downloaded to:
   cd change-coding-challenge-2023-emrebilge

Install the following package by running the following in the terminal:

To run the backend section:
    cd backend
    npm install
    node index.js

To run the frontend, switch to the main directory.
    cd frontend
    cd word-guessing-game
    npm install
    npm start

You can access the frontend of the application by visiting http://localhost:3000/ in your web browser, while the backend can be accessed at http://localhost:5551/.

If you encounter any errors during the application's startup or if the app appears to be stuck on the loading screen, it's possible that these issues are related to dependencies. To resolve this, make sure you have the necessary dependencies installed, and then restart the application. This should help resolve any dependency-related errors and allow the app to run smoothly. Moreover, if it still isn't working after these resolutions, it could be due to the host server being used for another application.

## Structure of the Application

### Breakdown of the Project Structure

    - backend                         # backend section, contains restful API and uses node.js
    - frontend                        # frontend section, contains react.js project with UI
    - node_modules
    - CHALLENGE_SPEC.md               # Original challenge specifications
    - README.md                       # This README file
    - output.csv
    - package-lock.json
    - package.json                    

### Backend

backend
   - node_modules
   - index.js                         # RESTful API backend built using Node.js
   - package.json
   - package-lock.json                # Dependencies for backend 
    .
### Frontend

frontend
   - word-guessing-game
        - node_modules
        - public                      # Contains images and logos used throughout the UI
        - src
             - GamePage               # Contains the main place where the application will be run
             - ScoreBoardPage         # JavaScript regarding the scoreboard
             - App.css                # Style for the game
             - App.js                 # contains the main app component
             - App.test.js
             - index.css              # implements some CSS styling
             - index.js               # initiates the app component on the page
        - README.md
        - package.json
        - package-lock.json
     
# Features:
- There are 6 rounds that the user can play
- The user can request a hint, displaying the next first characters of the unscrambled word
- The user can skip the word
- The user can reset the game

## Future Steps

With more time at hand, there are some refinements I'd consider for this application, although they are mostly minor. To begin, I've worked diligently to ensure the frontend's optimal performance across various screen sizes. However, I noticed that the user may have to refit the page to their best liking. This could be problematic for users on tablets or smartphones, so I would have to prioritize further CSS optimization in the future to enhance the experience.

I would like to have attempted more creativity with the user design. User Interface was a challenge I had to consider when developing this project. A next step in this category would be to add more animations like when the user gets the correct guess, or even sound effects.

Furthermore, I would begin to guide the user into different difficulties, maybe based on the word length. Additionally, I would have liked to implement the hints in random letters across the word rather than the next first letter. Another possible future functionality would be to add a timer, and press the user to guess each round in an allotted time.


# Reflection
Prior to starting this project, I was not fully immersed in web development. Developing this project was an important milestone for me. Previously, I thought I was interested in the frontend design of websites, but as I began working on this project, I realized that the interaction between the backend and the frontend is really what intrigues me. There was a little bit of a learning curve when starting out, however, I found the Change++ workshops to be incredibly helpful to get a basic idea of how these concepts work. After these workshops, I did extensive research into how the backend is run with Node.
Balancing this project on top of school work and other extracurricular commitments was a challenge, but something that did not deter me. I enjoyed the aspect of working in a fast-paced environment with a set deadline. This deadline allowed me to adjust my schedule around the project and work incrementally on it day by day, or really night by night.
In terms of development, this project was actually very fun. I am not going to lie, I almost dropped ECE and switched completely to CS because of how much I enjoyed it. I liked this aspect of problem-solving, and it is something I can imagine myself doing on a day-to-day basis.

Anyways, here is my project, Enjoy!

Also my guess for the unscrambled word of Ekreb is Berke
