document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Send a POST request to the server with username and password
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Inform the server about the type of the content
            },
            body: JSON.stringify({ username: username, password: password })  // Convert the credentials object to a JSON string
        })
        .then(response => response.json())  // Parse JSON response from the server
        .then(data => {
            if (data.success) {
                // Redirect to the main page if login is successful
                window.location.href = '/';
            } else {
                // Display an error message if login is not successful
                alert(data.message || 'Login failed, please try again!');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('Login failed, please check your network connection and try again.');
        });
    });
});
