# -*- encoding: utf-8 -*-
# 元组 类型为不可变类型，
# Python 的元组与列表类似，不同之处在于元组的元素不能修改，元组使用小括号。

# 转换 tuple(seq)
tuple_1 = ('aloha',666,'1996',[1,2,3])

# tuple正确使用
tuple_right = ('xyz',)
# 括号会被当做运算符
tuple_wrong = ('xyz')
print(type(tuple_right))
print(type(tuple_wrong))

# 增/删/改 - 元组中的元素值不允许修改删除 但可以进行连接组合和删除整个元组
tuple_2 = ('connect-1','connect-2') + tuple_1
print(tuple_2)
del tuple_2


# 查/访问
print(tuple_1[0])
print(tuple_1[::-1])
