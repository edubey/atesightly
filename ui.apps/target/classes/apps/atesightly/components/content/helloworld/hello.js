
use(['../utils/info.js','../utils/length.js'],function (i,l) {
    
    length = l.length("AEM Development");
    info = i.info(currentPage);
    return {
        length:length,
        info:info
    }
});
