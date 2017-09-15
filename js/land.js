(function (fb) {
    var Land = function (ctx,img,x) {
        this.ctx = ctx ;
        this.img = img ;
        this.x = x ;
        /* 速度 */
        this.speed = 3;
        this.y = this.ctx.canvas.height - this.img.height ;
    }
    Land.prototype.draw = function () {
        this.ctx.drawImage(this.img,this.x,this.y);
        this.x-=this.speed ;
        if (this.x < -this.img.width) {
            this.x += this.img.width*4
        }
    }
    fb.Land = Land ;
})(FB)