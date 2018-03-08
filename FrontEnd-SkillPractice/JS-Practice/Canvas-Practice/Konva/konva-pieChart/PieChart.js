function PieChart( option ) {
	this._init( option );
}

PieChart.prototype = {
	_init: function( option ) {
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.r = option.r || 0;
		this.data = option.data || [];

		//饼状图所有的 物件的组
		this.group = new Konva.Group({
			x: this.x,
			y: this.y
		});

		//饼状图：所有的 扇形的组
		this.wedgeGroup = new Konva.Group({
			x: 0,
			y: 0
		});

		//饼状图： 所有的文字的组
		this.textGroup = new Konva.Group({
			x: 0,
			y: 0
		});

		this.group.add( this.wedgeGroup );
		this.group.add( this.textGroup );

		// var self = this;
		var tempAngel = -90;//从-90开始绘制

		this.data.forEach((item, index ) => {
			//把每条数据创建成一个扇形
			var angle = 360 * item.value;//当前扇形的角度
			//创建一个扇形
			var wedge = new  Konva.Wedge({
				x: 0,		//扇形圆心坐标
				y: 0,
				angle: angle ,	//扇形的角度
				radius: this.r,	//扇形的半径
				fill: item.color,	//扇形的填充颜色
				rotation: tempAngel //扇形的旋转角度
			});

			this.wedgeGroup.add( wedge );

			//绘制文本的 角度
			var textAngle = tempAngel + 1/2 * angle;

			//绘制的 百分比的文本
			var text = new Konva.Text({
				x: (this.r+20) * Math.cos(Math.PI/ 180 * textAngle ),
				y: (this.r+20) * Math.sin(Math.PI/ 180 * textAngle ),
				text: item.value*100 +'%',
				fill: item.color
			});

			//根据角度判断设置文字的 位置
			if(  textAngle > 90 && textAngle < 270 ) {
				//让文本向左边 移动文字宽度的位置。
				text.x( text.x() - text.getWidth() );
			}

			this.textGroup.add( text );
			
			tempAngel += angle;
		});
		//绘制所有的楔形

		//绘制文字

		//绘制圆环的线
		var cir = new Konva.Circle({
			x: 0,
			y: 0,
			radius: this.r+10,
			stroke: '#ccc',
			strokeWidth: 2
		});

		this.group.add( cir );

		this._animateIndex = 0;
	},
	playAnimate: function() {

		// var self = this;
		//根据索引显示动画
		//把所有扇区 角度设置为0
		if( this._animateIndex == 0 ) {
			//拿到所有的 扇形
			this.wedgeGroup.getChildren().each(function(item, index ){
				item.angle(0);
			});
		}

		//展示当前索引对应的动画
	 	var item = this.wedgeGroup.getChildren()[this._animateIndex];
	 	item.to({
	 		angle: this.data[this._animateIndex].value * 360,
	 		duration: 2 * this.data[this._animateIndex].value,
	 		onFinish: () => {
	 			this._animateIndex ++;
	 			if( this._animateIndex >= this.data.length) {

	 				this._animateIndex = 0;//让他的索引再回到0

	 				//************************重点***********************
	 				return;// 会把整个递归执行完成。
	 			}
	 			//继续执行当前方法，播放下一个动画
	 			this.playAnimate();
	 		}
	 	});
	},
	//把饼状图添加到层里面的方法
	addToGroupOrLayer: function( arg ) {
		arg.add( this.group );
	}
}