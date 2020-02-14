# def handle_case_origin(case):
#     if case == 1:
#         print('case 1')
#     elif case == 2:
#         print('case 2')
#     else:
#         print('default case')
from functools import update_wrapper
from types import MappingProxyType
from typing import Hashable, Callable, Union


def specificdispatch(key: Union[int, str] = 0) -> Callable:
    """specific-dispatch generic function decorator.

    Transforms a function into a generic function, which can have different
    behaviours depending upon the value of its key of arguments or key of keyword arguments.
    The decorated function acts as the default implementation, and additional
    implementations can be registered using the register() attribute of the
    generic function.
    """

    def decorate(func: Callable) -> Callable:
        registry = {}

        def dispatch(key: Hashable) -> Callable:
            """
            Runs the dispatch algorithm to return the best available implementation
            for the given *key* registered on *generic_func*.
            """
            try:
                impl = registry[key]
            except KeyError:
                impl = registry[object]
            return impl

        def register(key: Hashable, func: Callable = None) -> Callable:
            """
            Registers a new implementation for the given *key* on a *generic_func*.
            """
            if func is None:
                return lambda f: register(key, f)

            registry[key] = func
            return func

        def wrapper_index(*args, **kw):
            return dispatch(args[key])(*args, **kw)

        def wrapper_keyword(*args, **kw):
            return dispatch(kw[key])(*args, **kw)

        registry[object] = func
        if isinstance(key, int):
            wrapper = wrapper_index
        elif isinstance(key, str):
            wrapper = wrapper_keyword
        else:
            raise KeyError('The key must be int or str')
        wrapper.register = register
        wrapper.dispatch = dispatch
        wrapper.registry = MappingProxyType(registry)
        update_wrapper(wrapper, func)

        return wrapper

    return decorate


@specificdispatch(key=0)
def handle_case(case):
    print('default case')


@handle_case.register(1)
def _(case):
    print('case 1')


@handle_case.register(2)
def _(case):
    print('case 2')


handle_case(1)  # case 1
handle_case(0)  # default case


# Test
class Test:
    @specificdispatch(key=1)
    def test_dispatch(self, message, *args, **kw):
        print(f'default: {message} args:{args} kw:{kw}')

    @test_dispatch.register('test')
    def _(self, message, *args, **kw):
        print(f'test: {message} args:{args} kw:{kw}')


test = Test()
# default: default args:(1,) kw:{'test': True}
test.test_dispatch('default', 1, test=True)
# test: test args:(1,) kw:{'test': True}
test.test_dispatch('test', 1, test=True)


@specificdispatch(key='case')
def handle_case_test(case):
    print('default case')


@handle_case_test.register(1)
def _(case):
    print('case 1')


@handle_case_test.register(2)
def _(case):
    print('case 2')


handle_case_test(case=1)  # case 1
handle_case_test(case=0)  # default case
