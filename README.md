# 介绍

这是我的学习文档

# 问题

## node版本过高

报出以下错误

error:03000086:digital envelope routines::initialization error

::: tip 解决方法

执行如下命令后再运行其他命令。

:::

```shell
$env:NODE_OPTIONS="--openssl-legacy-provider"
```