function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
        	return decodeURIComponent(pair[1].replace(/\+/g, ' '));
        	//Two / in regex represents atart and end of regex
        	//\ represents escape character for + sign
        	// g represents global and it grab all occurences of + sign 
        }
    }
    
    return undefined;
}