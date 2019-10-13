# 基本数据类型

> Python中，万物皆对象。

> id()是python的内置函数，用于返回对象的身份，即对象的内存地址。

> type(a),isinstance(a, int) ,判断变量类型

## 不可变数据（3 个）

> (值修改--->内存地址变更)当该数据类型的对应的变量的值发生了改变，那么它对应的内存地址也会发生改变。可作为key值(canhashable)

- Number（数字）：int,float,bool,complex
- String（字符串）
- Tuple（元组）

## 可变数据（3 个）

> (值修改--->内存地址不变)当该数据类型的对应的变量的值发生了改变，那么它对应的内存地址不发生改变。不可作为key值(unhashable)

- List（列表）
- Dictionary（字典）
- Set（集合）

## 空值
- None

### Python中各种“数组”类型，这里把数组当作一个广义的概念，即把列表、序列、数组都当作array-like数据类型。
- 可变的动态列表list
- 不可变的tuple
- array.array
- 字符串序列str
- bytes
- bytearray

## Python内存管理机制
> 引用计数机制为主，标记-清除和分代收集两种机制为辅的策略。

1. 变量，通过变量指针引用对象,变量指针指向具体对象的内存空间，取对象的值。
2. 对象，类型已知，每个对象都包含一个头部信息（头部信息：类型标识符和引用计数器），在python中每一个对象的核心就是一个结构体PyObject.
```c
#define PyObject_HEAD
    Py_ssize_t ob_refcnt;
    // 记录引用次数，以此作为垃圾回收依据，但并不是引用为0就会释放空间，还涉及到内存池管理
    struct _typeobject *ob_type;
    // 这是所有python object共用的一部分，所以在源码内部相互传递对象的时候，所有对象都能用PyObject* 来表示，同时这个ob_type指明了这个对象的类型，从而实现了c语言不提供但C++提供的多态特性(使用大量的函数指针实现)

typedef struct _object {
    PyObject_HEAD
} PyObject;
```


