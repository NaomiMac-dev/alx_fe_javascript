//  Creating the quotes array
const quotes = [
    { text: "Believe in yourself!", category: "Motivation"},
    { text: "Code is like hiumor. When you have to explain it, it's bad.", category: "Tech"},
    { text: "Love is composed of a single soul inhabiting two bodies.", category: "Love"},
    { text: "Stay hungry, stay foolish!", category:"Inspiration"},
];

// Creating the showRandomQuote() function
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
    <P> "${quote.text}"</p>
    <p><em>Category: ${quote.category}</em></p>
    `;
}

// Adding Quotes Dynamically
function addQuote() {
    const newText = document.getElementById("newQuoteText").value.trim();
    const newCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (newText === "" || newCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    const newQuote = {
      text: newText,
      category: newCategory
    };
  
    quotes.push(newQuote);
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
  
    // Optionally show the new quote immediately
    showRandomQuote();
  }
  
// Hooking the function to the button using an event listener
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
