# initializer_list

初值列表可以用来初始化一个类，使用`{}`包裹元素即可，
为所有类和内置类型提供统一的初始化方法。

`initializer_list`

## 使用

- class()

使用`()`初始化，一定调用 ctor，不会调用 initializer_list

- class{}

使用`{}`初始化，优先调用 initializer_list，如果不存在，则调用 ctor

```c++
class Point{
public:
    Point(int a, int b){
        std::cout<< "Point(int a, int b)" << std::endl;
    }

    explicit Point(int a, int b, int c){
        std::cout<< "Point(int a, int b, int c)" << std::endl;
    }

    Point(std::initializer_list<int> l){
        std::cout<< "Point(initializer_list<int> l)" << std::endl;
    }
};

int main(int argc, char **argv) {
    Point{1};               // Point(initializer_list<int> l)
    Point(1, 2);            // Point(int a, int b)
    Point{1, 2};            // Point(initializer_list<int> l)
    Point p = {1, 2};       // Point(initializer_list<int> l)
    Point(1, 2, 3);         // Point(int a, int b, int c)
    Point{1, 2, 3};         // Point(initializer_list<int> l)
    Point q = {1, 2, 3};    // Point(initializer_list<int> l)
                            // Point(int a, int b, int c) is explicit！！！
}
```

要注意如果没有`initializer_list`，表达式`Point q = {1, 2, 3}`是有问题的，
因为`Point(int a, int b, int c)`不允许隐式调用。

```c++
int i = int();  // 0
int j{};        // 0
```

内置标量也可以像类一样调用 ctor 初始化为 0。这不同于 java 额外封装了包装类:)。

::: tip
没有明确写出类名 ctor 都被认为是 implicit
:::

## 声明

```c++
template<class _E>
class initializer_list
{
public:
    typedef _E 		value_type;
    typedef const _E& 	reference;
    typedef const _E& 	const_reference;
    typedef size_t 		size_type;
    typedef const _E* 	iterator;
    typedef const _E* 	const_iterator;

private:
    iterator			_M_array;
    size_type			_M_len;

public:
    constexpr initializer_list() noexcept
    : _M_array(0), _M_len(0) { }

    // Number of elements.
    constexpr size_type
    size() const noexcept { return _M_len; }

    // First element.
    constexpr const_iterator
    begin() const noexcept { return _M_array; }

    // One past the last element.
    constexpr const_iterator
    end() const noexcept { return begin() + size(); }
}
```

应该注意 initializer_list 提供了 begin 和 end，
所以可以被用于 Range-Based for 循环

## 注意

initializer_list 的 ctor 不应该被声明为 explicit，应该允许进行隐式转换。
如果一个类的元素数目不定，通常是容器，使用 initializer_list 可以避免手动创建数组。
应该注意`{}`兼容`()`，所以使用`{}`更统一规范。
