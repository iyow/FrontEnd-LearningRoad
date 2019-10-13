import typing

# 生成复合类型, 类型别名
FloatVector = typing.List[float]
StrList = typing.List[str]
MyT = typing.TypeVar('T')


class Role:
    pass


r = Role()

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
    def __init__(self):
        # type: () -> None
        self.num = 4  # type: int
        self.color = '蓝色'  # type: str
        self.elements = []  # type: List[int]

    def add(self, param1: str) -> str:
        # type: (str) -> str
        """第二种需求
        比较简单, 需要先了解 typing 这个库
        :param a:
        :param b:
        :param c:
        :return:
        """
        pass


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


# type hint
def type_func(param: str) -> str:
    pass


print(typing.get_type_hints(X))
print(typing.get_type_hints(type_func))
