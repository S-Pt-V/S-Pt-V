# 数据库连接

## 操作系统认证方式

使用本地的sqlplus工具，以sysdba的身份连接到数据库。这样连接进来的用户是SYS。

```shell
sqlplus / as sysdba
```
![](./assets/2022-12-01-11-54-29.png)

```shell
# / 左侧应该是用户名，右侧为以口令，上面的命令省略了用户名和口令
sqlplus sys/oracle as sysdba
```

因为是使用操作系统验证方式，所以不需要用户名和口令也可以登录。

能够连接到操作系统的oracle用户，说明就有权限。此时随便输入用户名和口令登入的也是sys用户，因为不会对用户名和口令验证。

![](./assets/2022-12-01-12-00-40.png)

## easy connect

通过网络方式连接，需要配置网络服务名。使用netmgr进行配置。

如果没有配置网络服务名，可以通过简易的方式连接。要加地址端口和数据库。称为easy connect。通过网络连接时要对口令验证。

```shell
sqlplus [用户名]/[密码]@[ip地址]:[端口]/[数据库] as sysdba
sqlplus sys/oracle@192.168.11.1:1521/orcl as sysdba
```

![](./assets/2023-04-19-15-58-22.png)

利用口令文件验证，口令文件位于**$ORACLE_HOME/dbs/orapw[SID]**。

如果有配置网络服务名:
```shell
netmgr
```

网络服务名称随便定义

![](./assets/2022-12-01-12-10-02.png)
![](./assets/2022-12-01-12-11-35.png)
![](./assets/2022-12-01-12-12-11.png)
![](./assets/2022-12-01-12-12-47.png)
![](./assets/2022-12-01-12-13-40.png)
![](./assets/2022-12-01-12-15-01.png)
![](./assets/2022-12-01-12-15-58.png)

之后就可以通过网络服务名的方式来连接了
```shell
sqlplus [用户名]/[密码]@[网络服务名] as sysdba
```

## TNS
