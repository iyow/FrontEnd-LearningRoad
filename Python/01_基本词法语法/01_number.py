# -*- coding: utf-8 -*-
# 指定字符编码

# 数字类型为不可变类型，如果改变数字数据类型的值，将重新分配内存空间
# 相同值 在内存池中将会被重复使用
# 小整数对象池，Python为了优化速度，使用了小整数对象池， 避免为整数频繁申请和销毁内存空间。
# 小整数的定义是 [-5, 257) 这些整数对象是提前建立好的，不会被垃圾回收。

number_1 = 123
number_2 = 123
print(id(number_1))
print(id(number_1) == id(number_2))
number_1 = 666
print(id(number_1))
print(id(number_1) == id(number_2))

# 删除引用
del number_1,number_2

# 十六进制  0xA0F
# 八进制    0o37
# 二进制    0b1111

# int 整型 ，py3无大小限制可当做long类型使用，所以Python3没有long类型，转换 int(x) 
number_int     = 120
number_int_hex = 0xA0F
number_int_oct = 0o37
number_int_bin = 0b1111
print(number_int,number_int_hex,number_int_oct,number_int_bin)
# float 浮点型 ，转换 float(x)
number_float          = 1.8
number_float_division = 17.0 / 3
number_float_round    = 17.0 // 3
# mod全文为model,希腊文取余的意思，高斯正式用来求余，mod是缩写。
number_float_mod      = 17.0 % 3 
number_float_square      = 17.0 ** 3 
print(number_float,number_float_division,number_float_round,number_float_mod,number_float_square)

# complex 复数 ，由实部虚部构成，使用 a + bj 或者 complex(a,b) 表示 a,b皆为float型 ，转换 complex(x, y)
number_complex_1 = complex(2, 4)
number_complex_2 =  3 - 5j
print(number_complex_2.real,number_complex_2.imag)
print(number_complex_1 + number_complex_2)
print(number_complex_1 * number_complex_2)
print(number_complex_1 / number_complex_2)

# other
# 数学函数
# 随机数函数
# 三角函数
# 数学常量