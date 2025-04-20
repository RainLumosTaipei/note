# iterator adapter

迭代器适配器可以用来转换迭代器的行为。

`iterator`

## insert

1. back_insert

back_insert重载了operator=, 将其改为push_back操作，从而将赋值运算改为插入操作。
这样做可以方便赋值，而不需要考虑容器的大小。

2. front_inserter

3. inserter

## reverse


## iostream

```c++
int main(int argc, char **argv) {
    std::vector<int> v {1,2,3,4,5,6,7};
    std::ostream_iterator<int> out(std::cout, " ");
    std::istream_iterator<int> in(std::cin), eof;

    std::copy(in, eof, std::back_inserter(v));
    std::copy(v.begin(), v.end(), out);
}
```

```c++
std::vector<int> v ((std::istream_iterator<int>(std::cin)), std::istream_iterator<int>());
```
