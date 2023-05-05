# 内存结构

内存存储：
1. 程序代码
2. 关于每个已连接会话的信息，即使该会话当前未出于活动状态
3. 程序执行过程中所需的信息
4. 进程之间共享和通信的信息，例如锁定数据
5. 缓存数据，例如数据块和重做记录

## 内存结构

Oracle数据库内存结构包括：
1. 系统全局区域SGA<br />
&ensp;&ensp;&ensp;&ensp;SGA是一组内存结构，称为SGA组件，其中包含一个Oracle数据库实例的数据和控制信息。这个数据包括缓存的数据块和共享的SQL、重做记录的数据。SGA是共享的，可以给不同的客户端使用。
2. 程序全局区域PGA<br />
&ensp;&ensp;&ensp;&ensp;PGA是非共享内存区域，专门供Oracle进程使用的数据和控制信息。当Oracle进程启动时，PGA有Oracle数据库创建。
3. 用户全局区域UGA<br />
&ensp;&ensp;&ensp;&ensp;存储的是与用户会话关联的数据信息。专用服务器的UGA位于PGA，共享服务器的UGA位于large pool。
4. 软件代码区<br />
&ensp;&ensp;&ensp;&ensp;软件代码区是内存的一部分，用于存储正在运行或可以运行的代码。

## 内存管理

1. 自动内存管理 Automatic Memory Management<br />
&ensp;&ensp;&ensp;&ensp;指定实例内存的目标大小。数据库实例自动优化到这个目标内存大小，根据需要在SGA和PGA实例之间重新分配内存。
2. 自动共享内存管理 Automatic Shared Memory Management<br />
&ensp;&ensp;&ensp;&ensp;设置一个SGA的目标大小，然后设置PGA总目标大小，或单独管理PGA的各个工作区。
3. 手工内存管理 Manual Memory Management<br />
&ensp;&ensp;&ensp;&ensp;不设置总的内存大小，但需要设置许多初始化参数，以单独管理SGA和PGA实例中的各个组件。

```sh
# 查看各个区的目标值
show parameter memory_target
show parameter sga_target
show parameter pga
```

通过修改各个目标值就可以修改内存管理方式。

```sh
# 查询内存分配情况
select COMPONENT,sum(CURRENT_SIZE/1024/1024) mb from v$memory_dynamic_components group by COMPONECT;
```

```sh
# 修改内存管理方式
alter system set sga_target = [分配内存值]
alter system set pga_aggregate_target = [分配内存值]
alter system set memory_target = [分配内存值]
```

![内存关系](./assets/2023-05-05-10-58-00.png)

内存目标值MEMORY_TARGET是SGA_TARGET和PGA_AGGREGATE_TARGET加在一起的大小。

```sh
# sga_target不能超过这个参数大小
show parameter sga_max
```

SGA_TARGET的大小是其下组件内存大小的总和。

## 数据字典

后面再总结吧

## PGA

专有服务器模式下，一个服务器进程分配一个PGA。后台进程也会分配内存。这些内存共同组成PGA。

![PGA描述](./assets/2023-05-05-11-09-56.png)

![PGA组成](./assets/2023-05-05-11-11-51.png)

1. sql工作区
2. 会话内存区
3. 私有SQL区

## SGA

### 数据高速缓冲区 Database Buffer Cache

存储的是从数据文件读取的数据块的副本，即数据缓存，数据文件存储在物理磁盘中，oracle数据库的数据保存在数据文件中，由服务器进程将数据文件中的数据读入到数据库高速缓冲区。

### 重做日志缓冲区 Redo Log Buffer

存储的是数据库所做的更改的条目信息。重做（记录）条目包含DML或DDL操作对数据库所作的更改的信息。重做（记录）条目主要用于实现数据库恢复。

