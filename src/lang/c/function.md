# function

## note

1. 函数内部可以声明函数

```c
int func(){
    int other(int a);
    other(10);
    return 0;
}

int other(int a){
    return 1;
}
```

2. 函数类型与函数指针类型

```c++
typedef int F();        // 函数类型
typedef int (*G)();     // 函数指针类型

int func(){
    return 10;
}

int other(G func){      // 作为形参没有区别
    return 1;
}

int main(){
    G p = func;         // 可以赋值
    F p1;               // 不能赋值
}
```