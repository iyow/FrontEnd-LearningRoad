class Role:
    pass


r = Role()
# isinstance(r, Role)
print(Role)
# 查看变量r的类型
print(type(r))
# 查看Role类本身的类型
print(type(Role))
# 3.7
# <class '__main__.Role'>
# <class '__main__.Role'>
# <class 'type'>
# 2.7
# __main__.Role
# <type 'instance'>
# <type 'classobj'>


class X(object):
    a = 1


XX = type('XX', (object,), dict(a=1))  # 产生一个新的类型 XX
print('------X和XX')
print(X)
print(XX)
# <class '__main__.X'>
# <class '__main__.X'>
print('类型------X和XX类')
print(type(X))
print(type(XX))
print('类型------实例化X和XX')
print(type(X()))
print(type(XX()))
