# class

```c++
class Point {
public:
    int x, y, z;

    // 默认构造函数
    Point() : x(0), y(0), z(0) {
        std::cout << "Default constructor called." << std::endl;
    }

    // 拷贝构造函数
    Point(const Point& other) : x(other.x), y(other.y), z(other.z) {
        std::cout << "Copy constructor called." << std::endl;
    }
    
    // 移动构造函数
    Point(Point&& other) noexcept : x(other.x), y(other.y), z(other.z) {
        other.x = 0;
        other.y = 0;
        other.z = 0;
        std::cout << "Move constructor called." << std::endl;
    }

    // 析构函数
    ~Point() {
        std::cout << "Destructor called." << std::endl;
    }

    // 拷贝赋值运算符
    Point& operator=(const Point& other) {
        if (this != &other) {
            x = other.x;
            y = other.y;
            z = other.z;
        }
        std::cout << "Copy assignment operator called." << std::endl;
        return *this;
    }
    
    // 移动赋值运算符
    Point& operator=(Point&& other) noexcept {
        if (this != &other) {
            x = other.x;
            y = other.y;
            z = other.z;
            other.x = 0;
            other.y = 0;
            other.z = 0;
        }
        std::cout << "Move assignment operator called." << std::endl;
        return *this;
    }
};
```