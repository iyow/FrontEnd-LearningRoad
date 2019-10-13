import sys

from distutils.core import setup

setup(name="iyow", version="1.0", description="iyow's module",
      author="iyow", py_modules=['pkg_first_module.module1', 'pkg_first_module.module2'])

# 打包构建
# python setpu.py build
# python setpu.py sdist

# 使用--- 将tar包解压
# python setup.py install 即可使用


print('获取执行程序时 命令行的输入参数-------')
print(sys.argv)