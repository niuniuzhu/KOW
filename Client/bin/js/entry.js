require.config({
	paths: {
		Game: 'js/game'
	}
});

require(["Game"], function (Game) {
	new Game.Main();
})