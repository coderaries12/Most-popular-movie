// Define the class and this class handle user movie preferences and provide recommendations
class MostPopularMovieSystem {
    constructor() {
      this.userMovies = {};  //Initialize an empty object that will store the movie preferences of each user
    }

    addUser(userId, movies) {
      this.userMovies[userId] = new Set(movies);  //This method allows you to add a user and their list of favorite movies to the userMovies object. It takes userId and an array of movies.
    }
  
}
