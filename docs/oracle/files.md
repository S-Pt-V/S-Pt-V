# 文件

## 参数文件

### 参数文件的作用

参数文件用于存放实例所需要的初始化参数，因为多数初始化参数都具有默认值，所以参数文件实际存放了非默认的初始化参数。

### 参数文件额位置

spfile存放了参数文件的位置。

```sh
show parameter spfile
```

### 参数文件类型

1. **服务端参数文件**

又称为spfile，是二进制文件，命名规则为：SPFILE+SID.ORA。

::: warn
使用vim打开spfile之后不能使用wq退出，要用q!
:::

2. **静态参数文件**

又称为pfile，是文本文件，命名规则为：INIT+SID.ORA。

### 参数文件使用顺序

优先使用spfile，当spfile不存在或出错，使用pfile，当pfile不存在或出错，数据库不能正常启动。

### 判断数据库使用哪个文件

查看如下参数。若参数有显示值，使用的就是spfile，显示为空则使用pfile。

```sh
show parameter spfile
```

### 创建pfile

```sh
create pfile from spfile;
create pfile='/home/oracle/init.ora' from spfile;

SQL> create pfile='/home/oracle/init.ora' from memory;
```

### 创建spfile

利用pfile创建的spfile参数很少，由内存创建的spfile参数很多。

```sh
create spfile from pfile;
create spfile='/home/oracle/spfile.ora' from pfile;

SQL> create spfile='/home/oracle/spfile.ora' from memory;
```

### 参数查看

```sh
show parameter [参数名]
```

### 参数修改

1. slter session

当前会话生效，新开的会话或重启呼叫库参数值不生效。

```sh
# alter session
show parameter sql_trace
alter session set sql_trace=true;
show parameter sql_trace
```

2. alter system

当前会话生效，新开的会话或重启数据库会参数值都生效。

```sh
show parameter sql_trace
alter system set sql_trace=true;
show parameter sql_trace
```

3. alter system + differed

当前会话不生效，新开的会话或重启数据库会参数值生效。

```sh
show parameter sort_area_size
alter system set sort_area_size=75536 deffered;
show parameter sort_area_size
```

![数据字典](./assets/2023-05-12-10-05-56.png)

通过查询数据字典中的ISSES_MODIFIABLE,ISSYS_MODIFIABLE,ISPDB_MODIFIABLE。

ISSES_MODIFIABLE为true则能够使用alter session命令修改。ISSYS_MODIFIABLE为true则能使用alter system修改。ISPDB_MODIFIABLE表示参数是否能在PDB中修改。ISMODIFYIED表示该字段有没有更改过。

4. 重置参数

```sh
alter system reset optimizer_mode;
show parameter oprimizer_mode;
```
5. 加选项scope

当是使用spfile启动数据库时，可以通过在命令结尾加scope参数指定为spfile修改文件中的参数，指定为memory修改内存中的参数。

对静态参数的修改需要指定scope=spfile；

不加选项默认指定both

```sh
alter system set optimizer_mode=all_rows scope=spfile;
alter system set optimizer_mode=all_rows scope=smemory;
alter system set optimizer_mode=all_rows scope=both;
```

CBD参数文件使用12C以前的SPFILE，PDB参数文件不出现在SPFILE中，而是从CDB中继承，如果PDB中私有本地参数，则会保存在CDB的PDB_SPFILE$字典表中，并以con_id(容器id号)区别。当PDB UN-Plug时，PBD参数写如PDB的xml文件中，当drop pluggable database后，pdb和PDB_SPFILE$信息记录会被清除。

![](./assets/2023-05-12-10-55-12.png)

CDB参数文件使用以前的SPFILE，pdb的参数不会出现在SPFILE中，而是从CDB中继承。PDB中看到的参数跟在根容器中看到的参数值是一样的。若CDB中更改了某个参数，PDB中的参数也会更改。在PDB中修改参数不会影响其他PDB和CDB。PDB中修改了参数值后，可以在PDB_SPFILE$中看到各个PDB的不同参数，以con_id区别。

当把容器拔出后，容器的参数会记录在XML中，PDB_SPFILE$中的参数会被清除。PDB重新创建后，PDB_SPFILE$中会出现xml中的参数。但是由于一些PDB特殊的原因，在插入时有些参数会被遗弃。

CDB与PDB不同值的相同参数

多租户环境下，如果在设定参数时，cdb中设置CONTAINER=ALL，那么PDB的参数也会继承这个值，但可以通过ALTER SYSTEM在PDB container 中修改PDB local parameter，覆盖（优先）从CDB继承的参数。

在ROOT中修改参数，默认情况和指定container=all/current均是所有open的pdb都生效。ORACLE的参数文件只是记录的cdb的sid的参数，并未记录各个pdb的参数，那如何实现cdb中各个pdb参数不一致？

在独立修改pdb参数时，其本质是在pdb_spfile$基表中插入或者修改相关记录（第一次是插入，后续修改是更新）

## 控制文件

### 控制文件存储的数据信息

1. 数据库名称和数据库唯一标识符（DBID），通过select name, dbid from v$database；查询DBID和数据库名称。
2. 创建数据库的时间戳。
3. 有关数据文件、联机重做日志文件、归档重做日志文件的信息，位置、文件名称等物理结构信息。
4. 表空间信息。
5. 检查点信息。
6. 日志序列号信息。

控制文件包含数据文件、联机重做日志文件等信息。

控制文件也会跟踪数据库的结构变化。当数据库打开时，对数据文件增加表空间，或者对表空间增加数据文件，表空间脱机联机，这类数据库结构变化发生时会更新数据文件，会在控制文件中记录。

控制文件包含未打开数据库时必须可访问的元数据。

至少有一个控制文件、建议有多个控制文件。多个控制文件相互镜像，需要能够同时使用。防止控制文件丢失，避免单点故障。

在mount、open时，数据库发生结构变化时控制文件会被使用。

### 控制文件位置

查看控制文件位置。

```sh
select name from v$controlfile;
```

control_files参数记录了控制文件位置，该参数记录在参数文件中。在nomount状态打开参数文件后，在参数文件中找到该参数打开控制文件，数据库进入mount状态。

```sh
show parameter control_files
```
![](./assets/2023-05-15-08-55-15.png)


### 控制文件操作

**增加**：

先查看参数control_files，再使用命令在该参数中原有的位置基础上新增新路径。路径新增完成后，关闭数据库生成新文件，复制即可。复制后再打开。

```sh
alter system set control_files='[原有路径]','[原有路径]','[新的位置]' scop=spfile;
```

上述方法适用于数据库使用spfile的情况下，使用pfile时需要用vim修改pfile。同样是修改control_files。

::: TIPS
pfile中参数修改直接修改pfile文件，spfile中的参数需要使用命令修改。
:::

**删除、重定位、重命名**的操作方法与新增相同。

### 控制文件备份

备份二进制文件：

```sh
alter database backup controlfile to "d:\control-back.tcl";
```

备份文本文件：

```sh
alter database backup controlfile to trace as 'd:\control_back_text.ctl';
```

在对数据库的物理结构改变后，需要重新对控制文件备份，包括：
1. 增加、删除、重命名数据文件
2. 增加、删除表空间
3. 增加、删除日志组成日志文件。

### 创建控制文件

在归档模式下打开数据库

```sh
archive log list;
shutdown immediate;
# 开归档
alter database archivelog;
alter database open;
archive log list;
```

![](./assets/2023-05-15-09-19-48.png)
![](./assets/2023-05-15-09-22-38.png)
![](./assets/2023-05-15-09-24-08.png)

备份控制文件

```sh
alter database backup controlfile to trace as '/home/oracle/con_text.ctl';
```

找到当前所有的控制文件并删除。

```sh
select name from v$controlfile;
select 'host rm -rf' || name from v$controlfile;
```
![](./assets/2023-05-15-09-26-14.png)
![](./assets/2023-05-15-09-28-15.png)

重启数据库，此时重新创建控制文件即可。此时会报00205控制文件的错误信息。

![](./assets/2023-05-15-09-29-08.png)

重建控制文件使用cont_text.ctl中的命令。选择带有NORESETLOGS的命令。

![](./assets/2023-05-15-09-31-49.png)

创建完成后，恢复数据库并open

```sh
recover database
alter database open;
alter pluggable databse all open;
```

## 联机在线重做日志

## 归档文件
