(function (fb) {
    function Bird(ctx,img) {
        this.ctx = ctx ;
        this.img = img;
        /* 小鸟尺寸 */
        this.birdW = img.width/3;
        this.birdH = img.height;
        this.y = 100 ;
        this.x = 100 ;
        /* 初始速度 */
        this.v0 = 0 ;
        /* 加速速度 */
        this.acc = 0.0005 ;
        this.startTime = Date.now() ;
        /* 图片动画索引 */
        this.index = 0 ;
        this.flyY() ;
        /* 最大速度 */
        this.maxspeed = 0.5 ;
        /* 45弧度 */
        this.maxRotate = Math.PI / 4 ;
        /* 路程= 初始速度 * 时间 + 加速度*时间 *时间 / 2 */
        /* 旋转角度= 当前速度 / 最大速度 * 最大角度 */
    } ;
    Bird.prototype.draw = function () {
        this.ctx.save();
        var curTime = Date.now() ;
        var deltaTime = curTime - this.startTime ;
        var s = this.v0 * deltaTime+this.acc*deltaTime*deltaTime / 2 ;
        this.y+=s;
        /* 跟新开始时间 */
        this.startTime = curTime ;
        this.v0 += this.acc * deltaTime ;
        this.ctx.translate(this.x,this.y);
        /* 旋转 */
        var rotate = this.v0 / this.maxspeed * this.maxRotate;
        if (rotate > this.maxRotate) {
            rotate = this.maxRotate ;
        }
        this.ctx.rotate(rotate) ;
        this.ctx.drawImage(this.img,this.index*this.birdW,0,this.birdW,this.birdH,-this.birdW / 2,-this.birdH / 2,this.birdW,this.birdH)
        this.index++ ;
        if(this.index > 2){
            this.index = 0 ;
        }
        this.ctx.restore();
    } ;
    /* 飞升处理 */
    Bird.prototype.flyY = function () {
        var that = this;
       this.ctx.canvas.onclick = function () {
           that.v0 = -0.3 ;
       }
    } ;
    fb.Bird = Bird ;
})(FB)