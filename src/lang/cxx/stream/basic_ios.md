# basic ios


`basic_ios.h`


## declare

```c++
template<typename _CharT, typename _Traits>
class basic_ios : public ios_base{

}
```

## Usage

1. _Ios_Iostate

```c++
```

```c++
iostate rdstate() const
{ 
    return _M_streambuf_state; 
}

void clear(iostate __state = goodbit);
```

2. bool

```c++
explicit operator bool() const
{ 
    return !this->fail(); 
}

bool operator!() const
{ 
    return this->fail(); 
}
```

3. exptions

如果调用带唯一参数的 exceptions()，那么一旦指定的那个fag 被设置，立刻就会引发相应异常。

```c++
std::cin.exceptions(std::ios::failbit | std::ios::badbit);
```