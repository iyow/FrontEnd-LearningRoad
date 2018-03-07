function Sprite (option) {
	this._init(option);
}

Sprite.prototype = {
	_init:function (option) {
		this.x = option.x === 0 ? 0 : (option.x || 10);//0
		this.y = option.y === 0 ? 0 : (option.y || 10);//0

		this.w = option.w || 40; // 绘制到canvas上的宽高
		this.h = option.h || 65;

		this.fps =  option.fps || 10; // frame per second
		this.originW = option.originW || 40;	// 截取的精灵图片中的 精灵的宽高。
		this.originH =  option.originH ||65;

		this._dirIndex = 0;

		this._imgSrc = option.imgSrc || '';
	},
	render:function (ctx) {
		var frameIndex = 0;
		// var self = this;
		var img = new Image();
		img.src = this._imgSrc;

		img.onload = () => {
			// console.log(this);
			setInterval(() => {
				// console.log(this);
				ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
				ctx.drawImage(
					img //绘制的原始图片
					, frameIndex * this.originW  // 剪切图片的x坐标
					, this._dirIndex * this.originH
					, this.originW
					, this.originH
					, this.x
					, this.y
					, this.w
					, this.h
				);
				frameIndex++;
				frameIndex %= 4;

		}, 1000 / this.fps);
		}
	},
	changeDir:function (dir) {
		// if( dir == 'left' ) {
		// 	this._dirIndex = 1;
		// }

		// if( dir == 'right' ) {
		// 	this._dirIndex = 2;
		// }


		// if( dir == 'up' ) {
		// 	this._dirIndex = 3;
		// }

		// if( dir == 'down' ) {
		// 	this._dirIndex = 0;
		// }
		switch (dir) {
			case 'left':
				this._dirIndex = 1;
				break;
			case 'right':
				this._dirIndex = 2;
				break;
			case 'in':
				this._dirIndex = 3;
				break;
			case 'out':
				this._dirIndex = 0;
				break;
		}
	}
}