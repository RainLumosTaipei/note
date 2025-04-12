# unique ptr

独占资源，用来替代 auto_ptr。主要用于 new 声明的函数局部变量，
由于可能有异常等情况，可能无法正常处理，而 unique_ptr 可以解决这种情况。

`unique_ptr`

## 声明

```c++
unique_ptr(pointer __p, const deleter_type& __d)
```

## 用法

1. 不允许赋值，只能在构造时初始化，但可以使用移动语义

```c++
class Point{
public:
    int x,y,z;
};

int main(int argc, char **argv) {
    std::unique_ptr<Point> ptr(new Point());    // ok
    std::unique_ptr<Point> ptr1 = ptr;          // wrong!!!
    std::unique_ptr<Point> ptr2 = std::move(ptr); // OK
}
```

2. 可以作判断是否为空

```c++
explicit operator bool() const noexcept
{
    return get() == pointer() ? false : true;
}
```

注意此处虽然声明为 explicit, 但可以在 if 和逻辑运算符中隐式使用。

```c++
class Point{
public:
    int x,y,z;
};

int main(int argc, char **argv) {
    std::unique_ptr<Point> ptr(new Point());
    if(ptr){
        std::cout<< ptr->x;
    }
}
```
