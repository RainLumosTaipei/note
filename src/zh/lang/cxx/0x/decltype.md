# decltype

用于获取一个变量或表达式的类型，一般用于泛型和 Lamda 获取类型。

这是一个关键字。

## 用法

```c++
template <typename _Tx, typename _Ty>
auto multiply(_Tx x, _Ty y) -> decltype(x * y)
{
    return x * y;
}
```


## 注意

1. 三目运算符

对于三目运算符返回的值，可能是左值，也可能是右值。如果任何情况下返回值都可以是左值，则返回值为左值；
如果有一种情况下是右值，则返回右值。

```c++
int i = 0;
true ? i : i = 10;  // 左值
i = true ? i : 10;  // 右值

decltype (true ? i : i) var1 = i;    //  int&  
decltype (true ? i : 10) var2 = i;   //  int
```

2. ++

前++返回左值，后++返回右值。

```c++
int i 10;
++++i = 10;   // 左值
i++;     // 右值

decltype (++i) var1 = i;    // int&
decltype (i++) var2 = i;    // int 
```

3. 任何对变量名称的操作都优先返回左值

```c++
int arr[10];
int* ptr = arr;
int i = 10;

decltype ((i)) var6 = i;     // int&
decltype(arr[5]) var9 = 1;  // int&
decltype(*ptr)  var10 = 1;    // int& 
```