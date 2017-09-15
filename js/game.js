(function (fb) {
    var Game = function () {
        /* 获取工具 */
        this.ctx = document.querySelector('canvas').getContext('2d') ;
        this.running = true ;
        this.init() ;
    }  ;
    Game.prototype.init = function () {
       this.gameStart()
    } ;
    Game.prototype.gameStart = function () {
        var that = this ;
        /* 拿资源 */
        var loadSource = new fb.loadSource;
        loadSource.load(function (imgList) {
            /* 初始化天空 */
            var skyImg = imgList['sky'] ;
            var sky1 = new fb.Sky(that.ctx,skyImg,0*that.ctx.canvas.width)
            var sky2 = new fb.Sky(that.ctx,skyImg,1*that.ctx.canvas.width)
            /* 初始化管道 */
            var pipeImg1 = imgList['pipe2'] ;
            var pipeImg2= imgList['pipe1'] ;
            var pipe = new fb.Pipe(that.ctx,pipeImg1,pipeImg2,0);
            var pipe1 = new fb.Pipe(that.ctx,pipeImg1,pipeImg2,1*3*pipeImg1.width);
            var pipe2 = new fb.Pipe(that.ctx,pipeImg1,pipeImg2,2*3*pipeImg1.width);
            var pipe3 = new fb.Pipe(that.ctx,pipeImg1,pipeImg2,3*3*pipeImg1.width);
            var pipe4 = new fb.Pipe(that.ctx,pipeImg1,pipeImg2,4*3*pipeImg1.width);
            var pipe5 = new fb.Pipe(that.ctx,pipeImg1,pipeImg2,5*3*pipeImg1.width);
            /* 初始化陆地 */
            var  landImg = imgList['land'] ;
            var land = new fb.Land(that.ctx,landImg,0) ;
            var land1 = new fb.Land(that.ctx,landImg,landImg.width) ;
            var land2 = new fb.Land(that.ctx,landImg,landImg.width*2) ;
            var land3 = new fb.Land(that.ctx,landImg,landImg.width*3) ;
            /* 初始化小鸟 */
            var birdImg = imgList['birds'];
            var birds = new fb.Bird(that.ctx,birdImg);
            function animation() {
                that.ctx.save();
                that.ctx.clearRect(0,0,that.ctx.canvas.width,that.ctx.canvas.height) ;
                that.ctx.beginPath();
                /* 画蓝天白云 */
                sky1.draw() ;
                sky2.draw() ;
                /* 绘制管道 */
                pipe.draw() ;
                pipe1.draw() ;
                pipe2.draw() ;
                pipe3.draw() ;
                pipe4.draw() ;
                pipe5.draw() ;
                /* 绘制路地 */
                land.draw() ;
                land1.draw() ;
                land2.draw() ;
                land3.draw() ;
                /* 绘制小鸟 */
                birds.draw();
                /* 游戏规则 */
                if (birds.y < 11) {
                    /* 碰到天空 */
                    that.gameOver();
                }else if (that.ctx.isPointInPath(birds.x,birds.y)) {
                    /* 碰到管道 */
                    that.gameOver();
                }else if (birds.y > land.y-15) {
                    /* 碰到地面 */
                    that.gameOver()
                };
                /* 执行动画 */
               if (that.running) {
                   requestAnimationFrame(animation) ;
               }
               /*  清除得分 */
               if(that.running===false){
                  alert('game over')
                   clearInterval(window.timer);
               };
                that.ctx.restore();
            } ;
            animation();
        }) ;
        /* 得分系统 */
        var score  = 0 ;
        var div = document.querySelector('div') ;
        window.timer = setInterval(function () {
            score ++;
            div.innerHTML = '得分: '+score ;
            if(score===30){
                that.running = false;
                document.querySelector('p').style.transform = 'translateY(0)' ;
                clearInterval(window.timer)
            }
        },1000);
    } ;
    Game.prototype.gameOver = function () {
        this.running = false ;
    } ;
    new Game() ;
})(FB) ;