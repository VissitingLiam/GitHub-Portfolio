// Brick colors and types
const legoColors = ['#E4002B', '#FFCD00', '#00AF4D', '#0057A6',
        '#FF6F00', '#8B4513', '#9932CC', '#00CED1']; // Lego-like colors

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

    const approximateBrickCellSize = 30; 
    const numCols = Math.ceil(legoGridContainer.offsetWidth / approximateBrickCellSize);
    const numRows = Math.ceil(legoGridContainer.offsetHeight / approximateBrickCellSize);
    
    const totalBricks = numRows * numCols;
    

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


/*My Skill animation*/

const container = document.getElementById("legoContainer");

// Each letter is represented using a grid and relative coordinates
// Bricks are made of 1x1, 1x2 or 1x3 based on shape
// Here’s a sample “M” shape using 1x1 bricks
const letterMaps = {
  "M": [
    [0,0],[1,0],    [3,0],[4,0],
    [0,1],      [2,1],    [4,1],
    [0,2],                [4,2],
    [0,3],                [4,3],
    [0,4],                [4,4]
  ],
  "Y": [
    [0,0],            [4,0],
        [1,1],  [3,1],
            [2,2],
            [2,3],
            [2,4]
  ],
  "S": [
        [1,0],[2,0],[3,0],
        [1,1],
        [1,2],[2,2],[3,2],
                  [3,3],
        [1,4],[2,4],[3,4]
  ],
  "K": [
    [0,0],      [2,0],
    [0,1],    [2,1],
    [0,2],  [1,2],
    [0,3],    [2,3],
    [0,4],      [2,4]
  ],
  "I": [
    [0,0],[1,0],[2,0],
          [1,1],
          [1,2],
          [1,3],
    [0,4],[1,4],[2,4]
  ],
  "L": [
    [0,0],
    [0,1],
    [0,2],
    [0,3],
    [0,4],[1,4],[2,4]
  ]
};

// Convert text into drawing instructions
const textToDraw = "MY SKILLS";
let offsetX = 2;
let offsetY = 2;
let brickSize = 20;
let delay = 0;

function drawLetter(letter, baseX, baseY) {
  const bricks = letterMaps[letter];
  if (!bricks) return;

  bricks.forEach(([x, y], i) => {
    const brick = document.createElement("div");
    brick.className = "lego-brick";
    brick.style.gridColumnStart = baseX + x;
    brick.style.gridRowStart = baseY + y;
    brick.style.backgroundColor = legoColors[Math.floor(Math.random() * legoColors.length)];

    container.appendChild(brick);

    setTimeout(() => {
      brick.classList.add("animate");
    }, delay);
    delay += 50;
  });
}

function drawPhrase() {
  const letters = textToDraw.split("");

  letters.forEach(letter => {
    if (letter === " ") {
      offsetX += 6;
    } else {
      drawLetter(letter, offsetX, offsetY);
      offsetX += 6;
    }
  });
}
drawPhrase();


/*puszzel*/
document.querySelectorAll('.puzzle-piece').forEach((piece, i) => {
  piece.style.opacity = 0;
  piece.style.transform = 'scale(0.8)';
  setTimeout(() => {
    piece.style.transition = 'all 0.5s ease';
    piece.style.opacity = 1;
    piece.style.transform = 'scale(1)';
  }, i * 100);
});



/*Education tree */
const leaves = document.querySelectorAll('.leaf');
const popup = document.getElementById('leaf-popup');
const popupTitle = document.getElementById('popup-title');
const popupInfo = document.getElementById('popup-info');

leaves.forEach(leaf => {
  leaf.addEventListener('click', () => {
    popupTitle.textContent = leaf.dataset.title;
    popupInfo.textContent = leaf.dataset.info;
    popup.style.display = 'block';
  });
});


/*Day and night mode*/
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-night-mode');

  // Function to apply or remove night mode classes
  function setNightMode(enabled) {
    if (enabled) {
      document.body.classList.add('night-mode');
      document.querySelector('header').classList.add('night-mode');
      document.querySelectorAll('section').forEach(sec => sec.classList.add('night-mode'));
      toggleBtn.textContent = '☀️'; // Sun icon to indicate can toggle off
    } else {
      document.body.classList.remove('night-mode');
      document.querySelector('header').classList.remove('night-mode');
      document.querySelectorAll('section').forEach(sec => sec.classList.remove('night-mode'));
      toggleBtn.textContent = '🌙'; // Moon icon to indicate can toggle on
    }
  }

  // Load saved preference from localStorage
  const nightModePref = localStorage.getItem('nightMode') === 'true';
  setNightMode(nightModePref);

  // Toggle on button click
  toggleBtn.addEventListener('click', () => {
    const isNight = document.body.classList.toggle('night-mode');
    document.querySelector('header').classList.toggle('night-mode');
    document.querySelectorAll('section').forEach(sec => sec.classList.toggle('night-mode'));

    // Update button icon
    toggleBtn.textContent = isNight ? '☀️' : '🌙';

    // Save preference
    localStorage.setItem('nightMode', isNight);
  });
});
