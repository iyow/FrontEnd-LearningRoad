# 类方法 类属性   类名和实例皆可调用，但是实例无法修改类方法和类属性
# 实例方法 实例属性
# 静态方法 类名和实例皆可调用
# 私有方法 私有属性
import types


class MyClass(object):
    # 限制动态 添加的属性 优化内存使用  对于继承的子类不起作用
    # __slots__ = ('__private_prop_1', '__private_prop_2', 'name')
    # 类属性 在各实例间共享
    class_share_prop = '类属性'
    # 类方法
    @classmethod
    def class_method_show(cls):
        cls.class_share_prop = 'xiugai : 类属性，在各实例中共享'
        print('类方法执行')

    @staticmethod
    def class_static_method():
        print('静态方法')

    # 负责对象的创建，cls,代表要实例化的类
    # 必须要有返回值返回实例化出来的实例

    def __new__(cls, x, y):
        print('-----new----执行')
        # 调用父类 创建对象
        return super(MyClass, cls).__new__(cls)
        # 相同：return super().__new__(cls)
        # 或者直接使用object创建
        # return object.__new__(cls)

    # 负责对象的初始化
    def __init__(self, x, y):
        # 初始化父类
        super(MyClass, self).__init__()
        print('----init---初始化', x, y)
        self.__private_prop_1 = '实例私有属性'
        self.__private_prop_2 = 'how to use property'
        self.name = x+y

    # 销毁对象时执行
    def __del__(self):
        print('析构方法执行')

    def __str__(self):
        print('字符串化的时候执行例如 str()')
        return 'this is a class named myclass'

    def __private_method_1(self):
        print('私有方法')

    # property的使用
    def get_prop_2(self):
        print('get-----prop---2')
        return self.__private_prop_2

    def set_prop_2(self, p):
        print('set-----prop---2')
        self.__private_prop_2 = p

    def del_prop_2(self):
        print('del-----prop---2')

    prop_2 = property(get_prop_2, set_prop_2, del_prop_2, '描述-----')

    # 使用装饰器实现property
    # getter
    @property
    def decoration_prop_2(self):
        print('decorator----get-----prop---2')
        return self.__private_prop_2

    @decoration_prop_2.setter
    def decoration_prop_2(self, p):
        print('decorator----set-----prop---2')
        self.__private_prop_2 = p

    # callabel
    def __call__(self):
        print(self.name)

    # 属性访问拦截器
    def __getattribute__(self, obj):
        if obj == 'subject1':
            print('log subject1')
            return 'redirect python'
        else:
            return object.__getattribute__(self, obj)


print(MyClass)
instance = MyClass(1, 2)
instance()
print(instance.prop_2)
print(instance.decoration_prop_2)
instance.prop_2 = 213
# print(instance.prop_2.__doc__)
# print(help(instance.prop_2))


# 动态添加属性和方法
# @classmethod  staticmethod 写上装饰器  就是类方法(此时别忘传入cls)和静态方法
def append_method(self):
    return '----动态添加的实例方法执行' + str(self.name)


# 对类添加
MyClass.class_prop = '类属性，在各实例中共享'
MyClass.append_method = append_method
new_instance = MyClass(1, 2)
print(new_instance.class_prop)

# 对实例添加
new_instance.instace_prop = '添加实例属性'
# 添加方法
# new_instance.append_method = append_method
# print(new_instance.append_method(new_instance))
# new_instance.append_method = types.MethodType(append_method, new_instance)
print(new_instance.append_method())

print(new_instance.class_share_prop)
new_instance.class_method_show()
print(new_instance.class_share_prop)
