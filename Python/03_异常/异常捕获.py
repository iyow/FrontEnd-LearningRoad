import sys
# 自定义一个异常  继承自 Exception
class MyCustomError(Exception):
    def __init__(self,info):
        self.info = info
    def __str__(self):
        # repr可将对象转化为供解释器读取的形式。
        return repr(self.info)
try:
    try:
        print(x)
    # 如果异常的类型和 except 之后的名称相符，那么对应的except子句将被执行。
    # 最后执行 try 语句之后的代码
    except NameError:
        print('NameError Occurred',NameError)
    except (RuntimeError, TypeError):
        # sys.exc_info() 返回异常的全部信息
        print('ValueError Occurred',sys.exc_info())
    except ZeroDivisionError as err:
        print('ZeroDivisionError Occurred',err)
        # 抛出异常throw
        raise MyCustomError('自定义异常抛出')
    except Exception:
        print('通用异常拦截----')
    # else放在所有except子句之后
    # 若 try 未发生任何异常将会执行
    # 若 try 中发生了异常将不会执行
    else:
        print('try未发生任何异常---做些什么。。')
    finally:
        print('无论在任何情况下都会执行的清理行为')
except MyCustomError:
    print('捕获到自定义的错误')