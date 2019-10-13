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
