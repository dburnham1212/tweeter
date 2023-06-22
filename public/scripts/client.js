/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#tweets-container').empty(); // Empty the tweet container before display
  for(let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet); 
  }
}

// Function used to validate strings by converting input into a string
const escapeStr = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Function used to create a new tweet via a template
const createTweetElement = function(tweet) {
  let $tweet = $(
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
            <a href="#"><i class="fa-solid fa-flag tweet-icon"></i></a>
            <a href="#"><i class="fa-solid fa-retweet tweet-icon"></i></a>
            <a href="#"><i class="fa-solid fa-heart tweet-icon"></i></a>
          </div>
        </footer>
      </article>
      `);
  return $tweet;
}

// Post a tweet to the server
const sendPostToBackend = (text) => {
  $.ajax({
    method: "POST",
    url: "/tweets/",
    data: { text }
  }).then(() => {
    //reload the tweets with the new added tweet
    loadTweets();
  });
}

// Load all of the tweets from the server
const loadTweets = () => {
  $.ajax({
    method: "GET",
    url: "/tweets/",
  }).then((res) => {
    renderTweets(res);
  })
}



$(document).ready(function() {
  const characterLimit = 140
  
  const backToTop = $("#back-to-top");
  const tweetArea = $("#new-tweet-container");
  const newTweetButton = $("#new-tweet-button");
  const tweetErrorContainer = $("#tweet-error-container");

  tweetErrorContainer.hide();
  tweetArea.hide();
  backToTop.hide();

  /* Add an on click handler to dispay the tweet field if clicked */
  newTweetButton.on("click", event => {
    if(tweetArea.is(":visible")) {
      tweetArea.slideUp("slow");
    } else {
      tweetArea.slideDown("slow");
    }
  });

  /* Check if a user has scrolled and display a button to scroll back to top*/
  $(document).on("scroll", event => {
    console.log($(window).scrollTop())
    if($(window).scrollTop() < 25){// if we have scrolled past a certain threshold 
      newTweetButton.show();
      backToTop.hide();
    } else {
      newTweetButton.hide();
      backToTop.show();
    }
  });

  /* Check if scroll to top button has been clicked, if so go back to top*/
  backToTop.on("click", event => {
    tweetArea.slideDown("slow");
    $(window).scrollTop(0);
  });

  /* Submit the form data for a new tweet and do error handling */
  $("#tweet-submit-form").on("submit", event => {
    event.preventDefault();  
    const result = $(event.target).find("#tweet-text").val();
    tweetErrorContainer.slideUp("slow", () => {    
      if(result.length > characterLimit) { // If the tweet has too many characters
        $("#tweet-error-text").text('TOO LONG, PLEASE RESPECT OUR ARBITRARY POST LENGTH OF 140 CHARACTERS');
        tweetErrorContainer.slideDown("slow");
      } else if (result.length === 0){ // If there is no body for the tweet
        $("#tweet-error-text").text('NO TWEET BODY');
        tweetErrorContainer.slideDown("slow");
      }  else {
        // Empty and reset the fields so that you can input new values
        $(event.target).find("#tweet-text").val('');
        $(event.target).find("#counter").val(`${characterLimit}`);
        sendPostToBackend(result);
      }
    });
  });

  loadTweets();
  //renderTweets(data);// to add it to the page so we can make sure it's got all the right elements, classes, etc.
});