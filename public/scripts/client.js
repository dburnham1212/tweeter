/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for(let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet); 
  }
}

const createTweetElement = function(tweet) {
  let $tweet = $(
    `<article class = "tweet-display-container">
        <header class = "tweet-head-display">
          <div>
            <img src="${tweet.user.avatars}">
            <h3>${tweet.user.name}</h3>
          </div>
          <h3>${tweet.user.handle}</h3>
        </header>
        <div class="tweet-body-display">
            <p><b>${tweet.content.text}</b></p>
        </div>
        <footer class = "tweet-foot-display">
          <p>${tweet.created_at}</p>
          <div>
            <a href="#"><i class="fa-solid fa-flag tweet-icon"></i></a>
            <a href="#"><i class="fa-solid fa-retweet tweet-icon"></i></a>
            <a href="#"><i class="fa-solid fa-heart tweet-icon"></i></a>
          </div>
        </footer>
      </article>
      `);
  return $tweet;
}

const sendPostToBackend = (text) => {
  $.ajax({
    method: "POST",
    url: "/tweets/",
    data: { text }
  }).then(res => {

  });
}


$(document).ready(function() {
  $("#tweet-submit-form").on("submit", event => {
    event.preventDefault();  
    const result = $(event.target).find("#tweet-text").val();
    sendPostToBackend(result);
  });

  renderTweets(data);// to add it to the page so we can make sure it's got all the right elements, classes, etc.
});