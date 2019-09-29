import functools

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


# 匿名函数 lambda , lambda是一个表达式 不是一个语句块 仅能封装有限的逻辑
# 与其他语言的 lambda 表达式不同 Python的lambda表达式只能有单独的一条语句

# 使用方法

# 基本使用
# 无参数定义
no_args_anonymous_func = lambda : 'Hello anonymous func'
print(no_args_anonymous_func())
type(no_args_anonymous_func)

# 带参数定义 有默认值 不定长参数
parameterized_anonymous_func = lambda x,*args,**kwargs: list(x)+list(args)+list(kwargs)
print(parameterized_anonymous_func('paf',1,2,3,a="G",b="K",c="L"))

# 表达式嵌套  闭包
nest_anonymous_func = lambda x: (lambda y: x+y)
print(nest_anonymous_func('1'))
print(nest_anonymous_func('1')('2'))

# 高阶函数
to_reduce_list = [1,2,3]
reduce_result = functools.reduce(lambda x,y: x+y,to_reduce_list)

# 跳转表，即行为列表或字典
behavior_dict = {
    "todo_add":lambda x, y: x+y,
    "todo_mult":lambda x, y: x*y
}
print(behavior_dict['todo_add'](1,2))

behavior_list = [lambda x, y: x+y, lambda x, y:x*y]
print(behavior_list[0](1,2))

# 据说当年 lambda表达式 是 一位 Lisp程序员给Python添加的 而Guido是强烈反对的
# Guido 中意的是 列表推导式/列表解析式(comprehensions)
cp_list = [x*y for x in range(1,5) if x > 2 for y in range(1,4) if y < 3]
print(cp_list)
# 执行顺序
print('-----执行顺序')
for x in range(1,5):
    if x > 2:
        for y in range(1,4):
            if y < 3:
                print(x*y)
