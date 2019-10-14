import unittest
from hello import *


class TestHello(unittest.TestCase):
    # 测试say_hello函数
    def test_say_hello(self):
        self.assertEqual(say_hello(), "Hello World.")
    # 测试add函数

    def test_add(self):
        self.assertEqual(add(3, 4), 7)
        self.assertEqual(add(0, 4), 4)
        self.assertEqual(add(-3, 0), -3)
