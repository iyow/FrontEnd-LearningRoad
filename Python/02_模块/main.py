import os
import sys
import mymodule
import mymodule as iyow_module
import my_package.pkg_first_module as package_test
from my_package.pkg_first_module import module1
from mymodule import *
from my_package import *

print(id(package_test.module1))
print(id(module1))
print(dir(package_test.module1) == dir(module1))

all_global_dict = globals()
print('module1' in all_global_dict)

print(dir(package_test))
print('module1' in dir(package_test))

print('mymodule模块路径-----%s' % mymodule.__file__)
print('os模块路径-----%s' % os.__file__)
print('模块搜索路径-----可直接修改该值添加或删除搜索的路径%s' % sys.path)

# 非 import * 模式导入还是可以调用
print(mymodule.innerfunc())
print(dir(iyow_module))

print('MyClass' in all_global_dict)
print('innerfunc' in all_global_dict)
print('outerfunc' in all_global_dict)
