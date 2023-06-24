/* Check if the document is ready*/
$(document).ready(function() {
  /* Detect input and change tweet color if necessary */
  $('#tweet-text').on('input', updateCounter);
});

/* Function to change the counter for tweets and update color if limit is exceeded */
const updateCounter = function(){
  const tweetLength = 140; // Character Limit
  const fieldValue = $(this).val();
  const tweetCounter = $(this).next().children('output.counter');

  /* Update the field */
  tweetCounter.text(tweetLength - fieldValue.length);
  tweetCounter.toggleClass("setErrorColor", tweetLength - fieldValue.length < 0) //toggle coloring if error exists
};