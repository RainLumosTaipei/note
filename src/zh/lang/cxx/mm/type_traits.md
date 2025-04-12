# type_traits

用于标识一个数据类型是否使用默认的ctor, dtor等内存函数。这样可以优化这些操作。

难点：需要兼容int, char等内置类型，所以使用traits技巧。

`cpp_type_traits`
`type_traits`

## 声明


```c++
struct __false_type{};   // false type
struct __true_type{};   // true type

template<class type>
struct __type_traits{
    typedef __false_type has_trivial_default_constructor;   // ctor
    typedef __false_type has_trivial_copy_constructor;      // copy
    typedef __false_type has_trivial_assignment_operator;   // assign
    typedef __false_type has_trivial_destructor;            // dtor
    typedef __false_type is_POD_type;                       // plain old data
};
```


对于内置类型，需要进行模版特化：

```c++
template<>
struct __type_traits<char>{
    typedef __true_type has_trivial_default_constructor;
    typedef __true_type has_trivial_copy_constructor;
    typedef __true_type has_trivial_assignment_operator;
    typedef __true_type has_trivial_destructor;
    typedef __true_type is_POD_type;
};
```
