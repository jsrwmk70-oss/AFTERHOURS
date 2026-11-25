# AfterHours – Evaluation & Viva Notes

## 1. Project Introduction

**AfterHours** is a Netflix-inspired streaming website built entirely with HTML5, CSS3 and Vanilla JavaScript. It is a frontend-only project that simulates a modern movie browsing experience with features like genre filtering, live search, a personal watchlist with localStorage, movie detail popups, a "Surprise Me" random pick, and a dark/light theme toggle.

**Tagline:** *"Your next binge starts here."*

---

## 2. Project Objective

- Design a visually impressive, professional-looking streaming UI.
- Demonstrate practical knowledge of HTML5 semantic structure, CSS3 styling & animations, and JavaScript DOM manipulation.
- Implement real, working features (not just a static mockup).
- Write clean, readable, beginner-friendly code that can be explained line by line.

---

## 3. Technologies Used and Why

| Technology | Why We Used It |
|---|---|
| **HTML5** | Provides the semantic structure of the webpage. Tags like `<nav>`, `<header>`, `<section>`, and `<footer>` make the page meaningful and accessible. |
| **CSS3** | Handles all visual styling — colours, layouts, fonts, animations, responsive design. CSS custom properties (variables) make theming easy. |
| **Vanilla JavaScript** | Adds interactivity — rendering movie cards dynamically, filtering, searching, managing the watchlist, toggling themes, and handling popups. No frameworks needed. |
| **Google Fonts (Inter)** | A modern, clean sans-serif font loaded via a `<link>` tag for professional typography. |
| **localStorage** | A browser API that lets us save the watchlist data even after the page is refreshed, without needing a database. |

**Why no frameworks?**  
Frameworks like React add complexity. For a college project, plain HTML/CSS/JS shows a solid understanding of the fundamentals.

---

## 4. HTML Structure Explained

The HTML file (`index.html`) is organised into clearly labelled sections:

```
<!DOCTYPE html>          → Tells the browser this is an HTML5 document
<html data-theme="dark"> → Root element with a data attribute for theme switching
<head>                   → Contains metadata, fonts, and CSS link
<body>                   → Visible content of the page
```

### Key Sections:

| Section | Tag | Purpose |
|---|---|---|
| Loader | `<div id="loader">` | Shows a branded loading animation on page load |
| Navbar | `<nav>` | Fixed navigation with logo, links, search, watchlist counter, and theme toggle |
| Hero | `<header>` | Full-screen cinematic banner with title, description, and CTA buttons |
| Welcome | `<section>` | Displays a time-of-day greeting |
| Trending | `<section id="trending">` | Shows movies marked as "trending" |
| Movies | `<section id="movies">` | Main movie grid with genre filter buttons |
| Watchlist | `<section id="watchlist-section">` | Displays user's saved movies |
| Modal | `<div class="modal-overlay">` | Popup overlay for movie details |
| Footer | `<footer>` | Branding, links, and project disclaimer |

### Important HTML Concepts Used:
- **Semantic tags**: `<nav>`, `<header>`, `<section>`, `<footer>` — give meaning to the structure.
- **Data attributes**: `data-genre="Action"`, `data-id="1"` — store custom data on elements that JavaScript can read.
- **SVG icons**: Inline SVGs instead of icon libraries — no external dependencies.
- **`loading="lazy"`**: On images — tells the browser to load images only when they scroll into view, improving performance.

---

## 5. Important CSS Properties Explained

### CSS Custom Properties (Variables)
```css
:root {
  --bg-primary: #0d0d0d;
  --accent: #e50914;
}
```
These define reusable colour values. Changing `--accent` in one place updates it everywhere.

### Theme Switching with `[data-theme]`
```css
[data-theme="light"] {
  --bg-primary: #f5f5f5;
}
```
When JavaScript changes `data-theme` on `<html>`, all CSS variables update automatically — the entire page re-themes.

### Flexbox
```css
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```
Flexbox arranges items in a row (or column) with control over alignment and spacing. Used in the navbar, card buttons, and modal layout.

### CSS Grid
```css
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}
```
Grid creates a responsive movie layout. `auto-fill` with `minmax()` automatically adjusts the number of columns based on screen width.

### Transitions & Hover Effects
```css
.movie-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 30px var(--shadow);
}
```
`transition` makes property changes smooth. `transform` moves/scales the card. `box-shadow` adds depth.

### Position Fixed (Navbar)
```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
```
Keeps the navbar visible at all times while scrolling. `z-index` ensures it stays on top.

### Responsive Design with Media Queries
```css
@media (max-width: 768px) {
  .hamburger { display: flex; }
  .nav-links { ... mobile styles ... }
}
```
Media queries apply different styles at different screen widths. We have breakpoints at 900px, 768px, and 480px.

### Backdrop Filter (Glassmorphism)
```css
backdrop-filter: blur(12px);
```
Creates a frosted glass effect on the navbar and buttons.

---

## 6. JavaScript Functions Explained

### `getWatchlist()` and `saveWatchlist(list)`
Load and save the watchlist array from/to localStorage. `JSON.parse()` converts the stored string back to an array; `JSON.stringify()` converts the array to a string for storage.

### `renderMovies(movieArray, container, showTrendingBadge)`
Takes an array of movie objects, loops through them with `forEach()`, and creates an HTML card for each one. This is the core rendering function.

### `displayAllMovies()`
Calls `renderMovies()` with the full `movies` array to show all movies.

### `displayTrending()`
Uses `filter()` to get only movies where `trending === true`, then renders them in the trending section.

### `displayWatchlist()`
Uses `filter()` to find movies whose IDs are in the `watchlist` array. Shows an empty-state message if the list is empty. Updates the counter badge.

### `filterByGenre(genre)`
Uses `filter()` to show only movies matching the selected genre. If `genre` is `"all"`, shows everything.

### `searchMovies(query)`
Converts both the query and movie titles to lowercase (using `toLowerCase()`), then uses `filter()` and `includes()` to find matches. Updates the UI with result count and shows an empty state if nothing matches.

### `toggleWatchlist(movieId)`
Checks if the movie ID is already in the array using `includes()`. If yes, removes it with `filter()`; if no, adds it with `push()`. Then saves to localStorage and refreshes the display.

### `openMovieDetails(movieId)` and `closeMovieDetails()`
`find()` locates the movie by ID. The function fills the modal elements with movie data and shows the overlay. Close removes the active class and restores scrolling.

### `surpriseMe()`
Uses `Math.random()` and `Math.floor()` to pick a random index, then opens that movie's details.

### `toggleTheme()`
Reads the current `data-theme` attribute, toggles it between `"dark"` and `"light"`, saves the choice to localStorage, and updates the icon.

### `showWelcomeMessage()`
Gets the current hour with `new Date().getHours()` and uses `if/else` to pick an appropriate greeting.

### `hideLoader()`
Uses `setTimeout()` to add a CSS class after 1.8 seconds that fades out the loader.

### `init()`
The main initialisation function. Calls all the setup functions in order when the page loads.

---

## 7. Arrays and Objects Used

### Movie Array
```javascript
const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    trending: true,
    poster: "https://...",
    description: "A thief who..."
  },
  // ... more movies
];
```
Each movie is an **object** with key-value pairs. The full list is an **array of objects**. This makes it easy to loop through, filter, and find specific movies.

### Watchlist Array
```javascript
let watchlist = [1, 5, 10]; // Array of movie IDs
```
A simple array of numbers. We use `includes()` to check membership, `push()` to add, and `filter()` to remove.

---

## 8. DOM Manipulation Explained

**DOM** = Document Object Model. It's the browser's representation of the HTML page as a tree of objects.

### Getting Elements
```javascript
const movieGrid = document.getElementById('movieGrid');
const buttons = document.querySelectorAll('.filter-btn');
```

### Changing Content
```javascript
element.innerHTML = '<h1>Hello</h1>';   // Sets HTML content
element.innerText = 'Hello';             // Sets text only
```

### Creating Elements
```javascript
const card = document.createElement('div');
card.className = 'movie-card';
container.appendChild(card);
```

### Adding/Removing CSS Classes
```javascript
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('open');
```

### Changing Attributes
```javascript
document.documentElement.setAttribute('data-theme', 'light');
```

---

## 9. localStorage Explained

localStorage is a browser feature that stores key-value pairs as strings. Data persists even after closing the browser.

```javascript
// Save data
localStorage.setItem('key', 'value');

// Read data
const value = localStorage.getItem('key');

// Remove data
localStorage.removeItem('key');
```

Since localStorage only stores strings, we use:
- `JSON.stringify(array)` → Converts an array/object to a string for storage.
- `JSON.parse(string)` → Converts the string back to an array/object for use.

**In our project:** The watchlist (an array of movie IDs) and the selected theme are saved to localStorage so they survive page refreshes.

---

## 10. Search and Filtering Logic

### Search (live as you type)
```javascript
searchInput.addEventListener('input', function() {
  searchMovies(searchInput.value);
});
```
Every keystroke triggers `searchMovies()`. It converts both the query and titles to lowercase, then uses `filter()` + `includes()` to find matches.

### Genre Filtering
```javascript
genreFilters.addEventListener('click', function(event) {
  if (event.target.classList.contains('filter-btn')) {
    filterByGenre(event.target.dataset.genre);
  }
});
```
We use **event delegation** — one listener on the parent container instead of one on each button. We read the `data-genre` attribute to know which genre was clicked.

---

## 11. Responsive Design Explained

Responsive design means the layout adjusts to different screen sizes.

### Techniques Used:
1. **CSS Grid with `auto-fill`**: The movie grid automatically reduces columns on smaller screens.
2. **Media queries**: `@media (max-width: 768px)` applies mobile-specific styles.
3. **Flexbox wrapping**: `flex-wrap: wrap` lets items flow to the next row.
4. **Relative units**: `%`, `vw`, `vh`, `rem` instead of fixed `px` values.
5. **Hamburger menu**: Navigation links collapse into a toggleable menu on mobile.

### Our Breakpoints:
- **900px**: Tablet adjustments (smaller hero text, modal layout change)
- **768px**: Mobile nav (hamburger menu), smaller grid
- **480px**: Small phones (stacked buttons, tighter spacing)

---

## 12. Viva Questions and Answers (25+)

### HTML Questions

**Q1: What is the purpose of `<!DOCTYPE html>`?**  
It tells the browser to use HTML5 standards mode for rendering the page correctly.

**Q2: What are semantic HTML tags? Give examples from your project.**  
Semantic tags describe their content's meaning. Examples: `<nav>` (navigation), `<header>` (hero banner), `<section>` (content sections), `<footer>` (bottom info).

**Q3: What is the `data-` attribute and how did you use it?**  
Custom attributes that store extra data on HTML elements. I used `data-genre="Action"` on filter buttons and `data-id="1"` on movie buttons so JavaScript can read which genre or movie was clicked.

**Q4: What does `loading="lazy"` do on images?**  
It defers loading of off-screen images until the user scrolls near them, improving initial page load performance.

**Q5: Why did you use inline SVGs instead of an icon library?**  
To avoid external dependencies. SVGs are lightweight, scalable, and can be styled with CSS.

### CSS Questions

**Q6: What are CSS custom properties (variables)?**  
Variables defined with `--name: value` in `:root` and used with `var(--name)`. They allow us to change colours in one place and have it update everywhere.

**Q7: How does your theme switching work in CSS?**  
I defined two sets of CSS variables — one under `:root` (dark) and one under `[data-theme="light"]`. JavaScript toggles the `data-theme` attribute, and CSS automatically uses the correct variables.

**Q8: Explain the difference between Flexbox and Grid.**  
Flexbox is one-dimensional (row OR column). Grid is two-dimensional (rows AND columns). I used Flexbox for the navbar and buttons, Grid for the movie card layout.

**Q9: What does `position: fixed` do?**  
It positions an element relative to the browser viewport, so it stays in place even when the user scrolls. Used for the navbar.

**Q10: What is `z-index` and why is it important?**  
It controls the stacking order of overlapping elements. Higher values appear on top. The modal has `z-index: 2000` to appear above everything, the navbar has `z-index: 1000`.

**Q11: What is a media query?**  
A CSS rule that applies styles only when certain conditions are met, like `@media (max-width: 768px)`. It's the foundation of responsive design.

**Q12: What does `backdrop-filter: blur()` do?**  
It applies a blur effect to the area behind an element, creating a frosted glass look. Used on the navbar for a modern aesthetic.

### JavaScript Questions

**Q13: What is the difference between `let`, `const`, and `var`?**  
`const` cannot be reassigned (used for things that don't change, like DOM references). `let` can be reassigned (like the watchlist array). `var` is older and has function scope; we prefer `const`/`let` which have block scope.

**Q14: How does `forEach()` work?**  
It loops through every item in an array and runs a function for each one. Example: `movies.forEach(function(movie) { ... })` runs the code inside `{}` once per movie.

**Q15: How does `filter()` work?**  
It creates a new array with only the items that pass a test. Example: `movies.filter(function(m) { return m.genre === 'Action'; })` returns only action movies.

**Q16: How does `find()` work?**  
Like `filter()` but returns the first matching item, not an array. Example: `movies.find(function(m) { return m.id === 5; })` returns the movie with ID 5.

**Q17: How does `includes()` work?**  
Checks if an array contains a value, or if a string contains a substring. Returns `true` or `false`. Example: `watchlist.includes(3)` → true if movie ID 3 is saved.

**Q18: What is event delegation and why did you use it?**  
Instead of adding a listener to every button, I added one listener to the parent grid. When any button inside is clicked, the event "bubbles up" to the parent, where I check which button was clicked using `event.target`. It's more efficient and works for dynamically created elements.

**Q19: What is `localStorage` and how is it different from a database?**  
localStorage is a simple key-value store in the browser. It only stores strings, has ~5MB limit, and is accessible only on the same device/browser. A database is server-side, can store complex data, and is accessible from anywhere.

**Q20: How does `JSON.stringify()` differ from `JSON.parse()`?**  
`stringify()` converts a JavaScript object/array to a JSON string (for storage). `parse()` converts a JSON string back to a JavaScript object/array (for use in code).

**Q21: How does your search feature work?**  
The search input has an `input` event listener. Every keystroke calls `searchMovies()` which converts the query to lowercase, filters the movies array using `includes()`, and re-renders the grid with matching results.

**Q22: How does `Math.random()` work in your Surprise Me feature?**  
`Math.random()` returns a decimal between 0 and 1. Multiplying by `movies.length` and using `Math.floor()` gives a random whole number (index), which we use to pick a random movie.

**Q23: What is `classList.toggle()` and how is it different from `add()` and `remove()`?**  
`toggle()` adds the class if it's missing, or removes it if it's present. `add()` only adds, `remove()` only removes. I used `toggle('open')` for the hamburger menu.

**Q24: What is the purpose of `event.preventDefault()`?**  
It stops the browser's default action (like following a link or submitting a form). Although I didn't use it heavily in this project, it's important for form handling.

**Q25: What does `document.createElement()` do?**  
It creates a new HTML element in memory. I used it to create movie card `<div>` elements, set their content with `innerHTML`, then added them to the page with `appendChild()`.

### Project-Level Questions

**Q26: Why didn't you use React or Bootstrap?**  
The project requirement was HTML, CSS and JavaScript only. Using fundamentals shows deeper understanding. Frameworks add complexity and hide how things actually work.

**Q27: How would you add a backend to this project?**  
I would use Node.js with Express to create a REST API, store movies in a database like MongoDB, and fetch data using `fetch()` instead of a hardcoded array.

**Q28: What improvements would you make with more time?**  
Add user authentication, a real movie API (TMDB), video trailers, animated page transitions, and a "continue watching" feature.

---

## 13. 2-Minute Project Presentation Script

> *"Good morning/afternoon, I'm [Your Name] and my project is called **AfterHours** — a Netflix-inspired streaming website.*
> 
> *AfterHours is a fully functional movie browsing platform built with HTML5, CSS3 and Vanilla JavaScript. No frameworks, no libraries — just clean, fundamental web technologies.*
>
> *Let me walk you through the main features:*
>
> *First, the **hero section** — a cinematic full-screen banner with a gradient overlay and call-to-action buttons. The **Explore Movies** button scrolls to the movie collection, and **Surprise Me** randomly picks a movie for you.*
>
> *In the **Browse Movies** section, you can filter by genre — All, Action, Sci-Fi, Drama, Thriller, or Comedy. The filter uses JavaScript's `filter()` method on an array of movie objects. There's also a **live search** that filters movies as you type, using the `input` event listener and `includes()` for string matching.*
>
> *Each movie card shows the poster, title, year, genre, and an IMDb-style rating. Clicking **Details** opens a **modal popup** with full movie information. Clicking **+ My List** adds the movie to your **personal watchlist**, which is saved in `localStorage` so it persists after refresh.*
>
> *The site also features a **dark/light theme toggle** that uses CSS custom properties and the `data-theme` attribute, plus a **responsive design** that works on laptops, tablets, and phones using CSS Grid and media queries.*
>
> *Key JavaScript concepts used: arrays, objects, `forEach`, `filter`, `find`, `includes`, event delegation, DOM manipulation, and localStorage. All code is well-commented and organised into single-purpose functions.*
>
> *Thank you. I'm happy to demonstrate any feature or answer questions."*

---

## 14. Possible Live Coding Modifications

Here are changes a professor might ask you to make, with how to do them:

### "Add a new movie to the list"
Add a new object to the `movies` array in `script.js`:
```javascript
{
  id: 19,
  title: "Spider-Man: No Way Home",
  year: 2021,
  genre: "Action",
  rating: 8.2,
  trending: true,
  poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  description: "Peter Parker's secret identity is revealed..."
}
```

### "Change the accent colour from red to blue"
In `style.css`, change the `--accent` variable:
```css
--accent: #2563eb;      /* Change from #e50914 to blue */
--accent-hover: #3b82f6;
```

### "Add a new genre filter (e.g., Horror)"
1. Add a button in `index.html` inside `#genreFilters`:
```html
<button class="filter-btn" data-genre="Horror">Horror</button>
```
2. Add movies with `genre: "Horror"` in the array.

### "Make the hero title say something different"
In `index.html`, find the `<h1 class="hero-title">` and change the text.

### "Show the total number of movies somewhere"
Add this line in `init()`:
```javascript
document.getElementById('someElement').innerText = 'Total Movies: ' + movies.length;
```

### "Change the grid to show 3 columns always"
In `style.css`, change:
```css
grid-template-columns: repeat(3, 1fr);
```

### "Sort movies by rating"
Add before `renderMovies()`:
```javascript
const sorted = movies.slice().sort(function(a, b) {
  return b.rating - a.rating;
});
```

### "Add a 'Clear Watchlist' button"
Add a button in HTML, then in JS:
```javascript
clearBtn.addEventListener('click', function() {
  watchlist = [];
  saveWatchlist(watchlist);
  refreshAllViews();
});
```

---

> **Tip:** Before your viva, make sure you can open the browser console (F12 → Console) and type simple commands like `movies.length`, `watchlist`, and `localStorage.getItem('afterhours-watchlist')` to show your understanding.

Good luck with your evaluation! 🎬
