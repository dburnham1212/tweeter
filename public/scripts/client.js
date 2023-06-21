/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for(let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet); 
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
          <p>${timeago.format(tweet.created_at)}</p>
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

const loadTweets = () => {
  $.ajax({
    method: "GET",
    url: "/tweets/",
  }).then(res => {
    renderTweets(res);
  })
}

$(document).ready(function() {
  $("#tweet-submit-form").on("submit", event => {
    event.preventDefault();  
    const result = $(event.target).find("#tweet-text").val();    
    if(result.length > 140) {
      alert("Character limit exceeded");
    } else {
      sendPostToBackend(result);
    }
  });

  loadTweets();
  //renderTweets(data);// to add it to the page so we can make sure it's got all the right elements, classes, etc.
});