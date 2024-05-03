from flask import Flask, render_template, request, jsonify, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace 'your_secret_key' with a real key for production

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Assuming data is sent as form data (not JSON)
        username = request.form['username']
        password = request.form['password']
        
        # Here, replace with your actual user authentication logic
        if username == 'admin' and password == 'password123':
            session['username'] = username  # Store username in session
            return redirect(url_for('index'))
        else:
            return render_template('login.html', error="Invalid credentials")
    return render_template('login.html', error=None)

@app.route('/')
def index():
    if 'username' in session:
        return render_template('index.html', username=session['username'])
    return redirect(url_for('login'))

@app.route('/submit_tweet', methods=['POST'])
def submit_tweet():
    if 'username' in session:
        data = request.get_json()  # Get JSON data sent from the client
        tweet = data.get('tweet')

        # Here you would handle the tweet, e.g., storing it, processing it, etc.
        print(f"Received tweet: {tweet}")

        # Simulate generating recommendations based on the tweet
        recommendations = ["#example", "#flask", "#python"]

        return jsonify({'success': True, 'recommendations': recommendations}), 200
    else:
        return jsonify({'success': False, 'message': 'User is not logged in.'}), 403

@app.route('/logout')
def logout():
    # Remove username from the session if present
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
