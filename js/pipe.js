(function (fb) {
    var Pipe = function (ctx,img1,img2,x) {
        this.ctx = ctx ;
        /* 获取下图片   1上  2下*/
        this.img1 = img1 ;
        this.img2 = img2 ;
        /* 获取管道宽高 */
        this.imgW = img1.width;
        this.imgH = img1.height;
        /* 速度 */
        this.speed = 3 ;
        this.x = x + 400;
        /* 最矮管道 */
        this.minLandW = 140 ;
        /* 上下管道的距离 */
        this.space = 200 ;
        this.handleY() ;
    };
    Pipe.prototype.draw = function () {
        this.ctx.drawImage(this.img1,this.x,this.topY) ;
        this.ctx.drawImage(this.img2,this.x,this.botY) ;
        this.ctx.rect(this.x,this.topY,this.imgW,this.imgH) ;
        this.ctx.rect(this.x,this.botY,this.imgW,this.imgH) ;
        this.x -= this.speed ;
        if(this.x < -this.imgW ) {
            this.x += 6 * 3 * this.imgW ;
        }
    } ;
    /* 处理 Y 轴 */
    Pipe.prototype.handleY = function () {
        /* 设置 随机数*/
        var random = Math.random() * 90 ;
        /* 随机管道高 */
        var topH = this.minLandW + random ;
        /* 上管道的 Y 轴坐标*/
        this.topY = -this.imgH + topH ;
        /* 下管道的 Y 轴坐标*/
        this.botY = topH + this.space ;
    } ;
    fb.Pipe = Pipe ;
})(FB);