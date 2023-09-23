# Ekreb Word Scramble Guessing Game
**Author**: Emre Bilge
**Email Address**: emre.e.bilge@vanderbilt.edu

## Usage

To run the final product, first, navigate to a directory on your local machine where you would like to download the project by using
   cd (directory)

In the desired directory, run:

    git clone https://github.com/ChangePlusPlusVandy/change-coding-challenge-2023-emrebilge.git

Navigate into the downloaded directory that you downloaded to:

   cd change-coding-challenge-2023-emrebilge

To run the backend section:
    cd backend
    node index.js

To run the frontend, switch to the main directory.
    cd frontend
    cd word-guessing-game
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
     


## Future Steps

With more time at hand, there are some refinements I'd consider for this application, although they are mostly minor. To begin, I've worked diligently to ensure the frontend's optimal performance across various screen sizes. However, I noticed that the user may have to refit the page to their best liking. This could be problematic for users on tablets or smartphones, so I would have to prioritize further CSS optimization in the future to enhance the experience.

I would like to have attempted more creativity with the user design. User Interface was a challenge I had to consider when developing this project. A next step in this category would be to add more animations like when the user gets the correct guess, or even sound effects.

Furthermore, I would begin to guide the user into different difficulties, maybe based on the word length. Additionally, I would have liked to implement the hints in random letters across the word rather than the next first letter. Another possible future functionality would be to add a timer, and press the user to guess each round in an allotted time.

# Also my guess for the unscrambled word of Ekreb is Berke

