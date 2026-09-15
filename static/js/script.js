 function analyzeInput() {

    const raw = document.getElementById('userInput').value.trim();
    const resultBox = document.getElementById('resultBox');

    if (!raw) {
        alert('Please paste a message, email or URL first.');
        return;
    }

    const text = raw.toLowerCase();

    let score = 0;
    const reasons = [];

    // 1. Urgency / pressure language
    const urgencyWords = [
        'urgent',
        'immediately',
        'act now',
        'act fast',
        'expire',
        'expires',
        'expiring',
        'suspend',
        'suspended',
        'limited time',
        'last chance',
        'within 24 hours',
        'verify your account',
        'action required',
        'final notice'
    ];

    if (urgencyWords.some(w => text.includes(w))) {
        score += 25;
        reasons.push('Urgent or pressuring language detected');
    }


    // 2. Requests for sensitive information
    const sensitiveWords = [
        'password',
        'ssn',
        'social security',
        'credit card',
        'card number',
        'cvv',
        'pin number',
        'bank account',
        'login credentials',
        'otp',
        'one-time password',
        'confirm your identity',
        'update your payment',
        'wire transfer'
    ];

    if (sensitiveWords.some(w => text.includes(w))) {
        score += 30;
        reasons.push('Requests sensitive or personal information');
    }


    // 3. Reward / too-good-to-be-true scam bait
    const scamWords = [
        'congratulations',
        'you have won',
        'you won',
        'winner',
        'free gift',
        'claim your prize',
        'lottery',
        'inheritance',
        'gift card',
        'click here to claim',
        'no cost',
        'risk free'
    ];

    if (scamWords.some(w => text.includes(w))) {
        score += 20;
        reasons.push('Contains reward/prize scam bait language');
    }


    // 4. Generic greeting
    if (/dear (customer|user|valued customer|member|sir\/madam)/.test(text)) {
        score += 10;
        reasons.push('Uses generic greeting instead of your name');
    }


    // 5. URL analysis
    const urlRegex =
        /(https?:\/\/[^\s]+|www\.[^\s]+|\b[a-z0-9-]+\.[a-z]{2,}(\/[^\s]*)?)/gi;

    const urls = raw.match(urlRegex) || [];

    urls.forEach(url => {

        const u = url.toLowerCase();


        // IP address instead of domain name
        if (/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(u)) {
            score += 30;
            reasons.push(
                'URL uses a raw IP address instead of a domain name'
            );
        }


        // Suspicious TLDs
        if (/\.(xyz|tk|top|club|info|gq|ml|cf|work|click|link)(\/|$)/.test(u)) {
            score += 20;
            reasons.push(
                'URL uses a domain extension commonly linked to scam sites'
            );
        }


        // No HTTPS
        if (u.startsWith('http://')) {
            score += 10;
            reasons.push('URL does not use secure HTTPS');
        }


        // Excessive hyphens
        if ((u.match(/-/g) || []).length >= 3) {
            score += 10;
            reasons.push(
                'URL contains an unusually high number of hyphens'
            );
        }


        // Brand name + altered domain
        const brands = [
            'paypal',
            'amazon',
            'apple',
            'microsoft',
            'netflix',
            'bank',
            'google',
            'facebook',
            'instagram'
        ];

        brands.forEach(b => {

            if (
                u.includes(b) &&
                !u.includes(`${b}.com`) &&
                !u.includes(`www.${b}.com`)
            ) {

                score += 25;

                reasons.push(
                    `URL mimics a trusted brand ("${b}") with an altered domain`
                );
            }
        });


        // URL shorteners
        if (/(bit\.ly|tinyurl|goo\.gl|t\.co|is\.gd|ow\.ly)/.test(u)) {
            score += 15;
            reasons.push(
                'Uses a URL shortener that hides the real destination'
            );
        }

    });


    // Deduplicate reasons
    const uniqueReasons = [...new Set(reasons)];


    // Cap score at 100
    score = Math.min(score, 100);


    // Determine risk level
    let level;
    let summary;
    let color;

    if (score >= 50) {

        level = 'HIGH';
        summary = 'Potential scam detected.';
        color = '#ff6b6b';

    } else if (score >= 20) {

        level = 'MEDIUM';
        summary = 'Some suspicious signs found — proceed with caution.';
        color = '#ffb84d';

    } else {

        level = 'LOW';
        summary = 'No strong scam indicators found. Still stay alert.';
        color = '#4ecdc4';

        if (uniqueReasons.length === 0) {
            uniqueReasons.push(
                'No major red flags detected in the text'
            );
        }
    }


    // Update result box
    document.getElementById('riskLevel').textContent =
        `${level} (${score}/100)`;

    document.getElementById('riskLevel').style.color = color;

    document.getElementById('resultSummary').textContent = summary;


    // Update reasons list
    const list = document.getElementById('reasonsList');

    list.innerHTML = '';

    uniqueReasons.forEach(reason => {

        const li = document.createElement('li');

        li.textContent = reason;

        list.appendChild(li);
    });


    // Show result
    resultBox.style.borderLeftColor = color;

    resultBox.classList.add('active');

    resultBox.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

