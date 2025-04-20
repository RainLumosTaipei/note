# vexing parse

对于某些语句，有多种解释方式；如果一个语句既可以为对象，
又可以是函数，则优先选择函数。

## example

```c++
std::vector<int> v (std::istream_iterator<int>(std::cin), std::istream_iterator<int>());
```

它既可以被理解为定义一个名为 v1 的 `std::vector<int>` 对象，使用两个 `std::istream_iterator<int>` 迭代器来初始化这个向量，这两个迭代器分别从标准输入流 std::cin 读取数据。

也可以被解释为声明一个名为 v1 的函数，该函数返回一个 `std::vector<int>` 对象，此函数接受两个参数：
第一个参数是一个函数指针，这个函数接受一个 std::istream& 类型的参数，返回一个 `std::istream_iterator<int>` 对象。
第二个参数是一个函数指针，这个函数不接受任何参数，返回一个 `std::istream_iterator<int>` 对象。

## solution

1. add paren

```c++
std::vector<int> v ((std::istream_iterator<int>(std::cin)), std::istream_iterator<int>());
```

2. use initialize_list

```c++
std::vector<int> v {std::istream_iterator<int>(std::cin), std::istream_iterator<int>()};
```
