$(document).ready(function() {
  /* Setup objects used for ease of use and clarity */
  const backToTop = $("#back-to-top");
  const newTweetButton = $("#new-tweet-button");  
  const tweetArea = $("#new-tweet-container");

  /* Set initial states to hide the things we dont want to see*/
  tweetArea.hide();
  backToTop.hide();

  /* Add an on click handler to dispay the tweet field if clicked */
  newTweetButton.on("click", () => {
    tweetArea.css("visibility", "visible"); // make sure tweetAreas visibility property is set to visible
    tweetArea.slideToggle("slow");
  });
    
  /* Check if scroll to top button has been clicked, if so go back to top*/
  backToTop.on("click", () => {
    tweetArea.slideDown("slow");
    $(window).scrollTop(0);
  });

  /* Check if a user has scrolled and display a button to scroll back to top*/
  $(document).on("scroll", () => {
    let checkIfScrolled = $(window).scrollTop() < 25;
    backToTop.css("visibility", "visible");
    newTweetButton.toggle(checkIfScrolled);
    backToTop.toggle(!checkIfScrolled);
  });
});