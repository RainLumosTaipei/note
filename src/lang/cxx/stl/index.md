# stl

## container

所有容器都是 copy or move 操作，而不是保存 reference。
如果要保存引用需要使用指针。

```c++
int main() {
    std::vector<Point> v;
    std::list<Point> l(std::make_move_iterator(v.begin()), std::make_move_iterator(v.end()));
    return 0;
}
```