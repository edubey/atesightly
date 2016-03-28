// hello.js is depend on js filess present at ../utils

use(['../utils/info.js','../utils/length.js'],function (infoObj,lenObj) {
    
    lengthOfString = lenObj.length(this.str);
    randomText = infoObj.info(currentPage, this.number);

    return {
        length:lengthOfString,
        text:randomText
    }
});
