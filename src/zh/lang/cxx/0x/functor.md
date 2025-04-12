# functor

定义 operator() 运算符的类，可以包含字段用于保存状态。

`stl_function`

## 注意

1. 如果要传递含有状态的 functor, 需要指明模板参数为引用，或者使用 for_each, 但元素内容不能更改。

## 问题

1. remove_if

如果 factor 的函数不能保证重复应用一致性，会出现非预期的结果。

```c++
class Nth{
private:
    int nth;
    int cur;
public:
    bool operator() (int){
        return ++cur == nth;
    }

    Nth(int nth):nth(nth),cur(0){};
};

int main(int argc, char **argv) {
    std::vector<int> v = {1,2,3,4,5,6,7};
    auto i=  std::remove_if(v.begin(), v.end(), Nth(3));
    v.erase(i, v.end());

    for(auto ele : v)
        std::cout << ele << ' ';    // 1 2 4 5 7
                                    // 1 2 4 5 6 7 not!!!
}
```

例如试图移除第三个元素，会造成所有三的倍数的位置的元素被移除。

```c++
template<typename _ForwardIterator, typename _Predicate>
_ForwardIterator
__remove_if(_ForwardIterator __first, _ForwardIterator __last,  _Predicate __pred)
{
    // 此处拷贝了一份__pred, 没有保存位置
    __first = std::__find_if(__first, __last, __pred);
    if (__first == __last)
        return __first;

    _ForwardIterator __result = __first;
    ++__first;

    // 还是原来的__pred
    for (; __first != __last; ++__first)
        if (!__pred(__first))
        {
            *__result = _GLIBCXX_MOVE(*__first);
            ++__result;
        }

    return __result;
}
```

如果要解决上述问题，只需将\_\_find_if 的调用展开即可。
