(function (fb) {
    var Sky = function (ctx,img,x) {
        this.ctx = ctx ;
        this.img = img ;
        this.x = x || 0 ;
        this.y =  0 ;
        /* 速度 */
        this.speed = 3 ;
    } ;
    Sky.prototype.draw = function () {
        this.ctx.drawImage(this.img, this.x, this.y)
        this.x -= this.speed ;
        if (this.x < - this.ctx.canvas.width) {
            this.x += 2 * this.ctx.canvas.width ;
        }
    } ;
    fb.Sky = Sky ;
})(FB) ;