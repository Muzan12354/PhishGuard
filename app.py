from flask import Flask, render_template

app = Flask(__name__)

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
@app.route('/Dashboard')
def Dashboard():
    return render_template('Dashboard.html')


# Report page
@app.route('/report')
def report():
    return render_template('report.html')

# Start application
if __name__ == '__main__':
    app.run(debug=True)