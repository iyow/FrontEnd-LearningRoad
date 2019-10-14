'''
作者：
时间：
这是我们编写的第一个模块，该模块包含以下内容：
变量1：字符串变量
函数1：简单的函数
类1：代表用户的类

使用print(mymodule.__doc__)或者help可以查看模块信息
当模块文件名以数字开头或者有空格，可以使用内置函数引入模块，__import__("demo text")
通过模块的 __file__ 属性即可查看到指定模块的源文件路径

模块寻找路径
- 在当前目录，即当前执行的程序文件所在目录下查找
- 到 PYTHONPATH（环境变量）下的每个目录中查找
- 到 Python 默认的安装目录下查找
所有涉及到的目录，都保存在标准模块 sys 的 sys.path 变量中，
通过修改此变量，可以修改/输出指定程序文件支持查找的所有目录。

Python 库：相比模块和包，库是一个更大的概念，
例如在 Python 标准库中的每个库都有好多个包，而每个包中都有若干个模块。
'''
# 模块
# 设置  * 方式导入时  限制导出的东西
__all__ = ['MyClass', 'outerfunc']

print('aloha!被导入会被执行')


# 私有化的实现 通过命名重整(name mangling)实现，_类名__属性 例如，__private_prop ---> _MyClass__private_prop
# 所以如果 想的话还是可以通过 _Class__Object 调用到

class MyClass(object):
    def __init__(self):
        self.__private_prop = '私有属性'
        print('我是myclass')
    
    def __private_method(self):
        print('---这是个私有方法')


def innerfunc():
    print('我是innerfunction')


def outerfunc():
    print('我是outerfunction')


# 只有在 from ... import * 模式下会被限制
_private_num = 100
__private_num2 = 200
