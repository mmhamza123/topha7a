// script.js

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyjyr-tY0aoKlViU0VQKY5lkmEN_mMnYpviG3BuO8mSXmY5lq1KYraT1USm3WwdbD9Z/exec';  // رابط Google Sheets

function nextPage(page) {
    window.location.href = page;
}

document.getElementById('verificationForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const answer = document.getElementById('answer').value.trim();
    if (answer === 'ياخدني') {
        sendChoice('Verification', 'Correct');
        nextPage('question1.html');
    } else {
        alert('الإجابة خاطئة، حاول مرة أخرى.');
    }
});

function sendChoice(choice, message) {
    fetch(SHEET_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `choice=${encodeURIComponent(choice)}&message=${encodeURIComponent(message)}`
    }).then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error('Error:', error));
}

function recordChoiceAndNext(choice, message, nextPage) {
    sendChoice(choice, message);
    window.location.href = nextPage;
}
