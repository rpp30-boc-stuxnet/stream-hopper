# stream-hopper
[Streamhopper](https://streamhopper.herokuapp.com/) is a mobile/desktop app that allows users to browse movies and tv shows and see all streaming/rent/buying the movie/tv show. 
Streamhopper also allows users to save movies or TV shows they are interested in and leave comments/ratings for movie/tv show content and the quality of each stream/rent/buy option.


# App demo
## Landing Page
The user will be welcomed to the site with the landing page shown below 

![welcome page](https://user-images.githubusercontent.com/80856611/149639251-d983fb55-50b0-44f3-be78-b3dd7d19409f.png)

## Sign in/Log in Page
A user can choose between logging in/signing up with an external party (Facebook or Google), or by a manual username and password

![loginpage](https://user-images.githubusercontent.com/80856611/149639306-b0a737e4-8681-4519-beeb-d89cef950e88.png)

## Dashboard
Upon logging in, a user will be presented with a personalized dashboard. The dashboard allows a user to perform the following actions: 
* Add/Remove titles to/from their personal "My Titles" list
* Upvote/Downvote titles 
* Browse suggested movies based on the titles previously added to the users list
* Browse trending and streamhopper suggested titles
* Search for a specific movie or tv title
* Select light/dark mode 
* Logouot of the app

![dashboard](https://user-images.githubusercontent.com/80856611/149639343-5186a924-0a8d-4549-a88f-a02ca948b8e4.png)

## Title Overview 
A user can select any title from their dashboard, or click on a result from the search bar to reach the overview page. The overview page provides the user with the streaming/renting/buying options for a given title. The overview page also supports the below functionality: 
* Upvoting/downvoting a title
* Adding the title to the user's personal "My Titles" list
* Adding a review for the audio, vidoe, and reliability quality of each streaming quality
* Adding a comment for the title content

![movieOverview](https://user-images.githubusercontent.com/80856611/149639503-5c46041b-bcc2-4062-ac50-f960328c23c7.png)

## Seach Functionality
Upon typing in the search bar, the user will be presented with a list that best fits their input to the search bar

![search bar](https://user-images.githubusercontent.com/80856611/149639521-9100b52e-316e-43d1-a222-d3cf783bc24c.png)

## Dark vs Light Mode
The app will use the device preference if available. The user also has manual control of using light or dark mode by toggling the sun/moon in the upper right hand corner of the app once they are logged in. 

![dark vs light mode](https://user-images.githubusercontent.com/80856611/149639604-2345f287-6f6e-4c5c-94f8-7d4401778d6d.png)

# Tech Stack
* [ Firebase (Authentication)](https://firebase.google.com/)
* [Atlas MongoDB (User Database)](https://www.mongodb.com/atlas)
* [Express (backend)](https://expressjs.com/)
* [React (frontend)](https://reactjs.org/)
* [Jest (testing)](https://jestjs.io/)

# APIs
Streamhopper pulls information from three APIs to feed the dashboard and overview pages:
* [Watchmode](https://api.watchmode.com/)
* [The Movie Database](https://developers.themoviedb.org/3/getting-started)
* [The Open Movie Database](http://www.omdbapi.com/)

# App Install on Local Enviornment 
1. Fork and clone the staging branch of the repo to your local device
2. Go to the root folder (cd ./stream-hopper)
3. Run `npm install` to install all dev dependencies 
4. Run `npm run fullstack-dev` to launch the backend and frontend from the same terminal. Once the terminal resolves, load the website at `localhost:4000`
5. To run frontend tests, run `npm run react-test`
6. To run back-end tests, run `npm run back-test`

# Contributors 
* [Drew Payton](https://github.com/djp0301)
* [Anna Peberdy](https://github.com/AnnaMP91)
* [Raine Adams](https://github.com/rainealexander)
* [Ashley Reischman](https://github.com/asheliz648)
* [Ernesto Ortega](https://github.com/ErnestoOrtegaHernandez)
* [Trevor Beyer](https://github.com/4trevor4)
