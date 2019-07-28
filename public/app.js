// Grab the articles as a json

$(document).on("click", "#kotakuScrapeButton", () => {

  $("#articles").empty();

  $.getJSON("/scrape", function(articleData) {
  
    for (var i = 0; i < articleData.length; i++) {
      console.log(articleData[i].headline);
      console.log(articleData[i].summary);
      console.log(articleData[i].urlLink);
    }
  });
  location.reload();
  alert("Kotaku scrape complete!");
})

$.getJSON("/articles", (articleData) => {
  for (var i = 0; i < articleData.length; i++) {
    $("#articles").
    append('<div class="mb-4"><h3>' + articleData[i].headline + '</h3><p>' + articleData[i].summary + '</p><a class="btn btn-primary article_a" href="' + articleData[i].urlLink + '" target="blank">Read More</a><a data-id="' + articleData[i]._id + '" class="ml-4 btn btn-primary article_a" id="deleteArticle">Delete Article</a></div>');
  }
});

$(document).on("click", "#deleteArticle", function () {
  let thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId,
  }).then(() => location.reload());
});