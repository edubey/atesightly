

use(function(){
    var infoObj = {};

    infoObj.info = function(page, n) {        
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";        
        for( var i=0; i < n; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    return infoObj
})

