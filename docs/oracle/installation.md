# 安装

## 安装前环境配置

### 关闭防火墙和selinux

关闭防火墙，在root用户下关闭。
```sh
# 关闭防火墙
systemctl stop firewalld
# 关闭防火墙开机启动
systemctl disable firewalld
```

关闭selinux
```sh
# 将配置文件中的SELINUX修改为disabled即可。
vim /etc/selinux/config
```

reboot生效。

### 搭建yum

搭建yum源，安装依赖包使用。

将安装系统时使用的镜像文件挂载到虚拟机。
![](./assets/2023-04-12-16-06-10.png)

```sh
# ISO镜像挂载时的路径为 /run/media/root/OL 

# 在/etc/yum.repos.d新建yum源配置文件
vim server.repo

[server]
name=linux
baseurl=file://[挂载路径] # 用%20替代空格
enabled=1
gpgcheck=0

# 创建完成后查看yum源
yum repolist
```

### 预安装包

预安装包的作用：
1. 创建用户
2. 创建组
3. 配置修改内核参数
4. 配置软硬资源限制
5. 安装依赖包

```sh
rpm -ivh [预安装包文件]
```

预安装包可能也有一些依赖包需要安装。

### 创建目录
```sh
mkdir -p /u01/app/oracle/product/19.3.0/db_1
chown -R oracle:oinstall /u01
chmod -R 775 /u01
```

### 修改host

```sh
vi /etc/host

# 在后面加入一行
[本机ip]        [短主机名]      [长主机名]
192.168.1.10    wl              wl.localhost
```

### 设置oracle用户口令

``` sh
pwdo racle
```

### 设置环境变量

登录到oracle用户，在其家目录配置.bash_profile。其中SID可以改掉

```sh
vim .bash_profile

# 在文件末尾添加
export ORACLE_SID=[SID]
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=$ORACLE_BASE/product/19.3.0.db_1
export PATH=$PATH:$ORACLE_HOME/BIN
export LD_LIBRARY_PATH=$LDLIBRARY_PATH:$ORACLE_HOME/lib
export CLASSPATH=$ORACLE_HOME/JRE:ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib
```

文件生效
```sh
source .bash_profile
# 检查是否有相应的环境变量
echo $[环境变量名]
```

<!-- ### 上传软件包并安装

使用远程工具上传到服务器**ORACLE_HOME**目录。

:::warning
注意上传后检查文件的所有者和所属组，需要修改为**所有者oracle，所属组
oinstall**。
```sh
chown oracle:oinstall [文件名]
```
:::

解压并安装
```sh
# 解压文件
uzip [文件名]
# 在当前文件夹运行runinstaller，运行图形安装界面
./runinstaller
``` -->

## 图形方式安装

做完安装准备后，上传软件包，解压并直接运行runinstaller即启动图形界面。

### 上传软件包并解压

使用远程工具上传到服务器**ORACLE_HOME**目录。

:::warning
注意上传后检查文件的所有者和所属组，需要修改为**所有者oracle，所属组
oinstall**。
```sh
chown oracle:oinstall [文件名]
```
:::

运行图形界面
```sh
# 解压文件
uzip [文件名]
# 在当前文件夹运行runinstaller，运行图形安装界面
./runinstaller
```

远程输出图形界面。
```sh
export DISPLAY=[与linux相互通讯的网卡地址]:0.0
```

### 图形界面操作

#### 第一步有两个选项：
1. 安装软件并创建和配置一个单实例数据库
2. 仅安装软件

选择仅安装软件，因为数据库创建在别的部分讲。
![](./assets/2023-04-17-10-48-24.png)

#### 数据库安装类型
1. 单实例数据库
2. 集群环境数据库

选择单实例数据库。OCP只做单实例数据库，OCM讲集群。
![](./assets/2023-04-17-10-52-00.png)
![](./assets/2023-04-17-10-53-29.png)

#### 数据库版本选择
1. 企业版
2. 标准版

默认选择企业版

#### 安装目录
BASE目录要与环境变量设置的**ORACLE_BASE**目录一致。软件安装的位置即为**ORACLE_HOME**目录。
![](./assets/2023-04-17-10-54-27.png)

#### 创建清单
清单目录，安装过程中创建的目录。
![](./assets/2023-04-17-10-57-31.png)

#### 系统组
之前创建的各个用户组
![](./assets/2023-04-17-10-58-37.png)

#### 运行配置脚本
是否自动运行配置脚本。若要自动运行，填写相关信息即可。
![](./assets/2023-04-17-11-00-29.png)

#### 先决条件
检查先决条件，需要100%通过。

![](./assets/2023-04-17-11-01-23.png)

检查内容有，物理内存、交换空间、/tmp空间、用户、用户组、运行级别、架构、内核参数、依赖包等。基本都在预安装包的时候解决了。

一般出错：**软件包依赖、内核参数、交换空间**。

![](./assets/2023-04-17-11-02-09.png)

#### 开始安装
直接点击开始安装。
![](./assets/2023-04-17-11-07-22.png)

安装过程中需要用root用户执行两个脚本。在命令行用root执行即可。

![](./assets/2023-04-17-11-08-50.png)

#### 数据库连接
安装完成后，可以连接到数据库

```sh
sqlplus / as sysdba
```

![](./assets/2023-04-17-11-12-35.png)

## 静默方式安装

（虚拟机快照回退到配置好Oracle环境的快照，课程里是这样。上传完安装包文件）。

静默方式安装需要先生成**响应文件**。

响应文件可以自己写，也可以用图形界面生成。

ORACLE_HOME目录有一个install/response文件夹。

::: hljs-center
![](./assets/2023-04-17-16-54-24.png)
:::

其下有一个**db_install.rsp**文件，是一个空的响应文件。里面有参数，但是没有填写，可以根据备注修改。

![](./assets/2023-04-17-16-56-08.png)

这些参数都是图形界面中相对应的各种选项。

在图形界面配置完后可以在图形界面生成对应配置的响应文件。

::: hljs-center
![](./assets/2023-04-19-10-42-47.png)
:::

在命令行使用oracle用户运行以下命令即可安装
```sh
/u01/app/oracle/product/19.3/db_1/runinstaller -force -slient -noconfig -ignorePrereq -responseFile /home/oracle/db.rsp
```

## rpm包

::: warning
这个部分写的不太完整
:::

将虚拟机快照恢复到linux系统安装完毕，没有进行安装前环境配置。

挂载linux系统ISO，搭建本地yum源，安装依赖包：

![](./assets/2023-04-19-11-33-04.png)

上传预安装包并安装，如果提示有需要的依赖包就使用yum安装。

配置/etc/hosts

![](./assets/2023-04-19-11-31-51.png)

之后上传rpm文件，并使用rpm -ivh安装。

安装完之后oracle软件就安装好了。

此时默认安装在**/opt**目录下，opt目录是一般安装第三方软件的地方

![](./assets/2023-04-19-11-36-23.png)

该过程只安装oracle软件，不创建数据库。

环境变量还需要自己设置。

```sh
cd ~
vim .bash_profile

# 文件中新增部分
export ORACLE_SID=
export ORACLE_BASE=/opt/oracle/
export ORACLE_HOME=/opt/oracle/product/19c/dbhome_1/
export PATH=$ORACLE_HOME/bin:$PATH:$HOME/.local/bin:$HOME/bin

# 文件生效
source .bash_profile
```

指定SID后就可以通过sqlplus连接到数据库。

根据提示，可以使用如下语句创建数据库：

``` sh
/etc/init.d/oracledb_ORCLCDB-19c configure
```

该语句中中间部分的ORCLCDB就是我们设置的SID

![](./assets/2023-04-19-11-47-00.png)

::: warning
/etc/hosts中的主机名配置错误，在运行configure时会报错，跟监听有关。
:::

运行该命令创建的时一个容器数据库。

通过修改配置文件中的SID可以创建新的数据库。配置文件名中间也要改成新的SID。

## 克隆

可以去看看官方文档。

------------

::: tip
创建三个库，两个容器数据库，一个非容器数据库，后续可能会用到。

在不同SID时连接就可以连接到不通数据库。

```sh
sqlplus / as sysdba
select status,cdb,instance_name from v$instance;
```

:::

## 卸载

1. 使用的install工具删除安装的Oracle软件可执行文件和配置文件
2. 删除/etc目录下的oraInst.loc、oratab，删除/opt目录下的ORCLfmap
3. 删除/usr/local/bin下面Oracle的所有文件
4. 删除/tmp目录下Oracle的相关文件
5. 删除Oracle安装目录
6. 删除Oracle用户、dba、oinstall用户组

deinstall在ORACLE_HOME目录下

![](./assets/2023-04-19-14-59-39.png)