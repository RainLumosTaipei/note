# copy elision

## 


```c++
int main(){
    Point p = {1,2,3};
    return 0;
}
```

从 C++17 开始，复制省略成为强制要求，在上述提到的场景中，复制操作会被无条件省略。