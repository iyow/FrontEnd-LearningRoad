# -*- encoding: utf-8 -*-
# 序列（列表）类型为可变类型，列表的数据项不需要具有相同的类型，它作为一个方括号内的逗号分隔值出现。
# 转换 元组 转 列表 list(seq)
list_1 = [666,'nihao','shijie','真棒呢','lalal']
print('start-----------',id(list_1))
print(list_1)

# 增
list_1.append('push/append a value0')
list_1.insert(4,'push/append a value1')

# 删
list_1.remove(666)
list_1.pop()
del list_1[len(list_1)-1]
del list_1[2]

# 查 start:end:step
print(list_1[1])
print(list_1[1:])
print(list_1[-1:1:-1])

# 改
list_1[1] = 'change~(#^.^#)' 

print('end-----------',id(list_1))
print(list_1)


# 脚本操作符
print(len([1, 2, 3]))#长度
print([1, 2, 3] + [4, 5, 6])#组合
print(['Hi!'] * 4)#重复
print(3 in [1, 2, 3])#元素是否存在于列表中

#迭代
for x in [1,2,3]:
    print(x)


# other 列表函数&方法
