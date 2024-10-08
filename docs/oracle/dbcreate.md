# 创建数据库

## DBCA

### 运行dbca
数据库安装完毕后，在命令行运行DBCA启动图形界面创建数据库。

```sh
dbca
```
### 图形界面操作

#### 操作选择
1. 创建数据库
2. 配置已经存在的数据库
3. 删除数据库
4. 管理模板
5. 管理容器数据库
6. RAC集群实例管理
![](./assets/2023-04-17-11-19-12.png)

#### 创建模式
选择高级配置。
![](./assets/2023-04-17-11-21-44.png)

#### 部署类型
数据库类型选择单实例数据库。

数据库模板有三个：
1. 数据仓库。OLAP，存储历史数据，做分析、报表。很少做DML操作，insert、update、delete。
2. 定制数据库。
3. 一般事物数据库。事物型数据库，OLTP，用的比较多。经常对其中的数据做DML操作。

![](./assets/2023-04-17-11-22-26.png)

#### 数据库名称
全局数据库名称和SID，要与环境变量中的**ORACLE_SID**相对应。

全局数据库名称可以与SID不一致，但是SID要一致。

可选创建为容器数据库，使用本地undo管理。每个容器下有自己的undo表空间。

可选创建容器数据库中的容器个数。最多4096个。每个容器相当于一个11G数据库。

若没有选择创建容器数据库，创建的就是类似于11G的非容器数据库，只是版本不一样。

![](./assets/2023-04-17-11-27-56.png)

#### 存储选项
默认使用文件系统。

也可以制定用**文件系统**或者**ASM**中存储。

![](./assets/2023-04-17-11-32-14.png)

#### 闪回恢复区

存放位置和存储类型，区域大小，是否开启归档。默认选项即可，可以安装完之后开归档。

![](./assets/2023-04-17-11-35-13.png)

#### 监听选项
默认。
![](./assets/2023-04-17-11-36-43.png)

#### 数据仓库选项
默认。
![](./assets/2023-04-17-11-38-27.png)

#### 设置选项

##### 内存

内存的SGA和PGA管理方式。
1. 自动共享内存管理，ASMM。固定分配SGA和PGA大小，SGA和PGA中各种组件动态分配。
2. 手动内存管理，MMM。固定分配SGA各个组件和PGA的大小。
3. 自动内存管理，AMM。指定内存总大小，数据库自动分配SGA和PGA。

自动管理有可能出现当SGA需要更多的空间时，不能及时将PGA内存分配的情况，导致SGA不足产生性能问题。

可以先选择自动管理，系统运行一段时间后改成自动共享内存管理。如果能精准的知道内存要用多少，可以选择手动配置。

一般用的最多的是自动共享内存管理。

![](./assets/2023-04-17-11-50-57.png)

##### 大小

块的大小和进程。

进程包括前台进程和后台进程。

![](./assets/2023-04-17-11-53-25.png)

##### 字符集

默认。

![](./assets/2023-04-17-11-53-56.png)

##### 连接模式

选择专有服务器模式和共享服务器模式。默认使用专有服务器模式。

![](./assets/2023-04-17-11-54-45.png)

##### 示例数据库

可选。

![](./assets/2023-04-17-11-55-33.png)

#### 是否安装EM

不安装了，装也行。课程中没用。

![](./assets/2023-04-17-11-56-28.png)

#### 口令

指定口令。

![](./assets/2023-04-17-11-57-05.png)

#### 创建选项

直接创建数据库。

![](./assets/2023-04-17-11-57-50.png)

#### 摘要、进度、安装完成

![](./assets/2023-04-17-11-58-57.png)

### 连接

```sh
sqlplus / as sysdba
select status from v$instance;
```

![](./assets/2023-04-17-12-00-17.png)

## configw

## 静默方式

静默方式创建数据库与静默方式安装数据库软件方法相同。

在目录中也有相应的响应文件模板。其中的参数也与GUI中的各个选项对应。

::: hljs-center
![](./assets/2023-04-19-10-53-58.png)
:::

在GUI配置完成后，也可以导出响应文件。

::: hljs-center
![](./assets/2023-04-19-11-07-16.png)
:::

在命令行安装

```sh
dbca -slient -createDatabase -responseFile /home/oracle/dbca.rsp
```

## 使用脚本创建

::: warning
在数据库安装中写了一部分，但是最好重新弄一遍
:::

## 命令行方式

```sh
# oracle 用户执行
dbca -silent -createDatabase -templateName General_Purpose.dbc -gdbname oradb.example.com -sid oradb -responseFile NO_VALUE -characterSet AL32UTF8 -memoryPercentage 30 -emConfiguration LOCAL

# 创建容器数据库，多一个参数createAsContainerDatabase
dbca -silent -createDatabase -createAsContainerDatabase true -templateName General_Purpose.dbc -gdbname oradb.example.com -sid oradb -responseFiel NO_VLAUE -characterSet AL32UTF8 -memoryPercentage 30 -emConfiguration LOCAL
```

创建不同数据库时修改sid和全局数据库名称gdbname

