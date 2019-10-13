# C/C++,---> gdb是一个由GNU开源组织发布的、
# UNIX/LINUX操作系统下的、基于命令行的、功能强大的程序调试工具

# python debug ---> pdb
# 使用方法一
# 也可直接使用命令行调试  h,查看帮助文档
# 单步执行代码,通过命令 python -m pdb xxx.py 启动脚本，进入单步执行模式

# 使用方法二 断点调试
# import pdb 之后，直接在代码里需要调试的地方设置断点 pdb.set_trace()
import pdb
# 更优美的打印
import pprint


s = '0'
n = int(s)
pdb.set_trace()
print(10/n)