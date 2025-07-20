

/*Lego Skills hover Animation*/
document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('my-skills-section');
    const legoGridContainer = section.querySelector('.lego-grid-container');

    const approximateBrickCellSize = 20; 
    const numCols = Math.ceil(legoGridContainer.offsetWidth / approximateBrickCellSize);
    const numRows = Math.ceil(legoGridContainer.offsetHeight / approximateBrickCellSize);
    
    const totalBricks = numRows * numCols;
    const legoColors = ['#E4002B', '#FFCD00', '#00AF4D', '#0057A6', '#FFFFFF', '#000000',
        '#FF6F00', '#8B4513', '#9932CC', '#00CED1']; // Lego-like colors

    // Array to store references to all created bricks
    const allBricks = []; 

    // Function to create a single Lego brick element
    function createLegoBrick(index) {
        const brick = document.createElement('div');
        brick.classList.add('lego-brick');
        const randomColor = legoColors[Math.floor(Math.random() * legoColors.length)];
        brick.style.setProperty('--lego-color', randomColor); // Set color using CSS variable
        
        // Add a slight random delay for a more natural "forming" effect
        brick.style.transitionDelay = `${Math.random() * 0.4}s`; // Max 0.5s delay
        
        // You could also set initial random transforms here
        // brick.style.transform = `scale(0.5) rotateX(${Math.random() * 180}deg) rotateY(${Math.random() * 180}deg) translateZ(${Math.random() * -200}px)`;

        legoGridContainer.appendChild(brick);
        allBricks.push(brick); // Store the brick reference
    }

    // Populate the grid with bricks
    for (let i = 0; i < totalBricks; i++) {
        createLegoBrick(i);
    }

    // Add event listeners for hover
    section.addEventListener('mouseenter', () => {
        allBricks.forEach((brick) => { // Removed 'index' if not needed here
            brick.classList.add('lego-brick--active'); // ADD the active class
            // The transitionDelay applied during creation will make them animate in staggered.
        });
    });

    section.addEventListener('mouseleave', () => {
        allBricks.forEach((brick) => { // Removed 'index' if not needed here
            brick.classList.remove('lego-brick--active'); // REMOVE the active class
            // The bricks will now animate back to their default (hidden) state
            // respecting the transitionDelay set when they were created.
        });
    });

    // Optional: Add a slight initial animation for loading
    // setTimeout(() => {
    //     legoGridContainer.style.opacity = 1; // Or some other initial state
    // }, 100);


/* Header Background Lego Animation */
    const headerLegoBackground = document.querySelector('.header-lego-background');

    // Calculate brick count for header background
    const headerApproximateBrickCellSize = 26; // Slightly larger for header
    const headerNumCols = Math.ceil(headerLegoBackground.offsetWidth / headerApproximateBrickCellSize);
    const headerNumRows = Math.ceil(headerLegoBackground.offsetHeight / headerApproximateBrickCellSize);
    const headerTotalBricks = headerNumRows * headerNumCols;

    // Use a slightly different color palette for the header background if desired
    const headerLegoColors = [
        '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999' // Shades of grey/darker colors
    ];

    function createHeaderLegoBrick(index) {
        const brick = document.createElement('div');
        brick.classList.add('header-lego-brick');
        const randomColor = headerLegoColors[Math.floor(Math.random() * headerLegoColors.length)];
        brick.style.setProperty('--lego-color', randomColor);
        
        // Apply animation delay to each header brick for the wave effect
        // This creates the "flow" by staggering when each brick hits its animation peak
        brick.style.animationDelay = `${(index % headerNumCols) * 0.05 + Math.floor(index / headerNumCols) * 0.03}s`; // Staggered by column and row
        // You can experiment with this delay calculation for different wave patterns
        
        headerLegoBackground.appendChild(brick);
    }

    // Populate the header background grid with bricks
    for (let i = 0; i < headerTotalBricks; i++) {
        createHeaderLegoBrick(i);
    }

    // Handle resize for header background
    let headerResizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(headerResizeTimer);
        headerResizeTimer = setTimeout(() => {
            headerLegoBackground.innerHTML = ''; // Clear existing bricks

            const newNumCols = Math.ceil(headerLegoBackground.offsetWidth / headerApproximateBrickCellSize);
            const newNumRows = Math.ceil(headerLegoBackground.offsetHeight / headerApproximateBrickCellSize);
            const newTotalBricks = newNumRows * newNumCols;

            for (let i = 0; i < newTotalBricks; i++) {
                createHeaderLegoBrick(i);
            }
        }, 250);
    });
});



