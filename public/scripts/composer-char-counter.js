const tweetLength = 140;

$(document).ready(function() {

  /* Function to change the counter for tweets and update color if limit is exceeded */
  $('#tweet-text').on('input', function (event){
    const counterValue = $(this).val();    
    const tweetCounter = $(this).parent().children('div').children('output.counter');
    tweetCounter.text(tweetLength - counterValue.length)
    //$('#tweet-counter').text(originalCount - counterValue.length);
    if(tweetLength - counterValue.length < 0) {
      tweetCounter.css('color', 'red');
    } else {
      tweetCounter.css('color', '#545149');
    }
  });

});