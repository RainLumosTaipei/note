## bash

### syntax

#### case

```shell
#!/bin/bash

fruit="apple"

case "$fruit" in
    "apple")
        echo "It's an apple."
        ;;
    "banana")
        echo "It's a banana."
        ;;
    "cherry" | "strawberry")
        echo "It's a cherry or a strawberry."
        ;;
    *)
        echo "I don't know what fruit this is."
        ;;
esac
```

### useful tips

