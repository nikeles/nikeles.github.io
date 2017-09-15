(function (win) {
    win.FB = {} ;
    var loadSource = function () {
        this.paths = ['birds','land','pipe1','pipe2','sky'] ;
        this.dir = 'images/' ;
        this.fix = '.png' ;
    } ;
    loadSource.prototype.load = function (callback) {
        var loadedNum = 0 ;
        var that = this ;
        var imgList = {} ;
        this.paths.forEach (function (item, i) {
            var img = new Image() ;
            img.onload = function () {
                loadedNum ++ ;
                imgList[item] = img ;
                if (loadedNum === that.paths.length) {
                    callback && callback(imgList)
                }
            } ;
            img.src = that.dir + item +that.fix;
        })
    }
    FB.loadSource = loadSource ;
})(window)