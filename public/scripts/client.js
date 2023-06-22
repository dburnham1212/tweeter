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
  
  $("#tweet-error-container").hide();
  $("#new-tweet-container").hide();
  $("#back-to-top").hide();

  $("#new-tweet-button").on("click", event => {
    const tweetArea = $("#new-tweet-container");
    if(tweetArea.is(":visible")) {
      tweetArea.slideUp("slow");
    } else {
      tweetArea.slideDown("slow");
    }
  });

  $(document).on("scroll", event => {
    console.log($(window).scrollTop())
    if($(window).scrollTop() < 25){
      $("#new-tweet-button").show();
      $("#back-to-top").hide();
    } else {
      $("#new-tweet-button").hide();
      $("#back-to-top").show();
    }
  });

  $("#back-to-top").on("click", event => {
    const tweetArea = $("#new-tweet-container");
    tweetArea.slideDown("slow");
    $(window).scrollTop(0);
  });

  $("#tweet-submit-form").on("submit", event => {
    event.preventDefault();  
    const result = $(event.target).find("#tweet-text").val();
    $("#tweet-error-container").slideUp("slow", () => {    
      if(result.length > characterLimit) {
        $("#tweet-error-text").text('TOO LONG, PLEASE RESPECT OUR ARBITRARY POST LENGTH OF 140 CHARACTERS');
        $("#tweet-error-container").slideDown("slow");
      } else if (result.length === 0){
        $("#tweet-error-text").text('NO TWEET BODY');
        $("#tweet-error-container").slideDown("slow");
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