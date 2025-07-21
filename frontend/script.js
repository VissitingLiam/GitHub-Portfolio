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

/* My Skill animation */
function createSkillBricks() {
    const rows = document.querySelectorAll('.bricks-row');

    rows.forEach(row => {
        const level = parseInt(row.dataset.level) || 0;
        row.innerHTML = ''; // clear previous

        for (let i = 0; i < level; i++) {
            const brick = document.createElement('div');
            brick.classList.add('lego-brick');
            brick.style.setProperty('--lego-color', getSkillColor(i, level));
            setTimeout(() => {
                brick.classList.add('lego-brick--active');
            }, i * 100); // stagger animation

            row.appendChild(brick);
        }
    });
}
function getSkillColor(i, total) {
    // Interpolate from red -> yellow -> green
    const ratio = i / total;
    if (ratio < 0.5) {
        return `rgb(${255}, ${Math.floor(255 * ratio * 2)}, 0)`; // Red to yellow
    } else {
        return `rgb(${Math.floor(255 * (1 - ratio) * 2)}, 255, 0)`; // Yellow to green
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createHeartbeatRow();
    window.addEventListener('resize', createHeartbeatRow);

    createSkillBricks();
    window.addEventListener('resize', createSkillBricks);
});