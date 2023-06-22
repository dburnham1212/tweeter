$(document).ready(function() {

  /* Function to change the counter for tweets and update color if limit is exceeded */
  $('#tweet-text').on('input', function() {
    const tweetLength = 140; // Character Limit
    const counterValue = $(this).val();
    const tweetCounter = $(this).next().children('output.counter');
    tweetCounter.text(tweetLength - counterValue.length);
    if (tweetLength - counterValue.length < 0) {
      tweetCounter.css('color', 'red');
    } else {
      tweetCounter.css('color', '#545149');
    }
  });

});