class switch(object):
    def __init__(self, value):
        self.value = value
        self.fall = False

    def __iter__(self):
        """Return the match method once, then stop只迭代一次并返回match方法目的只是为了使用上的美观？"""
        yield self.match
        raise StopIteration

    def match(self, *args):
        print(args)
        """Indicate whether or not to enter a case suite"""
        if self.fall or not args:
            return True
        elif self.value in args:
            self.fall = True
            return True
        else:
            return False


c = 'z'
for case in switch(c):
    if case('a'):
        pass  # only necessary if the rest of the suite is empty
    if case('b'):
        pass
    # ...
    if case('y'):
        pass
    if case('z'):
        print("c is lowercase!")
        break
    if case('A'):
        pass
    # ...
    if case('Z'):
        print("c is uppercase!")
        break
    if case():  # default
        print("I dunno what c was!")