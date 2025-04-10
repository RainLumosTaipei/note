# Range Based For

range based for 循环可以用来遍历容器，数组，以及 initializer_list

难点：统一 begin 和 end

`range_access`

## 声明

```c++
template<typename _Tp, size_t _Nm>
inline _Tp* begin(_Tp (&__arr)[_Nm]) noexcept
{
    return __arr;
}

template<typename _Tp, size_t _Nm>
inline _Tp* end(_Tp (&__arr)[_Nm]) noexcept
{
    return __arr + _Nm;
}
```

`_Tp (&__arr)[_Nm]` 是函数的参数，它是一个对大小为 `_Nm`、元素类型为 `_Tp` 的数组的引用。使用引用可以避免数组退化为指针，从而保留数组的大小信息。

`void func(int (&arr)[10])`注意`&`与变量名在一起

```c++
int main(int argc, char **argv) {
    int arr[] = {1,2};
    int* p = std::end(arr) -1;  // end<int, 2>
    std::cout << *p;
}
```

在使用时编译器会自动推导模版类型，从而巧妙传递了数组长度。
