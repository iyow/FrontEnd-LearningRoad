G_a = 100
print(id(G_a))

# type hint

# 不定长参数
# 类比 js 的扩展运算符...以及数组和对象的解构
# *args    多余参数转换为元组，类似js扩展运算符
# **kwargs 命名参数的不定长参数， 多余参数转换为字典
# 传入实参时 *解包元组，**解包字典


def double(x: str = '我是缺省参数', y='默认值', z='可以通过命名参数传入实参', *args, **kwargs) -> str:
    '''
    @description 在此书写函数doc，描述，参数及返回值等信息 通过help函数查询信息
    @param xxx
    @return xxx
    '''
    print(args)
    print(kwargs)
    a = 100
    print(id(a))
    # 返回当前位置 所有全局变量组成的字典
    # print(globals())
    global G_a
    G_a = 200
    return str(x)*2 + str(y)*2 + str(z)*2


print('-'*10, G_a)
print(double())
# 命名参数
print(double(y=2, x=1, z=3))
# 不定长参数
print(double(1, 2, 3, 9, 9, 9, a=1, b=2, c=3))
# 解包传参
unpacking_tuple = (1, 2, 3)
unpacking_dict = {'a': 1, 'b': 2}
print(double(*unpacking_tuple, **unpacking_dict))
print('-'*10, G_a)


# 通过help函数查看 函数使用信息
help(double)
help(globals)
help(print)
