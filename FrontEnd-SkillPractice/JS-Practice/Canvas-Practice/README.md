## Canvas

Canvas 是HTML5提供的一个特性，你可以把它当做一个位图载体，简单的说就是一张白纸。
- Canvas 2D 相当于获取了内置的二维图形接口，也就是二维画笔。
- Canvas 3D 是获取基于 WebGL的图形接口，相当于三维画笔。

你可以选择不同的画笔在上面绘制。

### CanvasRenderingContext2D
JavaScript ---> 场景为二维坐标系 -> 2d API -> ？？ ->.... -> CPU(？) 并把最终渲染出来图形 呈现到Canvas

### WebGLRenderingContext
JavaScript ---> 场景为三维坐标系(矩阵运算，透视深度，[顶点|片元]着色器纹理，摄像机视距角度，灯光) -> WebGL -> OpenGL ->.... -> 显卡 并把最终渲染出来图形 呈现到Canvas