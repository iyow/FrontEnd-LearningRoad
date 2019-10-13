# -*- encoding: utf-8 -*-
# 字典是另一种可变容器模型，且可存储任意类型对象。
# 不允许同一个键出现两次。若出现，后一个值会被记住
# 键必须不可变，所以可以用数字，字符串或元组充当，而用列表就不行
dict_1 = {
    'abc':123,
    'dfe':456,
    ('Name','Sex'): 'yow nan'
}
# 增
dict_1['newkey'] = 'new value'
# 删
# del dict_1['dfe']
dict_1.pop('dfe')
# 查
print (dict_1['abc'])
print (dict_1[('Name','Sex')])
print (dict_1.get('dfe'))
# 改
dict_1['abc'] = 'one two three'
print(dict_1)



dic_a = {
    "a": 1,
    "b": 2
}
dic_b = dic_a

print(id(dic_a))
print(id(dic_b))
dic_a["a"] = "nihao"
print(dic_a)
print(dic_b)


number_list = [1, 2, 3, 5]
print(len(number_list))
print(number_list.__len__())
whether_in_list = ['1', 'b', 1, 'c']
print('b' in whether_in_list)
print('1' in whether_in_list)
print(1 in whether_in_list)


# swap_list = [1, 2]
swap_1 = 2
swap_2 = 1
swap_1, swap_2 = (swap_2, swap_1)
print(swap_1)
print(swap_2)
