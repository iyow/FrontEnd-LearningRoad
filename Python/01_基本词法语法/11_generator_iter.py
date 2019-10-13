import sys

# 通过列表生成式，我们可以直接创建一个列表。
# 但是，受到内存限制，列表容量肯定是有限的。
# 而且，创建一个包含100万个元素的列表，不仅占用很大的存储空间，
# 如果我们仅仅需要访问前面几个元素，那后面绝大多数元素占用的空间都白白浪费了。
# 所以，如果列表元素可以按照某种算法推算出来，
# 那我们是否可以在循环的过程中不断推算出后续的元素呢？
# 这样就不必创建完整的list，从而节省大量的空间。
# 在Python中，这种一边循环一边计算的机制，称为生成器：generator。

# 使用了 yield 的函数被称为生成器（generator）


def fibonacci(n):
    # 生成器函数 - 斐波那契
    a, b, counter = 0, 1, 0
    while True:
        if (counter > n):
            return
        # 可根据返回值 进行程序流程控制---实现状态机
        temp = yield a
        a, b = b, a + b
        counter += 1
        print('----yield 返回值', temp)


f = fibonacci(10)
# f 是一个迭代器，由生成器返回生成
while True:
    try:
        print(next(f))
    except StopIteration:
        sys.exit()

# next(f)
# send(f)


# iterator
# 生成器都是 Iterator 对象，但 list 、 dict 、 str 虽然是 Iterable ，却不是 Iterator 。
# 把 list 、 dict 、 str 等 Iterable 变成 Iterator 可以使用 iter() 函数：


class IterNumber(object):
    def __iter__(self):
        self.a = 1
        return self

    def __next__(self):
        if self.a <= 20:
            x = self.a
            self.a += 1
            return x
        else:
            raise StopIteration


print(iter(IterNumber()))
for x in IterNumber():
    print(x)
