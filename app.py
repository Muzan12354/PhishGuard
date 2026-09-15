from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)


# Create database and table
def init_db():
    conn = sqlite3.connect("database/reports.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            scam_type TEXT NOT NULL,
            url TEXT,
            description TEXT NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


# Home page
@app.route('/')
def home():
    return render_template('index.html')


# Detector page
@app.route('/detector')
def detector():
    return render_template('detector.html')


# Awareness page
@app.route('/awarness')
def awarness():
    return render_template('awarness.html')


# Quiz page
@app.route('/cybercrime')
def cybercrime():
    return render_template('cybercrime.html')


# Report page
@app.route('/report', methods=['GET', 'POST'])
def report():

    if request.method == 'POST':

        name = request.form['name']
        scam_type = request.form['scam_type']
        url = request.form['url']
        description = request.form['description']

        conn = sqlite3.connect("database/reports.db")
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO reports (name, scam_type, url, description)
            VALUES (?, ?, ?, ?)
        """, (name, scam_type, url, description))

        conn.commit()
        conn.close()

        return "Report submitted successfully!"

    return render_template('report.html')


# Start application
if __name__ == '__main__':
    init_db()
    app.run(debug=True)