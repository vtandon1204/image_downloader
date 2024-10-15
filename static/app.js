document.getElementById('downloadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const keyword = document.getElementById('keyword').value;
    const numImages = parseInt(document.getElementById('num_images').value);
    const emailAddress = document.getElementById('email').value; // Get email value
    const downloadLink = document.getElementById('downloadLink');
    const waitingMessage = document.getElementById('waitingMessage');

    // Log input values
    console.log('Keyword:', keyword);
    console.log('Number of Images:', numImages);
    console.log('Email Address:', emailAddress);

    // Show waiting message and spinner
    waitingMessage.style.display = 'block';

    fetch('http://127.0.0.1:5000/api/download_images', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyword: keyword, num_images: numImages, email: emailAddress }) // Include email in the request
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = `${keyword}_images.zip`;
        downloadLink.style.display = 'block';
        downloadLink.innerText = 'Download Zip';

        // Hide waiting message
        waitingMessage.style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        const errorMessage = error.error ? error.error : 'An unexpected error occurred.';
        document.getElementById('result').innerText = errorMessage;

        // Hide waiting message on error
        waitingMessage.style.display = 'none';
    });
});
