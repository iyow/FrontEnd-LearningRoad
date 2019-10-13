# 带参数的 装饰器
# 用于闭包传值


def wrap(need_verify):
    # 真正的  装饰器  函数
    def decorator_func(func):
        def inner_func(*args, **kwargs):
            # do something
            print('inner func run')
            result = None
            if need_verify:
                print('验证成功并被装饰')
                result = func(*args, **kwargs)
            else:
                print('无需验证')
                result = func(*args, **kwargs)
            return result
        return inner_func
    return decorator_func


def wrap_simple(func):
    def inner_func():
        print('hello -decorator')
        func()
    return inner_func

# oringin_func = wrap(true)(origin_func) 的语法糖
@wrap(True)
# @wrap_simple
def origin_func():
    print('我是原始函数')


origin_func()


# 装饰器调用 顺序
# 需要注意 原函数 有参数时 装饰器函数也需要 传递参数
def make_bold(func):
    print('--1--')

    # 通用方法---使用不定长参数
    def decorator_warped(*args, **kwargs):
        print('--innner--2--')
        # 注意此处参数传入
        return '<b>' + func(*args, **kwargs) + '</b>'
    return decorator_warped


def make_italic(func):
    print('--2--')

    def decorator_wrapped(love_name):
        print('--innner--1-----包在函数最外层')
        return '<i>'+func(love_name)+'</i>'
    return decorator_wrapped


print('---装饰器--初始化')
# show_title = make_italic(make_bold(show_title))
@make_italic
@make_bold
def show_title(title):
    print('--3--原始函数执行')
    return 'ich liebe dich' + title


print('----开始执行')
print(show_title('❥(^_-)iyow(^_-)❥'))


# 类装饰器
# Python中一般callable对象都是函数，
# 但也有例外。只要某个对象重写了 __call__() 方法，那么这个对象就是callable的。
# 所以 类实例化 的时候传入 需要装饰的函数  callable实例调用__call__进行装饰
class CallableTest(object):
    def __init__(self, func):
        print("---初始化---")
        print("func name is %s" % func.__name__)
        self.__func = func

    def __call__(self):
        print('call me!')
        print("---类装饰器中的功能---")
        self.__func()

# instance = CallableTest(test)
# instance() ---> instance.__call__()
@CallableTest
def test():
    print("----test---")


print('----'*8)
test()
