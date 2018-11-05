function GetQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

var mode = GetQueryString("mode");
if (mode == undefined || mode == 0) {
	require(["./js/Main"], function (G) {
		new G.Main("{\"platform\": 0}");
	})
}
else {
	require(["./js/Pressure/Pressure"], function (G) {
		new G.Pressure();
	})
}