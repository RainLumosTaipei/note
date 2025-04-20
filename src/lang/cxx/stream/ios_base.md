# ios base

`ios_base.h`

## declare

## Usage

1. _Io_Iostate

```c++
enum _Ios_Iostate
{ 
    _S_goodbit 		    = 0,
    _S_badbit 		    = 1L << 0,
    _S_eofbit 		    = 1L << 1,
    _S_failbit		    = 1L << 2,
    _S_ios_iostate_end  = 1L << 16,
    _S_ios_iostate_max  = __INT_MAX__,
    _S_ios_iostate_min  = ~__INT_MAX__
};
```

2. _Ios_Fmtflags

```c++
enum _Ios_Fmtflags 
{ 
    _S_boolalpha 	= 1L << 0,
    _S_dec 		    = 1L << 1,
    _S_fixed 		= 1L << 2,
    _S_hex 		    = 1L << 3,
    _S_internal 	= 1L << 4,
    _S_left 		= 1L << 5,
    _S_oct 		    = 1L << 6,
    _S_right 		= 1L << 7,
    _S_scientific 	= 1L << 8,
    _S_showbase 	= 1L << 9,
    _S_showpoint 	= 1L << 10,
    _S_showpos 	    = 1L << 11,
    _S_skipws 	    = 1L << 12,
    _S_unitbuf 	    = 1L << 13,
    _S_uppercase 	= 1L << 14,
    _S_adjustfield 	= _S_left | _S_right | _S_internal,
    _S_basefield 	= _S_dec | _S_oct | _S_hex,
    _S_floatfield 	= _S_scientific | _S_fixed,
    _S_ios_fmtflags_end = 1L << 16,
    _S_ios_fmtflags_max = __INT_MAX__,
    _S_ios_fmtflags_min = ~__INT_MAX__
};
```

```c++
// set flags showpos and uppercase
std::cout.setf(std::ios::showpos | std::ios::uppercase);

// set only the flag hex in the group basefield
std::cout.setf(std::ios::hex, std::ios::basefield);

// clear the flag uppercase
std::cout.unsetf(std::ios::uppercase);
```