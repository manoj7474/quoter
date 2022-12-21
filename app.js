const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//loading animation
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function loadHide(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// getting quotes from api
let apiQuotes = [];

// funtion to load new quote
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
   if(!quote.author){
    quoteAuthor.textContent = 'Unknown'
   }else{quoteAuthor.textContent = quote.author;}
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote')
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    loadHide();
}

async function getQuote(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
         newQuote();
        //console.log(apiQuotes[299]);
        
    } catch (error) {
        alert('error');
        
    }
} 

//twitter btn funtionality
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ~ ${quoteAuthor.textContent}`
    window.open(twitterUrl, '_blank');
}

//event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);



getQuote();
