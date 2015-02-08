package  
{
	import net.flashpunk.Entity;
	import net.flashpunk.graphics.Image;
	import net.flashpunk.utils.Input;
	import net.flashpunk.utils.Key;
	import net.flashpunk.utils.Draw;
	
	/**
	 * ...
	 * @author Christian Silver
	 */
	public class Player extends Entity 
	{
		[Embed(source = 'assets/player.png')] private const PLAYER:Class;
		public var isBig:Boolean = false;
		
		public function Player() 
		{
			graphic = new Image(PLAYER);
			(graphic as Image).centerOrigin();
			
			x = 400;
			y = 300;
		}
		
		override public function update():void
		{
			//trace("I am an entity and I am updated.");
			if (Input.check(Key.RIGHT))
			{
				x += 5;
			}
			if (Input.check(Key.LEFT))
			{
				x -= 5;
			}
			if (Input.check(Key.DOWN))
			{
				y += 5;
			}
			if (Input.check(Key.UP))
			{
				y -= 5;
			}
			
			if (Input.check(Key.Z))
			{
				(graphic as Image).angle += 5;
			}
			
			if (Input.pressed(Key.SPACE))
			{
				isBig = !isBig;
				if (isBig)
				{
					(graphic as Image).scale = 2;
				}
				else
				{
					(graphic as Image).scale = 1;
				}
			}
			
		}
		
	}

}