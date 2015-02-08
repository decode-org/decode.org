package  
{
	import net.flashpunk.Entity;
	import net.flashpunk.graphics.Image;
	
	/**
	 * ...
	 * @author Christian Silver
	 */
	public class Player extends Entity 
	{
		[Embed(source = 'assets/player.png')] private const PLAYER:Class;
		
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
		}
		
	}

}