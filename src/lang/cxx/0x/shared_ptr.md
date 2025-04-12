# shared ptr

指向同一个元素时，最后一个释放的元素会调用 delete 函数清理内存。

`memory`
`shared_ptr`

## 声明

```c++
shared_ptr(_Yp* __p, _Deleter __d, _Alloc __a)
```

- 一个类型指针
- delete 重载函数，可以使用 functor 或 Lamda
- 分配器

```c++
class Point{};

class PointDeleter{
public:
    void operator() (Point* p){
        delete p;
    }
};

int main(int argc, char **argv) {
    // Lamda
    std::shared_ptr<Point> ptr1(new Point(),[](Point* p){
        delete p;
    });

    // functor
    std::shared_ptr<Point> ptr2(new Point(), PointDeleter());
}
```

## 用法

1. shared_ptr 只提供 operator \* 和 operator ->, 其他的指针操作需要获取其内部指针来完成。

```c++
shared_ptr<Point> ptr;

ptr.get()[10] = 10;
(&*ptr)[10] = 10;
```

2. shared_ptr 的所有权应当通过 copy

```c++
class Point{
public:
    int x,y,z;
};

int main(int argc, char **argv) {
    std::shared_ptr<Point> ptr1(new Point());       // first group
    std::shared_ptr<Point> ptr2(new Point());       // second group
    std::shared_ptr<Point> ptr3(ptr1);              // first group
}
```

不同组的 shared_ptr 会分别计算引用数，当最后一个引用失效时，都会调用 delete，
因此会出现重复调用的情况；应当使用 copy 来确保所用 shared_ptr 属于同一组内。

应当谨慎注意这一点，尤其是当添加 shared_ptr 时。

3. enable_shared_from_this

允许通过 `shared_from_this()` 获取当前 this 指针所属的拥有组
