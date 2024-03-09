/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener("DOMContentLoaded", function () {
  fetch("/logData")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((scoreData) => {
      if (scoreData) {
        // Add a gameNumber property to each score object
        scoreData.forEach(function (score, index) {
          score.gameNumber = index + 1;
        });

        // Sort the scores in descending order based on the score
        scoreData.sort(function (a, b) {
          return b.score - a.score;
        });

        // Get the list element
        var scoreList = document.querySelector(".scorelist");

        // Iterate through all scores and update the HTML
        for (var i = 0; i < scoreData.length; i++) {
          var listItem = scoreList.children[i];
          if (listItem) {
            // Update the HTML to include the game number and score
            listItem.textContent =
              "Game " + scoreData[i].gameNumber + ": " + scoreData[i].score;
          }
        }
      }
    })
    .catch((error) => console.error("Error:", error));
});
