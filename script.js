
const quoteInput = document.getElementById('quote-text');
const authorInput = document.getElementById('quote-author');
const addButton = document.getElementById('add-quote-btn');
const quoteList = document.getElementById('quote-list');
const notifications = document.getElementById('notifications');

document.addEventListener('DOMContentLoaded', loadQuotes);
addButton.addEventListener('click', addQuote);

function addQuote() {
  const quote = quoteInput.value.trim();
  const author = authorInput.value.trim();

  if (!quote || !author) {
    alert("Both fields are required!");
    return;
  }

  const quoteObj = { text: quote, author: author };
  const uniqueKey = `quote_${Date.now()}`;

  localStorage.setItem(uniqueKey, JSON.stringify(quoteObj));
  quoteInput.value = '';
  authorInput.value = '';
  loadQuotes();
}

function loadQuotes() {
  quoteList.innerHTML = '';

  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('quote_')) {
      const quoteObj = JSON.parse(localStorage.getItem(key));

      const quoteDiv = document.createElement('div');
      quoteDiv.classList.add('quote');
      quoteDiv.innerHTML = `
        <strong>"${quoteObj.text}"</strong><br>
        — <em>${quoteObj.author}</em>
        <button class="remove-btn" data-key="${key}">Remove</button>
      `;
      quoteList.appendChild(quoteDiv);
    }
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const key = this.getAttribute('data-key');
      localStorage.removeItem(key);
      loadQuotes();
    });
  });
}

function notifyUser(message) {
  const note = document.createElement('div');
  note.className = 'notification';
  note.textContent = message;
  notifications.innerHTML = '';
  notifications.appendChild(note);
  setTimeout(() => note.remove(), 5000);
}

function syncWithServer() {
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(response => response.json())
    .then(serverQuotes => {
      serverQuotes.forEach(serverQuote => {
        const key = `quote_${serverQuote.id}`;
        const serverData = {
          text: serverQuote.title,
          author: `User ${serverQuote.userId}`
        };

        // Server always wins
        localStorage.setItem(key, JSON.stringify(serverData));
      });

      loadQuotes();
      notifyUser("Quotes synced with server and conflicts resolved.");
    })
    .catch(() => notifyUser("Failed to sync with server."));
}

// Auto sync every 30s
setInterval(syncWithServer, 30000);