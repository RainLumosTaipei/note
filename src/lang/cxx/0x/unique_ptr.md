# unique ptr

独占资源，用来替代 auto_ptr。主要用于 new 声明的函数局部变量，
由于可能有异常等情况，可能无法正常处理，而 unique_ptr 可以解决这种情况。

`unique_ptr`

## 声明

```c++
unique_ptr(pointer __p, const deleter_type& __d)
```

## 用法

1. 不允许 copy 和 assignment

```c++
unique_ptr(const unique_ptr&) = delete;
unique_ptr& operator=(const unique_ptr&) = delete;
```

不允许 copy 和 assignment，只能在构造时初始化，但可以使用移动语义。
注意，这会导致包含 unique_ptr 的 class 无法使用默认的 copy 和 assignment 函数。

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

注意 auto_ptr 的赋值操作是 copy 语义。

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

3. 作为函数参数和返回值进行转移

```c++
std::unique_ptr<Point> source(){
    auto ptr = std::make_unique<Point>();
    return ptr;     // auto move
}
```

```c++
void sink(std::unique_ptr<Point> ptr);

int main(int argc, char **argv) {
    std::unique_ptr<Point> ptr(new Point());
    sink(std::move(ptr));
}
```

4. 作为类成员

在 class 内使用 unique_ptr 可避免资源泄漏。如果你使用 unique_ptr 取代寻常 pointer，
就不再需要析构函数，因为对象被删除会连带使所有成员被删除。
此外 unique-ptr 也可协助避免对象初始化期间因抛出异常而造成资源泄漏。
注意，只有当一切构造动作都完成了，
析构函数才有可能被调用。因此一旦构造期间发生异常，只有那些已完全构造好的对象，
其析构函数才会被调用。所以，对于拥有多个 rawpointer 的 class，
如果构造期间第一个 new 成功而第二个失败，就可能导致资源泄漏。

使用 unique_ptr 可以自动调用 delete，无需手动编写 delete 函数。
但是需要写 copy 和 assignment 函数。

```c++
class Point {
public:
    int x;
    Point():x(0){}
};


class A{
public:
    std::unique_ptr<Point> p;

    A():p(new Point()){}

    A(const A& other){
        *p = *other.p;
    }

    A& operator= (const A& other){
        *p = *other.p;
        return *this;
    }
};
```

5. 对于数组

```c++
template<typename _Tp, typename _Dp>
class unique_ptr<_Tp[], _Dp>
```

```c++
int main() {
    std::unique_ptr<Point[]> ptr(new Point[10]);
    return 0;
}
```

6. 定义自己的 deleter