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

// Example usage:
const movieSystem = new MostPopularMovieSystem();
movieSystem.addUser(1, ["Movie1", "Movie2", "Movie3"]);
movieSystem.addUser(2, ["Movie2", "Movie4", "Movie5"]);
movieSystem.addUser(3, ["Movie1", "Movie3", "Movie6"]);

const userId = 2;
const mostPopularMovie = movieSystem.getMostPopularMovie(userId);

if (mostPopularMovie) {
  console.log(`The most popular movie for user ${userId} is ${mostPopularMovie}.`);
} else {
  console.log(`No recommendations available for user ${userId}.`);
}

// Output:
// "The most popular movie for user 2 is Movie1."

// The code will go through the following steps to find the most popular movie for User 2:
// It checks if User 2 exists in the userMovies object. In this case, User 2 does exist, and their favorite movies are "Movie2," "Movie4," and "Movie5."
// It collects User 2's favorite movies into the userMovies set: userMovies = {"Movie2", "Movie4", "Movie5"}.
// It finds User 2's friends by calling the getFriends method. In this example, User 2's friends are [1, 5, 6].
// It collects the movie preferences of User 2's friends and adds them to the friendMovies set. This includes the favorite movies of User 1, User 5, and User 6.
// It calculates the recommendedMovies by filtering out movies that User 2 already likes. In this case, only User1 movie preference are given and "Movie2" is out because it's already in user list.
// It counts how many times each of these recommended movies appears in User 2's friends' preferences. In this case,user1 friendlist is { id: 1, friends: [2, 3, 4] } and  "Movie1" appear twice among User 1's friends that is friend of 1's.
// It selects the most popular movie from the movieCounts object. Since "Movie1" appear twice and rest all appear once, it selects "Movie1."
// Finally, it returns "Movie1" as the most popular movie for User 2.
