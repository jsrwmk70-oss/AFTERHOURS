/* ========================================================
   AfterHours – script.js
   All interactivity: movie rendering, filters, search,
   watchlist (localStorage), modal popup, surprise feature,
   dark/light theme toggle.

   Written in simple, beginner-friendly Vanilla JavaScript.
======================================================== */

// ============================================================
// 1. MOVIE DATA – An array of movie objects
//    Each object stores info about one movie.
// ============================================================
const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    trending: true,
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into a CEO's mind."
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    trending: true,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911BTUgMe1nLGMQ.jpg",
    description: "When the menace known as the Joker emerges, Batman must accept one of the greatest tests to fight injustice."
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    trending: true,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    rating: 9.3,
    trending: false,
    poster: "https://image.tmdb.org/t/p/w500/9cjIGRQL0ElQBOGLCY8iAN4UiTX.jpg",
    description: "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Thriller",
    rating: 8.9,
    trending: false,
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
  },
  {
    id: 6,
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    rating: 8.7,
    trending: false,
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    description: "A hacker discovers that reality as he knows it is a simulation, and joins a rebellion against the machines."
  },
  {
    id: 7,
    title: "Parasite",
    year: 2019,
    genre: "Thriller",
    rating: 8.5,
    trending: true,
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    description: "Greed and class discrimination threaten the symbiotic relationship between a wealthy family and a poor one."
  },
  {
    id: 8,
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Action",
    rating: 8.4,
    trending: true,
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dkm5RlkR1ltLqcEQOjJp.jpg",
    description: "The Avengers assemble once more to reverse the damage caused by Thanos and restore balance to the universe."
  },
  {
    id: 9,
    title: "The Hangover",
    year: 2009,
    genre: "Comedy",
    rating: 7.7,
    trending: false,
    poster: "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxkEhLBQH6eLBYMB.jpg",
    description: "Three buddies wake up from a bachelor party in Las Vegas with no memory of the night and the bachelor missing."
  },
  {
    id: 10,
    title: "Joker",
    year: 2019,
    genre: "Drama",
    rating: 8.4,
    trending: true,
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    description: "A mentally troubled comedian struggles with society, leading him down a path of chaos in Gotham City."
  },
  {
    id: 11,
    title: "Superbad",
    year: 2007,
    genre: "Comedy",
    rating: 7.6,
    trending: false,
    poster: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
    description: "Two inseparable best friends navigate the last weeks of high school and attempt to score an invite to a party."
  },
  {
    id: 12,
    title: "John Wick",
    year: 2014,
    genre: "Action",
    rating: 7.4,
    trending: false,
    poster: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    description: "An ex-hitman comes out of retirement to track down the gangsters that destroyed everything he held dear."
  },
  {
    id: 13,
    title: "Gone Girl",
    year: 2014,
    genre: "Thriller",
    rating: 8.1,
    trending: false,
    poster: "https://image.tmdb.org/t/p/w500/lv5xShBIDPe4Ovlhi3V3yg3UUCb.jpg",
    description: "A husband becomes the main suspect when his wife goes missing on their fifth wedding anniversary."
  },
  {
    id: 14,
    title: "The Grand Budapest Hotel",
    year: 2014,
    genre: "Comedy",
    rating: 8.1,
    trending: false,
    poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    description: "A legendary concierge at a famous European hotel between the wars takes a young protégé under his wing."
  },
  {
    id: 15,
    title: "Oppenheimer",
    year: 2023,
    genre: "Drama",
    rating: 8.5,
    trending: true,
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    description: "The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II."
  },
  {
    id: 16,
    title: "Mad Max: Fury Road",
    year: 2015,
    genre: "Action",
    rating: 8.1,
    trending: false,
    poster: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFBO.jpg",
    description: "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee a tyrannical warlord and his army."
  },
  {
    id: 17,
    title: "Dune",
    year: 2021,
    genre: "Sci-Fi",
    rating: 8.0,
    trending: true,
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    description: "Paul Atreides unites with the Fremen people of the desert planet Arrakis as he is on a path to avenge the destruction of his family."
  },
  {
    id: 18,
    title: "Knives Out",
    year: 2019,
    genre: "Thriller",
    rating: 7.9,
    trending: false,
    poster: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    description: "A detective investigates the death of the patriarch of an eccentric, combative family."
  }
];

// ============================================================
// 2. DOM ELEMENT REFERENCES
//    We grab all important elements from the HTML once
//    so we can reuse them without searching the page again.
// ============================================================

// Grids and containers
const movieGrid       = document.getElementById('movieGrid');
const trendingGrid    = document.getElementById('trendingGrid');
const watchlistGrid   = document.getElementById('watchlistGrid');

// Buttons and inputs
const searchInput     = document.getElementById('searchInput');
const searchToggle    = document.getElementById('searchToggle');
const searchBox       = document.getElementById('searchBox');
const surpriseBtn     = document.getElementById('surpriseBtn');
const themeToggle     = document.getElementById('themeToggle');
const hamburger       = document.getElementById('hamburger');
const navLinks        = document.getElementById('navLinks');
const navWatchlistBtn = document.getElementById('navWatchlistBtn');

// Displays
const watchlistCount  = document.getElementById('watchlistCount');
const searchInfo      = document.getElementById('searchInfo');
const emptyState      = document.getElementById('emptyState');
const watchlistEmpty  = document.getElementById('watchlistEmpty');
const welcomeText     = document.getElementById('welcomeText');

// Modal (Movie Details Popup)
const modalOverlay    = document.getElementById('modalOverlay');
const movieModal      = document.getElementById('movieModal');
const modalClose      = document.getElementById('modalClose');
const modalPoster     = document.getElementById('modalPoster');
const modalTitle      = document.getElementById('modalTitle');
const modalYear       = document.getElementById('modalYear');
const modalGenre      = document.getElementById('modalGenre');
const modalRating     = document.getElementById('modalRating');
const modalDesc       = document.getElementById('modalDesc');
const modalWatchlistBtn = document.getElementById('modalWatchlistBtn');

// Loader
const loader          = document.getElementById('loader');

// Genre filter buttons
const genreFilters    = document.getElementById('genreFilters');

// ============================================================
// 3. WATCHLIST – Load from localStorage
//    localStorage stores data as text, so we parse it to
//    get our array of saved movie IDs back.
// ============================================================
function getWatchlist() {
  // Try to load watchlist from localStorage
  const saved = localStorage.getItem('afterhours-watchlist');
  // If something is saved, parse it; otherwise return empty array
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

// Save watchlist array to localStorage
function saveWatchlist(list) {
  localStorage.setItem('afterhours-watchlist', JSON.stringify(list));
}

// Our watchlist array (holds movie IDs)
let watchlist = getWatchlist();

// ============================================================
// 4. RENDER MOVIE CARDS
//    This function takes an array of movies and a container
//    element, then creates HTML cards for each movie.
// ============================================================
function renderMovies(movieArray, container, showTrendingBadge) {
  // Clear any existing content
  container.innerHTML = '';

  // Loop through each movie and create a card
  movieArray.forEach(function(movie) {
    // Check if this movie is in the watchlist
    const isInWatchlist = watchlist.includes(movie.id);

    // Build the card HTML
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      ${(showTrendingBadge && movie.trending) ? '<span class="trending-badge">🔥 Trending</span>' : ''}
      <div class="card-poster-wrap">
        <img
          class="card-poster"
          src="${movie.poster}"
          alt="${movie.title} poster"
          loading="lazy"
          onerror="this.src='https://via.placeholder.com/300x450/1e1e1e/666?text=No+Poster'"
        >
      </div>
      <div class="card-body">
        <h3 class="card-title">${movie.title}</h3>
        <div class="card-meta">
          <span>${movie.year}</span>
          <span>•</span>
          <span>${movie.genre}</span>
          <span>•</span>
          <span class="card-rating">⭐ ${movie.rating}</span>
        </div>
        <div class="card-actions">
          <button class="card-btn btn-details" data-id="${movie.id}">Details</button>
          <button class="card-btn btn-add ${isInWatchlist ? 'added' : ''}" data-id="${movie.id}">
            ${isInWatchlist ? '✓ Added' : '+ My List'}
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ============================================================
// 5. DISPLAY MOVIES – Main function to show all movies
// ============================================================
function displayAllMovies() {
  renderMovies(movies, movieGrid, true);
}

// ============================================================
// 6. DISPLAY TRENDING – Show only trending movies
// ============================================================
function displayTrending() {
  // Filter movies where trending is true
  const trendingMovies = movies.filter(function(movie) {
    return movie.trending === true;
  });
  renderMovies(trendingMovies, trendingGrid, true);
}

// ============================================================
// 7. DISPLAY WATCHLIST – Show saved movies
// ============================================================
function displayWatchlist() {
  // Find movies whose IDs are in the watchlist array
  const watchlistMovies = movies.filter(function(movie) {
    return watchlist.includes(movie.id);
  });

  // Show or hide the empty state message
  if (watchlistMovies.length === 0) {
    watchlistGrid.innerHTML = '';
    watchlistEmpty.style.display = 'block';
  } else {
    watchlistEmpty.style.display = 'none';
    renderMovies(watchlistMovies, watchlistGrid, false);
  }

  // Update the watchlist counter in the navbar
  watchlistCount.innerText = watchlist.length;
}

// ============================================================
// 8. FILTER BY GENRE – Show movies of a specific genre
// ============================================================
function filterByGenre(genre) {
  // "all" means show every movie
  if (genre === 'all') {
    renderMovies(movies, movieGrid, true);
  } else {
    // Filter movies that match the selected genre
    const filtered = movies.filter(function(movie) {
      return movie.genre === genre;
    });
    renderMovies(filtered, movieGrid, true);
  }

  // Clear search
  searchInput.value = '';
  searchInfo.style.display = 'none';

  // Show or hide the empty state
  checkEmptyState();
}

// ============================================================
// 9. SEARCH MOVIES – Filter by title as the user types
// ============================================================
function searchMovies(query) {
  // Convert to lowercase so search is not case-sensitive
  const lowerQuery = query.toLowerCase().trim();

  if (lowerQuery === '') {
    // If the search box is empty, show all movies
    displayAllMovies();
    searchInfo.style.display = 'none';
    emptyState.style.display = 'none';
    // Reset the active genre filter to "All"
    setActiveFilter('all');
    return;
  }

  // Filter movies whose title includes the search text
  const results = movies.filter(function(movie) {
    return movie.title.toLowerCase().includes(lowerQuery);
  });

  renderMovies(results, movieGrid, true);

  // Show search info
  searchInfo.style.display = 'block';
  searchInfo.innerHTML = `Showing <strong>${results.length}</strong> result${results.length !== 1 ? 's' : ''} for "<strong>${query}</strong>"`;

  // Reset genre filter highlight
  setActiveFilter(null);

  // Show or hide the empty state
  checkEmptyState();
}

// ============================================================
// 10. CHECK EMPTY STATE – Show a message if no movies visible
// ============================================================
function checkEmptyState() {
  const cards = movieGrid.querySelectorAll('.movie-card');
  if (cards.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
}

// ============================================================
// 11. SET ACTIVE FILTER – Highlight the selected genre button
// ============================================================
function setActiveFilter(genre) {
  const buttons = genreFilters.querySelectorAll('.filter-btn');
  buttons.forEach(function(btn) {
    btn.classList.remove('active');
    if (btn.dataset.genre === genre) {
      btn.classList.add('active');
    }
  });
}

// ============================================================
// 12. TOGGLE WATCHLIST – Add or remove a movie
// ============================================================
function toggleWatchlist(movieId) {
  // Check if the movie is already in the watchlist
  if (watchlist.includes(movieId)) {
    // Remove it: create a new array without this ID
    watchlist = watchlist.filter(function(id) {
      return id !== movieId;
    });
  } else {
    // Add it
    watchlist.push(movieId);
  }

  // Save updated watchlist to localStorage
  saveWatchlist(watchlist);

  // Re-render everything to update button states
  refreshAllViews();
}

// ============================================================
// 13. REFRESH ALL VIEWS – Update all movie grids and counters
// ============================================================
function refreshAllViews() {
  // Rerender the current movie grid (keeping search/filter)
  const activeFilter = document.querySelector('.filter-btn.active');
  const currentSearch = searchInput.value.trim();

  if (currentSearch !== '') {
    searchMovies(currentSearch);
  } else if (activeFilter) {
    filterByGenre(activeFilter.dataset.genre);
  } else {
    displayAllMovies();
  }

  displayTrending();
  displayWatchlist();
}

// ============================================================
// 14. OPEN MOVIE DETAILS – Show the modal popup
// ============================================================
function openMovieDetails(movieId) {
  // Find the movie by its ID
  const movie = movies.find(function(m) {
    return m.id === movieId;
  });

  if (!movie) return;

  // Fill the modal with movie data
  modalPoster.src     = movie.poster;
  modalPoster.alt     = movie.title + ' poster';
  modalTitle.innerText  = movie.title;
  modalYear.innerText   = '📅 ' + movie.year;
  modalGenre.innerText  = '🎭 ' + movie.genre;
  modalRating.innerText = '⭐ ' + movie.rating;
  modalDesc.innerText   = movie.description;

  // Update watchlist button in modal
  const isInWatchlist = watchlist.includes(movie.id);
  modalWatchlistBtn.innerText = isInWatchlist ? '✓ In My List' : '+ My List';
  modalWatchlistBtn.className = 'btn btn-primary modal-watchlist-btn' + (isInWatchlist ? ' added' : '');

  // Store movie ID on the button for the click handler
  modalWatchlistBtn.dataset.id = movie.id;

  // Show the modal
  modalOverlay.classList.add('active');

  // Prevent background scrolling
  document.body.style.overflow = 'hidden';
}

// ============================================================
// 15. CLOSE MOVIE DETAILS – Hide the modal popup
// ============================================================
function closeMovieDetails() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================================
// 16. SURPRISE ME – Pick a random movie and show its details
// ============================================================
function surpriseMe() {
  // Generate a random index from 0 to movies.length - 1
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  openMovieDetails(randomMovie.id);
}

// ============================================================
// 17. THEME TOGGLE – Switch between dark and light mode
// ============================================================
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');

  if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('afterhours-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('afterhours-theme', 'dark');
  }

  updateThemeIcon();
}

// Update the sun/moon icon based on current theme
function updateThemeIcon() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const moonIcon = themeToggle.querySelector('.icon-moon');
  const sunIcon  = themeToggle.querySelector('.icon-sun');

  if (currentTheme === 'light') {
    moonIcon.style.display = 'none';
    sunIcon.style.display  = 'block';
  } else {
    moonIcon.style.display = 'block';
    sunIcon.style.display  = 'none';
  }
}

// Load saved theme from localStorage
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('afterhours-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  updateThemeIcon();
}

// ============================================================
// 18. WELCOME MESSAGE – Show a greeting based on time of day
// ============================================================
function showWelcomeMessage() {
  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good morning! ☀️";
  } else if (hour < 17) {
    greeting = "Good afternoon! 🌤️";
  } else if (hour < 21) {
    greeting = "Good evening! 🌅";
  } else {
    greeting = "Late night binge? 🌙";
  }

  welcomeText.innerText = greeting + " Welcome to AfterHours — your next binge starts here.";
}

// ============================================================
// 19. LOADER – Hide the loading screen after page is ready
// ============================================================
function hideLoader() {
  setTimeout(function() {
    loader.classList.add('hidden');
  }, 1800);
}

// ============================================================
// 20. EVENT LISTENERS – Connecting buttons to functions
// ============================================================

// --- Genre filter buttons ---
genreFilters.addEventListener('click', function(event) {
  // Check if the clicked element is a filter button
  if (event.target.classList.contains('filter-btn')) {
    const genre = event.target.dataset.genre;
    setActiveFilter(genre);
    filterByGenre(genre);
  }
});

// --- Movie grid clicks (Details + Watchlist buttons) ---
// We use "event delegation": one listener on the parent grid
// that checks which button was clicked.
function handleCardClick(event) {
  const target = event.target;

  // If "Details" button clicked
  if (target.classList.contains('btn-details')) {
    const movieId = parseInt(target.dataset.id);
    openMovieDetails(movieId);
  }

  // If "Add to watchlist" button clicked
  if (target.classList.contains('btn-add')) {
    const movieId = parseInt(target.dataset.id);
    toggleWatchlist(movieId);
  }
}

movieGrid.addEventListener('click', handleCardClick);
trendingGrid.addEventListener('click', handleCardClick);
watchlistGrid.addEventListener('click', handleCardClick);

// --- Search toggle (expand/collapse search bar) ---
searchToggle.addEventListener('click', function() {
  searchBox.classList.toggle('open');
  if (searchBox.classList.contains('open')) {
    searchInput.focus();
  } else {
    searchInput.value = '';
    searchMovies('');
  }
});

// --- Search input (live search as user types) ---
searchInput.addEventListener('input', function() {
  searchMovies(searchInput.value);
});

// --- Surprise Me button ---
surpriseBtn.addEventListener('click', surpriseMe);

// --- Theme toggle ---
themeToggle.addEventListener('click', toggleTheme);

// --- Modal close button ---
modalClose.addEventListener('click', closeMovieDetails);

// --- Close modal when clicking outside of it ---
modalOverlay.addEventListener('click', function(event) {
  if (event.target === modalOverlay) {
    closeMovieDetails();
  }
});

// --- Close modal with Escape key ---
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeMovieDetails();
  }
});

// --- Modal watchlist button ---
modalWatchlistBtn.addEventListener('click', function() {
  const movieId = parseInt(modalWatchlistBtn.dataset.id);
  toggleWatchlist(movieId);

  // Update the modal button text immediately
  const isNowInList = watchlist.includes(movieId);
  modalWatchlistBtn.innerText = isNowInList ? '✓ In My List' : '+ My List';
  modalWatchlistBtn.className = 'btn btn-primary modal-watchlist-btn' + (isNowInList ? ' added' : '');
});

// --- Hamburger menu (mobile navigation toggle) ---
hamburger.addEventListener('click', function() {
  navLinks.classList.toggle('open');
});

// --- Close mobile menu when a nav link is clicked ---
navLinks.addEventListener('click', function(event) {
  if (event.target.tagName === 'A') {
    navLinks.classList.remove('open');
  }
});

// --- Watchlist nav button (scroll to watchlist section) ---
navWatchlistBtn.addEventListener('click', function() {
  document.getElementById('watchlist-section').scrollIntoView({ behavior: 'smooth' });
});

// --- Navbar background changes on scroll ---
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.borderBottomColor = 'var(--border)';
  } else {
    navbar.style.borderBottomColor = 'transparent';
  }
});

// ============================================================
// 21. INITIALISE – Run everything when the page loads
// ============================================================
function init() {
  loadSavedTheme();
  showWelcomeMessage();
  displayAllMovies();
  displayTrending();
  displayWatchlist();
  hideLoader();
}

// Start the app!
init();
