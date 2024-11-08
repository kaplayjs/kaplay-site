kaplay(); // Starts KAPLAY
loadSprite("bean", "/sprites/bean.png"); // Load a sprite
setGravity(1600); // Set the gravity acceleration (pixels per second)

const player = add([
    // add() works for adding game object
    sprite("bean"), // Add a sprite
    pos(center()), // Set the position to the center of the screen
    area(), // Add a collision area to the object
    body(), // Add physics to the object
]);

add([
    // add() a platform to hold the player
    rect(width(), 48),
    outline(4),
    area(),
    pos(0, height() - 48), // Bottom of the screen
    body({ isStatic: true }), // Static body, it won't move
]);

onKeyPress("space", () => {
    // when space key is pressed
    if (player.isGrounded()) {
        // only if it's grounded
        player.jump(); // jump, given from the body() component
    }
});
