// A little animation over the navbar to add some movement to the page

// Initialize global variables
var speeds = []
var currentAnimation = 0 // Begin with the random animation
var animations = [
    // Random animation
    () => Math.random() * 6 + 1,
    // Linear waving
    () => 1,
    // Also linear, but alternating
    () => 2,
    // Alternate the other way around
    () => 2
]

// Initialize after DOM finished loading
document.addEventListener('DOMContentLoaded', function(event) {
    // Listen to animation change events (aka clicking on the container)
    document.getElementById('animation').addEventListener('click', (e) => {
        // On click, cycle through the animation types
        currentAnimation++
        
        if (currentAnimation === animations.length) {
            currentAnimation = 0
        }
    
        // Reset, the animation continues to run
        resetSoundBarAnimation()
    })
    
    // Reset everything and start the animation loop
    resetSoundBarAnimation()
    animateSoundBars()
})

function getSpeed () {
    // Return the speed using the animation function
    return animations[currentAnimation]()
}

// Resets the animation to the correct initial state for the given animation
function resetSoundBarAnimation () {
    speeds = []
    let bars = document.querySelectorAll('#animation .sound-bar')
    
    // First, insert the correct speeds into the array
    for (let i = 0; i < bars.length; i++) {
        speeds.push(getSpeed())
    }
    
    // Then, reset the bars
    switch (currentAnimation) {
        case 1:
            // The wave animation needs all set to an ascending height
            bars.forEach((bar, idx) => bar.style.height = `${100 / bars.length * idx}%`)
            break
        case 2:
            // The alternation needs to be opposite
            bars.forEach((bar, idx) => bar.style.height = `${100 * ((idx + 1) % 2)}%`)
            break
        case 3:
            // The alternation needs to be opposite, this time the other way round
            bars.forEach((bar, idx) => bar.style.height = `${100 * ((idx + 2) % 2)}%`)
            break
        default:
            // On default, set all to 0%
            bars.forEach(bar => bar.style.height = '0%')
            break
    }
}

function animateSoundBars () {
    let bars = document.querySelectorAll('#animation .sound-bar')
    for (let idx = 0; idx < bars.length; idx++) {
        let height = parseInt(bars[idx].style.height || '0%', 10)
        
        height += speeds[idx]
        
        if (height >= 100) {
            height = 100
            speeds[idx] = -getSpeed()
        } else if (height <= 0) {
            height = 0
            speeds[idx] = getSpeed()
        }

        bars[idx].style.height = `${height}%`
    }
    
    setTimeout(animateSoundBars, 10)
}
