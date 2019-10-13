# 相关 模块 组合为 包

# 导入时 使用 from my_package from * 时
__all__ = ["module1", "module2"]

# 外部导入时 使用 import my_package 时
from . import module1
from . import module2

# 内部自己导入时
# import module1
# import module2


def can_i_use():
    print('can i use this func?')


def hello():
    print('aloha ! Thanks to use my package')

hello()
