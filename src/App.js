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

const initialMovies = [
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
  const [movies, setMovies] = useState(initialMovies);

  function handleSelectFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setSelectedMovie(null);
  }

  function handleSelectMovie(movie) {
    setSelectedMovie((cur) => (cur?.id === movie.id ? null : movie));
  }

  function handleSetMovies(updateMov) {
    if (selectedMovie.id === updateMov.id) setSelectedMovie(updateMov);
    setMovies((prevMovies) =>
      prevMovies.map((movie) => (movie.id === updateMov.id ? updateMov : movie))
    );
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
          onSetMovies={handleSetMovies}
          movies={movies}
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
            movies={movies}
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
function MoviesList({ onSelectMovie, selectedMovie, movies }) {
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

function Movie({ movieObj, onSelectMovie }) {
  return (
    <li className="movie" onClick={() => onSelectMovie(movieObj)}>
      <img src={movieObj.image} alt={movieObj.title} />
      <h2>{movieObj.title}</h2>
    </li>
  );
}

//////////////////////////////
// MOVIE CARD
//////////////////////////////
function MovieCard({ selectedMovie, selectedFriend, movies, onSetMovies }) {
  const [gradesMovie, setGradesMovie] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newVote = {
      grade: gradesMovie,
      voter: selectedFriend.id,
    };

    const updateMovie = {
      ...selectedMovie,
      rating: [...selectedMovie.rating, newVote],
    };

    onSetMovies(updateMovie);
  }

  const length = selectedMovie.rating.length;
  const rate =
    length > 0
      ? selectedMovie.rating.reduce((acc, cur) => acc + cur.grade, 0) / length
      : 'not rated jet';

  return (
    <form className="movie-card" onSubmit={handleSubmit}>
      <img src={selectedMovie.image} alt={selectedMovie.title} />
      <h1>{selectedMovie.title}</h1>
      <p>
        {rate}
        <span> ({selectedMovie.rating.length} votes)</span>
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
