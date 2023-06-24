/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */
$(document).ready(function() {
  /* Define the character limit*/
  const characterLimit = 140;
  
  /* Setup objects used for ease of use and clarity */
  const $tweetErrorContainer = $("#tweet-error-container");

  /* Set initial states to hide the things we dont want to see*/
  $tweetErrorContainer.hide();

  /* Submit the form data for a new tweet and do error handling */
  $("#tweet-submit-form").on("submit", function(event) {
    event.preventDefault();
    const tweetText = $(event.target).find("#tweet-text").val();
    const $tweetErrorText = $(this).find("#tweet-error-text");
    $tweetErrorContainer.slideUp("slow", () => {
      if (tweetText.length > characterLimit) { // If the tweet has too many characters
        $tweetErrorText.text('TOO LONG, PLEASE RESPECT OUR ARBITRARY POST LENGTH OF 140 CHARACTERS');
        $tweetErrorContainer.slideDown("slow");
      } else if (tweetText.length === 0) { // If there is no body for the tweet
        $tweetErrorText.text('NO TWEET BODY');
        $tweetErrorContainer.slideDown("slow");
      }  else {
        // Empty and reset the fields so that you can input new values
        $(event.target).find("#tweet-text").val('');
        $(event.target).find("#counter").val(`${characterLimit}`);
        sendPostToBackend(tweetText);
      }
    });
  });

  // Load our tweets!
  loadTweets();
});

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const container = $('#tweets-container');
  container.empty(); // Empty the tweet container before display
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    container.prepend($tweet);
  }
};

// Function used to validate strings by converting input into a string
const escapeStr = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Function used to create a new tweet via a template
const createTweetElement = function(tweet) {
  let $tweet = $( //New tweet template
    `<article class = "tweet-display-container">
        <header class = "tweet-head-display">
          <div>
            <img src="${escapeStr(tweet.user.avatars)}">
            <h3>${escapeStr(tweet.user.name)}</h3>
          </div>
          <h3>${escapeStr(tweet.user.handle)}</h3>
        </header>
        <div class="tweet-body-display">
            <p><b>${escapeStr(tweet.content.text)}</b></p>
        </div>
        <footer class = "tweet-foot-display">
          <p>${escapeStr(timeago.format(tweet.created_at))}</p>
          <div>
            <a href="#"><i class="fa-solid fa-flag"></i></a>
            <a href="#"><i class="fa-solid fa-retweet"></i></a>
            <a href="#"><i class="fa-solid fa-heart"></i></a>
          </div>
        </footer>
      </article>
      `);
  return $tweet;
};

// Post a tweet to the server
const sendPostToBackend = (text) => {
  $.ajax({
    method: "POST",
    url: "/tweets/",
    data: { text }
  }).then(() => {//If successful reload the tweets with the new added tweet
    loadTweets();
  });
};

// Load all of the tweets from the server
const loadTweets = () => {
  $.get("/tweets/")
  .then((res) => { // If successful render all of the tweets
    renderTweets(res);
  });
};

