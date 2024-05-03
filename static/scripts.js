document.addEventListener('DOMContentLoaded', function() {
    const tweetForm = document.getElementById('tweetForm');
    
    tweetForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const tweet = document.getElementById('tweetInput').value; // Get the value of the tweet text area
        if (!tweet) {
            alert('Please enter some text to tweet.');
            return;
        }

        // Send the tweet content to the server
        fetch('/submit_tweet', { // Make sure to align this URL with your server-side route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tweet: tweet }) // Convert the tweet object to a JSON string
        })
        .then(response => response.json()) // Parse JSON response from the server
        .then(data => {
            if (data.success) {
                // Optionally update the UI with new recommendations or confirmation
                alert('Tweet successfully submitted!');
                updateRecommendations(data.recommendations); // Update the recommendations based on the server's response
            } else {
                alert(data.message || 'Failed to submit tweet.');
            }
        })
        .catch(error => {
            console.error('Error submitting tweet:', error);
            alert('Error submitting tweet, please try again.');
        });
    });

    function updateRecommendations(recommendations) {
        const hashtagList = document.getElementById('hashtagList');
        hashtagList.innerHTML = ''; // Clear existing recommendations

        recommendations.forEach(rec => {
            const listItem = document.createElement('li');
            listItem.textContent = rec;
            hashtagList.appendChild(listItem); // Add each new recommendation as a list item
        });
    }
});
