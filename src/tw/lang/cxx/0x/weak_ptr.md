# weak_ptr

weak_ptr 将不再作为依赖进行计算。它只能由 share_ptr 产生，使用时也只能先转化为 shared_ptr。

`memory`
`shared_ptr`

## 用法

在循环依赖中，将某一个方向上的 shared_ptr 改为使用 weak_ptr,
可以避免因为循环依赖而无法正常析构。

但 weak_ptr 无法直接使用，要获取其值，必须先将其转化为 shared_ptr，
在这个过程中要检查其引用对象是否已经删除。

```c++
class Point{
public:
    int x,y,z;
};

int main(int argc, char **argv) {
    std::shared_ptr<Point> ptr(new Point());
    std::weak_ptr<Point> wp = ptr;
    wp.lock()->x;
    wp.expired();       // false
    wp.use_count();     // 1
}
```
