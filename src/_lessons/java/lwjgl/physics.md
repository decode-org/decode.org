---
title: Ball Physics
---
## Introduction

In this final tutorial, we will implement the physics of our ball to make our game playable and more than just a few coloured shapes rendering on the screen. We will go over 
the physics of trajectory of the ball, and implement nice code to make our ball rebound at a set speed depending on the angle that it hits the wall or another player. After this,
the game is more or less finished.

## The Physics

There is not much we have changed in terms of code, but it is quality, not quantity that counts.

The first snippet is the changes we have made to the `update()` method within Ball.java. This is where all of our physics happens.

``` java
/**
 * Called every frame to update the ball's position
 */
public void update(Player player1, Player player2)
{
    this.x += hSpeed; // updates the x position
    this.y += vSpeed; // updates the y position
    bounds.setBounds(x - RADIUS, y - RADIUS, RADIUS * 2, RADIUS * 2); // updates the collision box
    if (player1.collided(bounds)) // checks if the ball has collided with player 1
    {
        int playerMiddle = player1.getY() + (player1.HEIGHT / 2);
        int dY = this.y - playerMiddle;
        hSpeed = -hSpeed; // reverses the horizontal speed
        vSpeed += dY;
        int newSpeed = (int)Math.sqrt((hSpeed * hSpeed) + (vSpeed * vSpeed));
        double ratio = MAXSPEED / newSpeed;
        vSpeed *= ratio; // sets a new vSpeed based on the angle of the ball hitting the player
    }
    if (player2.collided(bounds)) // checks if the ball has collided with player 2
    {
        int playerMiddle = player2.getY() + (player2.HEIGHT / 2);
        int dY = this.y - playerMiddle;
        hSpeed = -hSpeed; // reverses the horizontal speed
        vSpeed += dY;
        int newSpeed = (int)Math.sqrt((hSpeed * hSpeed) + (vSpeed * vSpeed));
        double ratio = MAXSPEED / newSpeed;
        vSpeed *= ratio; // sets a new vSpeed based on the angle of the ball hitting the player
    }
    if (this.y - RADIUS <= 0 || this.y + RADIUS >= Pong.HEIGHT) // checks if the ball has collided with the top or bottom
    {
        vSpeed = -vSpeed; // reverses the vertical speed
    }
    if (this.x - RADIUS <= 0 || this.x + RADIUS >= Pong.WIDTH) // checks if the ball has collided with the left or right wall
    {
        System.out.println("Game Over"); // notifies of game over
        Pong.gameStarted = false; // ends the game
        this.x = player1.getX() + player1.WIDTH * 2;    // resets the ball
        this.y = player1.getY() + (player1.HEIGHT / 2); // ""
        this.hSpeed = 0;								// ""
        this.vSpeed = 0;								// ""
    }
}
```

The next snippet is the small changes we have made to the Pong class.

``` java
/** Previous code ommited */
private void handleKeyPresses()
{
    final int pY = HEIGHT - 100; // creates our y position for each player (otherwise the player would go off the screen)
    Player p1 = (Player)objectList.get(0); // reference to our first player
    Player p2 = (Player)objectList.get(1); // reference to our second player 
    Ball ball = (Ball)objectList.get(2); // reference to our ball
    ball.update(p1, p2);
    if (Keyboard.isKeyDown(Keyboard.KEY_SPACE) && !gameStarted) // checks if the Space key is pressed and the game has not started
    {
        ball.hSpeed = Ball.MAXSPEED;
        ball.vSpeed = (int)((((Math.random() <= 0.5)) ? -Math.random() : Math.random()) * 10);
        gameStarted = true;
    }
    /** Rest omitted */
}
```

You might be thinking, "What is all of that mumbo jumbo" in the first snippet. Don't worry, we will explain this entwinment of code and unravel it to you. First, we must
understand that the `update()` method, which does all of our physics calculations, is called every frame in the main loop. First, we'll discuss the first three lines 
of the method. These lines actually update our x and y positions, as well as the collision box. We are simply appending `hSpeed` onto the `x` value,
which means that the `x` value will increment (or decrement if `hSpeed` is negative) by `hSpeed` every frame, therefore we update the position.
The same thing is happening with the `y` position, only using `vSpeed` instead.

Now here is where it gets really interesting. We have a conditional to check if the ball has collided with player 1. The same code is in the conditional for player 2, so we only
need to discuss the code once. The first line calculates the halfway point of the bat, therefore if the ball collides somewhere before it, it will rebound in the same direction, 
otherwise it will rebound in the opposite direction.

We then set the horizontal speed (`hSpeed`) in the opposite direction by inverting it, as it is a vector unit, however we do something a little bit more to `
vSpeed`. We increment `vSpeed` by `dY`, which is essentially the `y` position, minus the `playerMiddle` value that we calculated
earlier, which sets the `vSpeed` at how fast it should travel backwards (if it hits near the sides, then it will speed up). Now, we actually set the correct speed of the
ball backwards using a bit of pythagoras' theorem. Remember how I said that speed was a vector? Well we need the resultant vector of the ball to actually set the speed, both 
horizontally and vertically correctly so the physics looks correct.

We calculate the resultant speed by square rooting the result of `hSpeed` squared plus `vSpeed` squared. Because this is not enough, as we need the vertical
component of it, we have to derive it from our resultant vector by calculating the ratio. We simply do this by dividing `MAXSPEED` by the resultant speed, and we
multiply `vSpeed` by it and assign it. Voila, we have our new speed that the ball will rebound by. As I said, the code is the same for player 2, so we do not need to 
explain it again.

The next conditional, we check if the ball has either collided with the top or bottom of the screen. Since this is not our losing condition, we simply reverse the `
vSpeed`, and the ball will rebound off the edge correctly, no more is needed here.

The final `if` conditional is a bit more interesting though, this checks if the ball has collided with the left or right side of the screen. Since this is how the 
player loses the game, we need to reset the ball. First, we print a message to the console, notifying that the player has lost, then we reset the bats and the ball to their 
starting positions, and set the variable `gameStarted` to `false`, which will respond again when we press the Space key and start the game all over again.
We have finished explaining how the physics of the ball works, now we will discuss the small changes made to the Pong class.

You may notice just two additional lines to the method, which is correct, as that is all we need. Basically, these lines launch the ball from the bat at a the max velocity and
in a random direction. This essentially mixes up our game a bit, making it unpredictable, so the game is not the same each time you play it. We have finished programming the game.

## Summary

We have learnt about the physics behind making the ball collide and rebound off the two players, and have made the game essentially playable and interactive. We have finished this
tutorial set, the next page is simply the conclusion of the whole page, and a few links for downloading a running version of the game, the full source code, and a video of gameplay
for our Pong game.
