# PyUnit（unittest） 是 Python 自带的单元测试框架，
# 用于编写和运行可重复的测试。PyUnit 是 xUnit 体系的一个成员，
# xUnit 是众多测试框架的总称，PyUnit 主要用于进行白盒测试和回归测试。

# 所有测试的本质其实都是一样的，都是通过给定参数来执行函数，
# 然后判断函数的实际输出结果和期望输出结果是否一致。

import unittest
from fk_math import *

# unittest 一共提供了 3 个装饰器，
# 分别是 ＠unittest.skip(reason)、
# @unittest.skipIf(condition, reason) 和 
# ＠unittest.skipUnless(condition, reason)。
# 其中 skip 代表无条件跳过，
# skipIf 代表当 condition 为 True 时跳过；
# skipUnless 代表当 condition 为 False 时跳过。
class TestFkMath(unittest.TestCase):
    # 测试一元一次方程的求解
    def test_one_equation(self):
        # 断言该方程求解应该为-1.8
        self.assertEqual(one_equation(5, 9), -1.8)
        # 断言该方程求解应该为-2.5
        self.assertTrue(one_equation(4, 10) == -2.5, .00001)
        # 断言该方程求解应该为27/4
        self.assertTrue(one_equation(4, -27) == 27 / 4)
        # 断言当a == 0时的情况，断言引发ValueError
        with self.assertRaises(ValueError):
            one_equation(0, 9)
    # 测试一元二次方程的求解

    def test_two_equation(self):
        r1, r2 = two_equation(1, -3, 2)
        self.assertCountEqual((r1, r2), (1.0, 2.0), '求解出错')
        r1, r2 = two_equation(2, -7, 6)
        self.assertCountEqual((r1, r2), (1.5, 2.0), '求解出错')
        # 断言只有一个解的情形
        r = two_equation(1, -4, 4)
        self.assertEqual(r, 2.0, '求解出错')
        # 断言当a == 0时的情况，断言引发ValueError
        with self.assertRaises(ValueError):
            two_equation(0, 9, 3)
        # 断言引发ValueError
        with self.assertRaises(ValueError):
            two_equation(4, 2, 3)

# 或者直接 python -m unittest 测试文件
if __name__ == '__main__':
    unittest.main()
