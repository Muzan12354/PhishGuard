// report.js
// Handles the Report Scam form submission — sends data to Flask backend
// which should insert it into database/reports.db

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reportForm');
  const successBox = document.getElementById('successBox');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // stop normal page reload / GET submission

    const name = document.getElementById('name').value.trim();
    const scamType = document.getElementById('scamType').value;
    const url = document.getElementById('url').value.trim();
    const description = document.getElementById('description').value.trim();

    // Basic validation
    if (!name || !scamType || !description) {
      alert('Please fill in your name, scam type, and description.');
      return;
    }

    // app.py reads this with request.form[...], so send as form-encoded data,
    // not JSON. Field names must match exactly: name, scam_type, url, description
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('scam_type', scamType);
    formData.append('url', url);
    formData.append('description', description);

    // Route in app.py is @app.route('/report', methods=['GET','POST'])
    fetch('/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Server responded with an error: ' + response.status);
        }
        return response.text(); // app.py returns plain text, not JSON
      })
      .then(data => {
        console.log('Server response:', data);
        successBox.classList.add('active');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        form.reset();
      })
      .catch(error => {
        console.error('Error submitting report:', error);
        alert('Something went wrong submitting your report. Please try again.');
      });
  });
});