const books = [
  "Genesis", "Exodus", "Psalms", "Proverbs", "Isaiah", "Matthew", "Mark",
  "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians",
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians",
  "2 Timothy", "Hebrews", "James", "1 Peter", "Revelation"
];

function getRandomVerseReference() {
  const book = books[Math.floor(Math.random() * books.length)];
  const chapter = Math.floor(Math.random() * 5) + 1;
  const verse = Math.floor(Math.random() * 10) + 1;
  return `${book} ${chapter}:${verse}`;
}

async function getRandomVerse() {
  const verseElement = document.getElementById("verse");
  verseElement.innerHTML = `<div class="spinner"></div>`;

  const ref = getRandomVerseReference();
  try {
    const res = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}`);
    const data = await res.json();

    if (data && data.text) {
      verseElement.innerHTML = `
        <p><strong>${data.reference}</strong></p>
        <p>${data.text}</p>
        <p><em>(${data.translation_name})</em></p>
      `;
    } else {
      verseElement.innerHTML = `<p>Could not load verse. Try again.</p>`;
    }
  } catch (err) {
    verseElement.innerHTML = `<p>Error fetching verse. Please try again later.</p>`;
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  // Optionally persist preference
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// Load saved theme
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  getRandomVerse();
};
