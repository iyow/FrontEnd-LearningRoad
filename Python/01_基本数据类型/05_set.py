# -*- encoding: utf-8 -*-
# 集合 类型为可变类型，
# 集合（set）是一个无序的不重复元素序列。

set_1 = {'first','second','third','fourth'}
set_2 = set(["Google", "Tencent", "Taobao"])

# 增加
set_1.add('fifth')
set_1.add('first')
set_1.update([1,2,3],{3,4})
print(set_1)
# 删除
# set_1.remove(1)# 不存的话会发生错误
# set_1.discard(2)
# set_1.clear()