alert("\"Disclaimer: This website contains explicit content. Viewer discretion is advised. Must be 18+ to enter.\"")
document.addEventListener("DOMContentLoaded", function() {
    const imageContainer = document.getElementById('imageContainer');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const selectImage1Button = document.getElementById('selectImage1');
    const selectImage2Button = document.getElementById('selectImage2');
    
    const images = [
        'Images/anayana.jpg',
        'Images/rashmika18042024_002.jpg',
        'Images/aliaabhatt040823_3.jpg',
        'Images/kiaraadvani120923_1.jpg',
        'Images/kalyanipriyadarshan300823_5.jpg',
        'Images/Sara-Ali-Khan6.jpg',
        'Images/pooja19022024_019.jpg',
        'Images/tamannah310723_2.jpg',
        'Images/pooja19022024_019.jpg'
    ];

    const winnerImage = 'Images/riyanprag.jpeg'; // The final winner image which is not part of the array

    let currentIndex = 0;
    let remainingImage = null;

    function loadNextImages() {
        if (currentIndex < images.length - 1) {
            image1.src = remainingImage || images[currentIndex];
            image2.src = images[currentIndex + 1];
            currentIndex += 1;
        } else {
            displayFinalImage();
        }
    }

    function displayFinalImage() {
        imageContainer.innerHTML = `<h2>The Real Winner:</h2><img src="${winnerImage}" class="image" alt="Winner Image">`;
    }

    selectImage1Button.addEventListener('click', function() {
        remainingImage = image1.src;
        loadNextImages();
    });

    selectImage2Button.addEventListener('click', function() {
        remainingImage = image2.src;
        loadNextImages();
    });

    loadNextImages();
});
