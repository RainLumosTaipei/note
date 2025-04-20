# iterator

迭代器用于提供容器的访问，在 C 中表现为指针，所以迭代器的行为模拟指针。

难点在于兼容原始的 C 指针。

`stl_iterator_base_types`
`stl_iterator`

## iterator traits


迭代器特征使用模版的方法为迭代器封装一个可以表示类型的接口。
之所以用模版，是因为只有模版可以推导类型，再结合 typedef 就可以很好的传递类型。

- value_type: 指针指向的类型
- different_type: 指针距离类型
- pointer: 获取类型指针
- reference: 获取类型引用

```c++
template<typename I>
struct iterator_traits {
    typedef typename I::value_type value_type;
    typedef typename I::different_type different_type;
    typedef typename I::pointer pointer;
    typedef typename I::reference reference;
    typedef typename I::iterator_category iterator_category;
};
```

对于最后一种类型，可以不使用类型定义，但使用类型而不是某个枚举值表示，
主要是类型可以用来做继承，这样在某些情况下会更好的使用。

使用空结构作为类型，并不会增加复杂度。空结构通常大小为 1 个字节，而枚举值通常为 int。

```c++
struct input_iterator_tag {}; // read

struct output_iterator_tag {}; // wirte

// read and write
struct forward_iterator_tag : input_iterator_tag, output_iterator_tag {};  

// ++ and --
struct bidirectional_iterator_tag : forward_iterator_tag {};

// +n
struct random_access_iterator_tag : bidirectional_iterator_tag {};
```

对于各容器内部的迭代器，需要自行定义这五种类型；这样做是合理的，
因为只有容器的开发者才知道迭代器的真正用法。

对于原始 C 指针，可以用模版特化来解决，这样就兼容了。

```c++
template<typename I>
struct iterator_traits<I*> {
    typedef I value_type;
    typedef ptrdiff_t difference_type; // <cstddef>
    typedef I* pointer;
    typedef I& reference;
    typedef random_access_iterator_tag iterator_category; // random
};
```

在算法设计中，我们可以根据迭代器的种类调用不同的算法，达到更好的效果。

```c++
template<class InputIterator, class Distance>
inline void advance(InputIterator& i, Distance d) {
    // 转换类型
    typename iterator_traits<InputIterator>::difference_type n = d;
    // 传入临时变量参数，只是标志，不做处理
    __advance(i, n, iterator_traits<InputIterator>::iterator_category());
}

template<class InputIterator, class Distance>
inline void __advance(InputIterator& i, Distance d, input_iterator_tag){
    for(; d > 0; --d){
        ++i;
    }
}

template<class RandomAccessIterator, class Distance>
inline void __advance(RandomAccessIterator& i, Distance d, random_access_iterator_tag){
    i += d;
}
```

## usage


