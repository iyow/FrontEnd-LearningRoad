# 推导式comprehensions（又称解析式），
# 是Python的一种独有特性。
# 推导式是可以从一个数据序列构建另一个新的数据序列的结构体。
# 共有三种推导，在Python2和3中都有支持：


# 基本格式
# variable = [out_exp_res for out_exp in input_list if out_exp == 2]
#   out_exp_res:　　# 列表生成元素表达式，可以是有返回值的函数。
#   for out_exp in input_list：　　# 迭代input_list将out_exp传入out_exp_res表达式中。
#   if out_exp == 2：　　# 根据条件过滤哪些值可以。

# 列表推导式
def squar(x):
    return x*x


comp_list = [squar(i) for i in range(30) if i % 3 is 0]
print(comp_list)
# 使用()生成 generator
comp_list_gen = (i for i in range(30) if i % 3 is 0)
print(comp_list_gen)
print(next(comp_list_gen))
print(next(comp_list_gen))
print(type(comp_list_gen))

# 字典推导式
some_dict = {"a": "ASD1", "b": "FGH2"}
comp_dict = {v.lower(): k*2 for k, v in some_dict.items()}
print(comp_dict)

# 集合推导式
comp_set = {x**2 for x in [1, 1, 2]}
print(comp_set)
