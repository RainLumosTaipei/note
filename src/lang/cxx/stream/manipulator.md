# Manipulator

`ostream`
`iomanip`

## declare

```c++
__ostream_type&
operator<< (__ostream_type& (*__pf)(__ostream_type&))
{
    return __pf(*this);
}
```

operator << 接受函数指针并调用。

## Usage

1. endl

endl 是一个函数

```c++
template<typename _CharT, typename _Traits>
inline basic_ostream<_CharT, _Traits>&
endl(basic_ostream<_CharT, _Traits>& __os)
{
    return flush(__os.put(__os.widen('\n')));
}
```

```c++
endl(std::cout);
```

因为如果全局空间中找不到 endl，编译器会自动在其实参定义所在的命名空间中查找,
这称为 ADL(argument-dependent lookup;也被称为 Koenig lookup)。

2. setw, setfill, left, right, internal


3. skipws