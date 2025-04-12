# shared ptr

指向同一个元素时，最后一个释放的元素会调用 delete 函数清理内存。

`memory`
`shared_ptr`
`shared_ptr_atomic`

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

    // faster
    std::shared_ptr<Point> ptr3 = std::make_shared<Point>();
    std::shared_ptr<Point> ptr4 = std::allocate_shared<Point>(std::allocator<Point>());
}
```

使用 shared_ptr ctor 需要分配两次内存，但可以传入自定义的 deleter;
使用 make_shared 只需分配一次内存，将引用和对象放在一起分配，但无法自定义 deleter。

```c++
shared_ptr(const shared_ptr<_Yp>& __r, element_type* __p)
```

这种方法 Alias ctor 用于声明一个 shared_ptr, 其引用次数与`__r` 一致, 但实际指向的对象为`__p`。
一般用于将类中的某个成员。

```c++
class Point{
public:
    int x,y,z;
};

int main(int argc, char **argv) {
    std::shared_ptr<Point> ptr1(new Point());
    // count is 2, but pointer is point.x
    std::shared_ptr<int> ptr2(ptr1, &ptr1->x);
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

允许通过 `shared_from_this()` 获取当前 this 指针所属的拥有组, 前提是必须继承 enable_shared_from_this 类。

```c++
// public inherit
class Point : public std::enable_shared_from_this<Point>{
public:
    int x,y,z;

    // same group
    std::shared_ptr<Point> getPtr(){
        return shared_from_this();
    }

    // not the same group
    std::shared_ptr<Point> getNewPtr(){
        return std::shared_ptr<Point>(this);
    }
};

int main(int argc, char **argv) {
    std::shared_ptr<Point> ptr1(new Point());
    std::shared_ptr<Point> ptr2 = ptr1->getPtr();  // copy
}
```


4. static_pointer_cast

用于指针转型。

5. 并发


shared_ptr不是并发安全的，但为其实现了几个原子操作。

```c++
atomic_store(shared_ptr<_Tp>* __p, shared_ptr<_Tp> __r)
```