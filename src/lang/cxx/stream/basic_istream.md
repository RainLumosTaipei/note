# basic istream

`istream`

## declare

```c++
template<typename _CharT, typename _Traits>
class basic_istream : virtual public basic_ios<_CharT, _Traits>{

}
```



## Usage

1. get

2. ignore

3. peek

4. unget, putback


## Sentry

在进行输入操作前，sentry 对象会完成一系列检查与准备工作，比如：
检查流状态：查看流是否处于良好状态，若流已处于错误状态，就不会进行输入操作。
跳过前导空白字符：若流处于格式化输入模式，sentry 会跳过前导空白字符。
设置流状态：若检查不通过，sentry 会设置流的错误状态。

```c++
template<typename _CharT, typename _Traits>
class basic_istream<_CharT, _Traits>::sentry{
    
}
```