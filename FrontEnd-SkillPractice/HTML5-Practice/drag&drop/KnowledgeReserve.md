## 一个完整的drag and drop流程通常包含以下几个步骤:

1. 设置可拖拽目标.设置属性draggable="true"实现元素的可拖拽.
2. 监听dragstart设置拖拽数据
3. 为拖拽操作设置反馈图标(可选)
4. 设置允许的拖放效果,如copy,move,link
5. 设置拖放目标,默认情况下浏览器阻止所有的拖放操作,所以需要监听dragenter或者dragover取消浏览器默认行为使元素可拖放.
6. 监听drop事件执行所需操作

## 拖拽事件
- dragstart:拖拽开始时在被拖拽元素上触发此事件,监听器需要设置拖拽所需数据,从操作系统拖拽文件到浏览器时不触发此事件.
- dragenter:拖拽鼠标进入元素时在该元素上触发,用于给拖放元素设置视觉反馈,如高亮
- dragover:拖拽时鼠标在目标元素上移动时触发.监听器通过阻止浏览器默认行为设置元素为可拖放元素.
- dragleave:拖拽时鼠标移出目标元素时在目标元素上触发.此时监听器可以取消掉前面设置的视觉效果.
- drag:拖拽期间在被拖拽元素上连续触发
- drop:鼠标在拖放目标上释放时,在拖放目标上触发.此时监听器需要收集数据并且执行所需操作.如果是从操作系统拖放文件到浏览器,需要取消浏览器默认行为.
- dragend:鼠标在拖放目标上释放时,在拖拽元素上触发.将元素从浏览器拖放到操作系统时不会触发此事件.

**注意：拖拽产生的一系列事件,拖拽事件产生时不会产生对应的鼠标事件.**

## DataTransfer对象
**拖拽事件周期中会初始化一个DataTransfer对象,用于保存拖拽数据和交互信息.以下是它的属性和方法.**

- dropEffect: 拖拽交互类型,通常决定浏览器如何显示鼠标光标并控制拖放操作.常见的取值有copy,move,link和none
- effectAllowed: 指定允许的交互类型,可以取值:copy,move,link,copyLink,copyMove,limkMove, all, none默认为uninitialized(允许所有操作)
- files: 包含File对象的FileList对象.从操作系统向浏览器拖放文件时有用.
- types: 保存DataTransfer对象中设置的所有数据类型.
- setData(format, data): 以键值对设置数据(并不是自己随意确定的键值对),format通常为数据格式,如text,text/html(IE只定义了”text”或”URL”两种有效的数据类型，而HTML5则对此加以扩展，允许指定各种MIME类型。考虑到向后兼容，HTML5也支持”text”或”URL”，但这两种类型会被映射为”text/plain”或”text/url-list”)
- getData(format): 获取设置的对应格式数据,format与setData()中一致
- clearData(format): 清除指定格式的数据
setDragImage(imgElement, x, y): 设置自定义图标