# 数字类型为不可变类型，如果改变数字数据类型的值，将重新分配内存空间，
# 可以使用引号( ' 或 " 或 """)来创建字符串。

# 转换 str(a)
string_1 = 'nihao hello '
string_2 = 'shijie world'
string_3 = """sadasd    

asd"""
print(string_1,string_2,string_3)

# 字符串运算符
string_join   = string_1 + string_2
string_repeat = string_1 * 3
# [start:end:step]
string_slice  = string_1[:6] + string_join[::-1] + string_2[-6:]
print('shij' in string_2)
print('shij' not in string_1)
print(string_repeat,string_slice)

# other
# 字符串内建函数