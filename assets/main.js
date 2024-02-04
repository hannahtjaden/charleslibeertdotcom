document.addEventListener('DOMContentLoaded', function() {
    const figures = document.querySelectorAll('figure');
    let currentFigureIndex = Math.floor(Math.random() * figures.length);

    // Function to show the current figure and hide others
    function showCurrentFigure() {
        figures.forEach((figure, index) => {
            figure.style.display = (index === currentFigureIndex) ? 'flex' : 'none';
        });
    }

    // Initially hide all figures except the randomly chosen one
    showCurrentFigure();

    // Add click event to cycle through images
    figures.forEach(figure => {
        figure.addEventListener('click', function() {
            currentFigureIndex = (currentFigureIndex + 1) % figures.length;
            showCurrentFigure();
        });
    });

    // Add keyboard event to cycle through images with arrow keys
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            currentFigureIndex = (currentFigureIndex + 1) % figures.length;
            showCurrentFigure();
        } else if (event.key === 'ArrowLeft') {
            currentFigureIndex = (currentFigureIndex - 1 + figures.length) % figures.length;
            showCurrentFigure();
        }
    });
});
