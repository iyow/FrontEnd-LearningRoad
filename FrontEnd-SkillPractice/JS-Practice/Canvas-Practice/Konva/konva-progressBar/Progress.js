function Progress (option) {
	this._init(option);
}

Progress.prototype ={
	_init: function (option) {
		this.x = option.x || 0;	//进度条的x坐标
		this.y = option.y || 0; // 进度条的y坐标
		this.w = option.w || 0; //进度条的宽度
		this.h = option.h || 0; //进度条的高度

		this.fillStyle = option.fillStyle || 'red';
		this.strokeStyle = option.strokeStyle || 'red';

		//定义的内部的进度条的矩形
		var innerRect = new Konva.Rect({
			x: this.x, 				// stage.width(),获得舞台的宽度，  x：设置当前矩形x坐标
			y: this.y,
			width: 0, 				//设置矩形的宽度
			height: this.h, 		//设置矩形的高度
			fill: this.fillStyle,	//设置矩形的填充的颜色
			cornerRadius: 1/2 * this.h, //设置进度条的圆角。
			id: 'innerRect'		    //设置当前矩形的ID，以便于后面进行使用ID选择器
			//name: 'ss'				设置name,方便后面用类选择器。
		});

		// this.innerRect = innerRect;

		//添加一个外边框的 矩形
		var outerRect = new Konva.Rect({
			x: this.x, 				// stage.width(),获得舞台的宽度，  x：设置当前矩形x坐标
			y: this.y,
			width: this.w, 			//设置矩形的宽度
			height: this.h, 		//设置矩形的高度形的高度
			stroke: this.strokeStyle, // 设置了stroke那么，矩形就进行描边
			strokeWidth: 4,			 // 设置边框的宽度，
			cornerRadius: 1/2* this.h
		});

		//html : 
		// 创建一个组， 相当于html中的父盒子。
		this.group  = new Konva.Group({
			x: 0,
			y: 0
		});
		this.group.add( innerRect );//把内部的矩形放到组中
		this.group.add( outerRect );

	},
	//此方法是将 用户传进来的需要改变的进度 运行动画
	changeValue: function( val ) {
		//传进来的进度
		if( val > 1 ) { //   1 - 100   vs   0 -1     =>0.5
			val = val /100;
		}
		//做动画 val = .3 .7
		var width = this.w * val; //最终进度条内部矩形的 宽度。

		// 通过id选择器去查找内部的子元素。
		var innerRect = this.group.findOne('#innerRect');
		// var innerRect = this.group.findOne('Rect');

		// var innerRect = this.innerRect;
		
		// to动画系统： 让我们的物件 变换到某个状态
		// 让我们的 物件从 当前状态 到  下面设置的状态，
		innerRect.to({
			width: width,
			duration: .3,
			easing: Konva.Easings.EasIn
		});

	},
	// arg： 传进来的层或者 是组，
	//此方法是：把当前创建的进度条　添加到　层中。
	addToGroupOrLayer: function( layer ) {
		layer.add( this.group );
	}
}