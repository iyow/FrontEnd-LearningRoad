def square(x):
    '''
    一个用于计算平方的函数
    例如
    >>> square(2)
    4
    >>> square(3)
    9
    >>> square(-3)
    9
    >>> square(0)
    0
    '''
    # 为 square() 函数提供的测试用例，在文档中一共为该函数提供了 4 个测试用例
    return x * 2  # ①、故意写错的


class User:
    '''
    定义一个代表用户的类，该类包含如下两个属性：
    name - 代表用户的名字
    age - 代表用户的年龄
    例如
    >>> u = User('fkjava', 9)
    >>> u.name
    'fkjava'
    >>> u.age
    9
    >>> u.say('i love python')
    'fkjava说: i love python'
    '''
    # 为 User 类提供的测试用例，
    # 在文档中一共为该类提供了 3 个测试用例，
    # 分别用于测试用户的 name 、age 和 say() 方法

    def __init__(self, name, age):
        self.name = 'fkit'  # ②、故意写错的
        self.age = age

    def say(self, content):
        return self.name + '说: ' + content

# 接使用 python 命令来运行该程序（__name__ 等于 __main__），
# 程序将导入 doctest 模块，并调用该模块的 testmod() 函数。
if __name__ == '__main__':
    import doctest
    doctest.testmod()
