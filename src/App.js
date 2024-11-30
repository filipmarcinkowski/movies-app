import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    movies: 0,
    rating: 0,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    movies: 0,
    rating: 0,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    movies: 0,
    rating: 0,
  },
];

const movies = [
  {
    id: 111,
    title: 'The Lord of the Rings',
    image: 'https://fwcdn.pl/fpo/10/65/1065/8071180_1.10.webp',
    rating: [],
    isSelected: false,
  },
  {
    id: 222,
    title: 'Enemy of the State',
    image: 'https://fwcdn.pl/fpo/17/83/11783/7488943_1.10.webp',
    rating: [],
    isSelected: false,
  },
];

export default function App() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleSelectFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setSelectedMovie(null);
  }

  function handleSelectMovie(movie) {
    setSelectedMovie((cur) => (cur?.title === movie.title ? null : movie));
  }

  return (
    <div className="app">
      <div>
        <Button>Add friend</Button>
        <FriendsList
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />
      </div>
      {selectedMovie && (
        <MovieCard
          selectedMovie={selectedMovie}
          selectedFriend={selectedFriend}
        />
      )}
      {selectedFriend && (
        <div className="last-column">
          <div className="button-right">
            <Button>Add movie</Button>
          </div>
          <MoviesList
            selectedMovie={selectedMovie}
            onSelectMovie={handleSelectMovie}
          />
        </div>
      )}
    </div>
  );
}

function FriendsList({ onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend
          friendObj={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friendObj, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friendObj.id;
  return (
    <li className="friend">
      <div className="friend-box">
        <div>
          <img src={friendObj.image} alt={friendObj.name} />
          <h3>{friendObj.name}</h3>
        </div>
        <Button onClick={() => onSelectFriend(friendObj)}>
          {isSelected ? 'Close' : 'Select'}
        </Button>
      </div>
      <div className="stats friend-box">
        <p>Rated movies: {friendObj.movies}</p>
        <p>Average rating: {friendObj.rating}</p>
      </div>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// //////////////////////////////
// MOVIES
// //////////////////////////////
function MoviesList({ onSelectMovie, selectedMovie }) {
  return (
    <ul className="movies-box">
      {movies.map((movie) => (
        <Movie
          movieObj={movie}
          key={movie.title}
          onSelectMovie={onSelectMovie}
          selectedMovie={selectedMovie}
        />
      ))}
    </ul>
  );
}

function Movie({ movieObj, onSelectMovie, selectedMovie }) {
  return (
    <li
      className="movie"
      onClick={() => onSelectMovie(movieObj)}
      selectedMovie={selectedMovie}
    >
      <img src={movieObj.image} alt={movieObj.title} />
      <h2>{movieObj.title}</h2>
    </li>
  );
}

//////////////////////////////
// MOVIE CARD
//////////////////////////////
function MovieCard({ selectedMovie, selectedFriend }) {
  const [gradesMovie, setGradesMovie] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newVote = { grade: gradesMovie, voter: selectedFriend.id };
    // if (
    //   !selectedMovie.rating.map((friend) => friend.id === selectedFriend.id)
    // )

    selectedMovie.rating = [...selectedMovie.rating, newVote];

    return selectedMovie.rating;
  }

  const length = selectedMovie.rating.length;
  const rate =
    selectedMovie.rating.reduce((acc, cur) => acc + cur.grade, 0) / length;

  return (
    <form className="movie-card" onSubmit={handleSubmit}>
      <img src={selectedMovie.image} alt={selectedMovie.title} />
      <h1>{selectedMovie.title}</h1>
      <p>
        {rate}/10 <span>{selectedMovie.rating.length}votes</span>
      </p>

      <select
        value={gradesMovie}
        onChange={(e) => setGradesMovie(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <button>Vote</button>
    </form>
  );
}
