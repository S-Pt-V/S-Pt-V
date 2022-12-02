# Oracle启动和关闭

## 启动

### 启动过程
Oracle数据库从关闭到打开主要有三个阶段
* **NOMOUNT** 实例启动
* **MOUNT** 装载数据库
* **OPEN** 打开数据库

![](./assets/2022-12-02-12-01-24.png)

实例启动：通过SID找到**参数文件**(参数文件)，读取参数文件中的参数分配内存，启动后台进程，实例启动，进入NOMOUNT状态。

装载数据库：读取参数文件中记录的control_files参数，记录了**控制文件**的位置，定位到数据库的控制文件，和数据库建立关联，装载数据库，进入MOUNT状态。

打开数据库：控制文件中记录着数据库的物理结构信息，**数据文件和联机在线日志文件**的位置。定位并打开文件后，数据库打开，进入OPEN状态。

参数文件丢失，无法进入NOMOUNT状态；控制文件丢失，无法进入MOUNT状态；数据和日志文件丢失，无法进入OPEN状态。

分步骤完成数据库启动：
```shell
# 数据库启动实例，分配内存，启动后台进程
startup nomount

# 进入mount状态
alter database mount;

# 进入open状态
alter database open;

# 查询数据库状态
select status from v$instance;
```

### 错误

#### 丢失参数文件
丢失参数文件或者SID故障，无法启动实例。
![](./assets/2022-12-02-12-25-53.png)

#### 丢失控制文件
丢失控制文件，无法进入MOUNT状态。
![](./assets/2022-12-02-12-28-14.png)

#### 丢失数据文件

![](./assets/2022-12-02-12-30-39.png)

#### 丢失联机日志文件
报错与丢失数据文件不同。
![](./assets/2022-12-02-12-58-18.png)

## 关闭

数据库关闭也有四个个阶段
* **OPEN** 数据文件和联机在线日志文件打开。
* **CLOSE** 数据文件和联机在线日志文件关闭。
* **NOMOUNT** 关闭控制文件，实例打开。
* **SHUTDOWN** 实例关闭。
![](./assets/2022-12-02-13-41-02.png)

关闭数据库的命令
* 强制关闭 shutdown -abort
* 立即关闭 shutdown -immediate
* 事物关闭 shutdown -transactional
* 常规关闭 shutdown -normal
执行时需要具有SYSDSBA的权限或者SYSOPER特权。

```shell
# 创建用户并授权
sqlplus / as sysdba
create user [username] identified by [password];
grant sysdba to [username] container=all;
```

四条命令的区别：
|Database Behavior|ABORT|IMMEDIATE|TRANSACTIONAL|NORMAL|
|-|-|-|-|-|
|Permits new user connections|NO|NO|NO|NO|
|Waits until current sessions end|NO|NO|NO|YES|
|Waits until current transactions end|NO|NO|YES|YES|
|Performs a checkpoint and closes open files|NO|YES|YES|YES|

允许新用户连接：均不允许。<br />
等待当前会话结束：仅NORMAL等待结束。<br />
等待当前事物结束：TRANSACTIONAL和NORMAL会等待。事物：DML操作(insert/update/delete)，创建表修改表，授权回收权限会产生事物。事物的结束：正常结束会话，执行rollback或者commit。<br />
执行检查点：仅ABORT不执行。ABORT是**非一致性关闭数据库**，其余三种是**一致性关闭**。一致性关闭数据库，后续启动不用做实例恢复。

NORMAL关闭最安全，但是使用的时间最多。<br />
使用最多的是**IMMEDIATE**。<br />
shutdown immediate 后未提交的事物会被回滚。<br />
shutdown abort后需要做实例恢复。

分步关闭数据库：
```shell
alter database close;
alter database dismount;
shutdown
```

检查点进程，做检查点时就是在执行检查点进程。<br />
检查点进程会更新控制文件头部和数据文件头部的信息，通知DBWn将脏数据写回数据文件。从内存写入磁盘，保持数据的一致。
![](./assets/2022-12-02-14-43-50.png)
