/* ---------------- LIVE CLOCK (genuinely real-time) ---------------- */
  function tickClock() {
    const now = new Date();
    document.getElementById('clockTime').textContent = now.toLocaleTimeString('en-IN', { hour12: false });
    document.getElementById('clockDate').textContent = now.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    }) + ' | ' + now.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ---------------- CHART 1: Threat Activity (7-day line, sample data) ---------------- */
  new Chart(document.getElementById('lineChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Phishing detections',
        data: [38, 52, 41, 67, 58, 30, 22],
        borderColor: '#4ecdc4',
        backgroundColor: 'rgba(78,205,196,0.15)',
        fill: true, tension: 0.35, pointBackgroundColor: '#4ecdc4', pointRadius: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#cdeeea' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { beginAtZero: true, ticks: { color: '#cdeeea' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });

  /* ---------------- CHART 2: Threat Types (donut, sample data) ---------------- */
  new Chart(document.getElementById('donutChart').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Phishing', 'Scam', 'Fraud', 'Suspicious URL'],
      datasets: [{
        data: [42, 26, 18, 14],
        backgroundColor: ['#4ecdc4', '#ff6b6b', '#ffb84d', '#6c5ce7'],
        borderColor: '#0a1519', borderWidth: 3
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { color: '#e8f6f4', font: { size: 11 } } } }
    }
  });

  /* ---------------- TIMELINE: sample events, timestamped relative to now ---------------- */
  const sampleEvents = [
    { offsetMin: 0,  text: 'Suspicious URL analyzed', type: 'warn' },
    { offsetMin: 15, text: 'Phishing pattern detected', type: 'warn' },
    { offsetMin: 31, text: 'Safe URL verified', type: 'safe' },
    { offsetMin: 52, text: 'Scam keyword detected', type: 'warn' },
    { offsetMin: 68, text: 'Safe URL verified', type: 'safe' },
    { offsetMin: 90, text: 'Suspicious URL analyzed', type: 'warn' }
  ];

  function renderTimeline() {
    const now = new Date();
    const panel = document.getElementById('timelinePanel');
    panel.innerHTML = sampleEvents.map(ev => {
      const t = new Date(now.getTime() - ev.offsetMin * 60000);
      const timeStr = t.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit' });
      return `<div class="t-row">
        <span class="t-time">${timeStr}</span>
        <span class="t-dot ${ev.type}"></span>
        <span>${ev.text}</span>
      </div>`;
    }).join('');
  }
  renderTimeline();
