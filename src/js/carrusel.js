document.addEventListener("DOMContentLoaded", function() {
    const principalContainer = document.querySelector('.principal-image'); // Container of the images
    const thumbnailsContainer = principalContainer.querySelector('.carrusel-images');// Get all the container images
    const thumbnails = thumbnailsContainer.querySelectorAll('img'); 
  
    const mainImage = document.createElement('img'); // Div to display the main image
    mainImage.className = 'displayed-image'; 
  
    
    principalContainer.appendChild(mainImage); // Add the main image to the container

    if (thumbnails.length > 0) { // Default image
      mainImage.src = thumbnails[0].src;
    }
  
    thumbnails.forEach(function(thumbnail) { // Update the image when another is clicked
      thumbnail.addEventListener('click', function() {
        mainImage.src = this.src;
      });
    });
  });