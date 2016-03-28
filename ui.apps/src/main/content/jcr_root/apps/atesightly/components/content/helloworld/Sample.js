"use strict";
use(function () {

    var info = {};    
    info.date = new Date().toString();
    info.url = currentPage.path;
	info.template = currentPage.template.title;

    return info;
});
