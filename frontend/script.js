function createHeartbeatRow(brickCount = 60) {
    const container = document.querySelector('.header-lego-background');
    container.innerHTML = '';

    const pulsePositions = [20,21, 38,39]; // Pulse before and after name
    const totalDuration = 6; // seconds for one full run

    for (let i = 0; i < brickCount; i++) {
        const brick = document.createElement('div');
        brick.className = 'header-lego-brick';

        // Assign pulse class if at a pulse position
        if (pulsePositions.includes(i)) {
            brick.classList.add('heartbeat');
            brick.style.animationDelay = `${(i / brickCount) * totalDuration}s`;
        } else {
            brick.style.animationDelay = `${(i / brickCount) * totalDuration}s`;
        }

        container.appendChild(brick);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    createHeartbeatRow();
    window.addEventListener('resize', createHeartbeatRow);

    /*Lego Skills hover Animation*/
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

    
});