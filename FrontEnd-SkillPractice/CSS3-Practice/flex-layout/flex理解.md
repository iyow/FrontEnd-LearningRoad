# FLEX布局

## 在父元素中设置的属性： 
- Display：Flex
- 控制主轴（整体控制每个整列对齐方式）：justify-content 
- 控制侧轴（整体控制每个整行对齐方式）：align-content
- 改变轴方向：flex-direction  **（注意此属性会改变轴的方向例如主轴从横着变为竖着相应的justify-content将会作用于竖着的方向）**
- 控制flex容器换行：flex-wrap
- 控制flex容器中的每个item的在侧轴整体对齐方式：align-items
- Flex-flow》》》》》》flex-direction和flex-wrap的简写

## 在需要的子元素中设置(分配父盒子剩余空间时计算用):
- 控制flex容器中的item在侧轴的单独对齐方式会覆盖父元素的align-items的设置：align-self 
- 初始大小Flex-basis      
- 父盒子宽度不够时的收缩规则flex-shrink       
- 父盒子宽度太大时的拉伸因子flex-grow
- Order:元素按照order属性的值的增序进行布局 **（注意该属性仅仅的对元素的视觉顺序产生作用并不会影响逻辑顺序。。即不可以用于非视觉设备体）**
Flex：flex-grow     flex-shrink   flex-basis的简写
