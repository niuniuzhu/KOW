require.config({
	paths: {
		Main: 'js/main'
	}
});

require(["Main"], function (G) {
	new G.Main();
})