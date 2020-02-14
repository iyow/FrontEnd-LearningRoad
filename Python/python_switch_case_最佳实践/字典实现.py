def foo(var):
    return {
        'a': 1,
        'b': 2,
        'c': 3,
    }.get(var, 'error')  # 'error'为默认返回值，可自设置