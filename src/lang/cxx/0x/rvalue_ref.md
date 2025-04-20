# Rvalue reference


## 

```c++
Point retLocal(){
    Point p;
    return p;
}
```

1. RVO

编译器会尝试不使用构造函数，直接在返回的位置构造局部对象。

2. move ctor

调用move ctor

3. copy ctor

调用copy ctor

##

1. make_move_iterator

```c++
int main() {
    std::vector<Point> v;
    std::list<Point> l(std::make_move_iterator(v.begin()), std::make_move_iterator(v.end()));
    return 0;
}
```