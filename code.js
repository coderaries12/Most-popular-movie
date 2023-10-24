// Define the class and this class handle user movie preferences and provide recommendations
class MostPopularMovieSystem {
    constructor() {
      this.userMovies = {};  //Initialize an empty object that will store the movie preferences of each user
    }

    addUser(userId, movies) {
      this.userMovies[userId] = new Set(movies);  //This method allows you to add a user and their list of favorite movies to the userMovies object. It takes userId and an array of movies.
    }

    getMostPopularMovie(userId) {
      if (!this.userMovies[userId]) {
        return null;
      }
  
      const userMovies = this.userMovies[userId];
      const friendMovies = new Set();
  
      this.getFriends(userId).forEach((friend) => {
        friendMovies.add(...(this.userMovies[friend] || []));
      });
  
      const recommendedMovies = [...friendMovies].filter((movie) => !userMovies.has(movie));
  
      if (recommendedMovies.length === 0) {
        return null;
      }
  
      const movieCounts = {};
  
      this.getFriends(userId).forEach((friend) => {
        recommendedMovies.forEach((movie) => {
          if (this.userMovies[friend] && this.userMovies[friend].has(movie)) {
            movieCounts[movie] = (movieCounts[movie] || 0) + 1;
          }
        });
      });
  
      const mostPopularMovie = Object.keys(movieCounts).reduce((a, b) =>
        movieCounts[a] > movieCounts[b] ? a : b
      );
  
      return mostPopularMovie;
    }
  
  
}
