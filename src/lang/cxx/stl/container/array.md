# array

`array`

## 声明

array 是一个 aggregate struct, 没有自定义的 ctor, 只能用聚合初始化。

```c++
std::array<int, 4> l = { 10, 1, 2, 3};
```

::: tip

聚合体（aggregate）是一种特殊的类或结构体，它满足以下条件：

1. 没有用户提供的、显式的或继承的构造函数。
2. 没有私有或受保护的非静态数据成员。
3. 没有虚函数。
4. 没有虚基类。

聚合初始化不同于 initializer_list, 聚合结构没有定义这样的 ctor

```c++
struct Point {
    int x;
    int y;
};
```
:::

## Usage

1. move

虽然 std::array 支持移动语义，但由于其元素是直接存储在对象内部的，移动操作实际上是逐元素的移动，对于基本数据类型（如 int、double 等），移动操作和复制操作的性能差异不大。

2. 