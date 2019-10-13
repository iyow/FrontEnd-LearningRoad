# 元类
# MyClass = MetaClass() #使用元类创建出一个对象，这个对象称为“类”
# MyObject = MyClass() #使用“类”来创建出实例对象
# 元类作用
# 拦截类的创建
# 修改类
# 返回修改之后的类
class UpperAttrMetaClass(type):
    # __new__ 是在__init__之前被调用的特殊方法
    # __new__是用来创建对象并返回之的方法
    # 而__init__只是用来将传入的参数初始化给对象
    # 你很少用到__new__，除非你希望能够控制对象的创建
    # 这里，创建的对象是类，我们希望能够自定义它，所以我们这里改写__new__
    # 如果你希望的话，你也可以在__init__中做些事情
    # 还有一些高级的用法会涉及到改写__call__特殊方法，但是我们这里不用
    def __new__(cls, future_class_name, future_class_parents, future_class_attr):
        # 遍历属性字典，把不是__开头的属性名字变为大写
        newAttr = {}
        for name, value in future_class_attr.items():
            if not name.startswith("__"):
                newAttr[name.upper()] = value

        # 方法1：通过'type'来做类对象的创建
        # return type(future_class_name, future_class_parents, newAttr)

        # 方法2：复用type.__new__方法
        # 这就是基本的OOP编程，没什么魔法
        # return type.__new__(cls, future_class_name, future_class_parents, newAttr)

        # 方法3：使用super方法
        return super(UpperAttrMetaClass, cls).__new__(cls, future_class_name, future_class_parents, newAttr)

# python2的用法
# class Foo(object):
#     __metaclass__ = UpperAttrMetaClass
#     bar = 'bip'

# python3的用法


class Foo(object, metaclass=UpperAttrMetaClass):
    bar = 'bip'


print(hasattr(Foo, 'bar'))
# 输出: False
print(hasattr(Foo, 'BAR'))
# 输出:True

f = Foo()
print(f.BAR)
# 输出:'bip'

print(f.__class__)
print(f.__class__.__class__)
print(f.__class__.__class__.__class__)
