// Define the class and this class handle user movie preferences and provide recommendations
class MostPopularMovieSystem {
    constructor() {
      this.userMovies = {};  //Initialize an empty object that will store the movie preferences of each user
    }

    addUser(userId, movies) {
      this.userMovies[userId] = new Set(movies);  //This method allows you to add a user and their list of favorite movies to the userMovies object. It takes userId and an array of movies.
    }

    //This method finds the most popular movie among a user's network of friends, including friends of friends.
getMostPopularMovie(userId) {  
  //This if-loop checks if the user with the specified userId exists in the userMovies object. If not, it returns null because there's no data for that user.
  if (!this.userMovies[userId]) {  
    return null;
  }

  const userMovies = this.userMovies[userId]; //It collects the user's favorite movies 
  const friendMovies = new Set();         //Initialize an empty set for friend's movie preferences.Sets are used so no movie is duplicate

  this.getFriends(userId).forEach((friend) => {
    friendMovies.add(...(this.userMovies[friend] || [])); //This method fetch the user's friends and iterates through them to add their movie preferences to the friendMovies set.
  });

  // Creates an array of recommendedMovies by filtering out movies that the user already likes.
  const recommendedMovies = [...friendMovies].filter((movie) => !userMovies.has(movie)); //spread operator is used to convert set into array

  if (recommendedMovies.length === 0) { //returns null because there are no unique recommendations.
    return null;
  }

  const movieCounts = {};  // Used object to counts how many times each recommended movie appears among the user's friends

  this.getFriends(userId).forEach((friend) => {
    recommendedMovies.forEach((movie) => {
      if (this.userMovies[friend] && this.userMovies[friend].has(movie)) {
        movieCounts[movie] = (movieCounts[movie] || 0) + 1;
      }
    });
  });

  //It finds the most popular movie by selecting the one with the highest count from movieCounts.
  const mostPopularMovie = Object.keys(movieCounts).reduce((a, b) =>
    movieCounts[a] > movieCounts[b] ? a : b
  );

  return mostPopularMovie;
}

// this function is to return an array of friends for the specified user.
getFriends(userId) {
  // You can implement a method to fetch a user's friends here.
  // This example assumes a simple list of friends.
  const friends = [
    { id: 1, friends: [2, 3, 4] },
    { id: 2, friends: [1, 5, 6] },
    { id: 3, friends: [1, 7, 8] },
    { id: 4, friends: [1, 9, 10] },
    ];        
  
  const user = friends.find((friend) => friend.id === userId);
  return user ? user.friends : [];
  }
  
  
}
