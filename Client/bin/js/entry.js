require.config({
	paths: {
		Game: 'js/game'
	}
});

require(["Game"], function (G) {
	new G.Game();
})