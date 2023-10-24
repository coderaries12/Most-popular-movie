// Define the class and this class handle user movie preferences and provide recommendations
class MostPopularMovieSystem {
    constructor() {
      this.userMovies = {};  //Initialize an empty object that will store the movie preferences of each user
    }

    addUser(userId, movies) {
      this.userMovies[userId] = new Set(movies);  //This method allows you to add a user and their list of favorite movies to the userMovies object. It takes userId and an array of movies.
    }

    
    

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
