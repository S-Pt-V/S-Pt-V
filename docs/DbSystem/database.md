# 数据库配置

## Mysql

### 安装

#### Windows
安装按照百度教程一直下一步就行。

#### 树莓派
树莓派上只能装Mysql的一个分支，mariadb，使用方法与mysql一致

### 用户权限

在数据库mysql中有一张user表，里面有host列跟user列，host列限制了对应user的登陆位置。在上次安装过程中（虚拟机安装mysql，使用物理机远程登陆），发现无法登陆，通过搜索资料发现是因为在默认的mysql.user中root只能通过localhost登录。需要修改host中的localhost为%。

```sh
UPDATE mysql.user set host='%'WHERE user='root';
```

之后为应用新建的表创建一个专门的用户，不知道这样是不是有必要。

查看用户权限
```sh
show grants for [用户];
show grants for root@'localhost'; 
```

创建用户
```sh
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```

授权，privileges包含SELECT INSERT 
```sh
GRANT privileges ON databasename.table TO 'username'@'host';
```

### 建表

```sh
use mysql;
create user 'demo'@'%' identified by 'demo@123';
grant all privileges on database_demo.* to 'demo'@'%';

CREATE SCHEMA `database_demo` DEFAULT CHARACTER SET utf8mb4 ;
USE `database_demo`;

CREATE TABLE `database_demo`.`account` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uid` CHAR(36) NOT NULL,
  `useruid` CHAR(36) NOT NULL,
  `groupuid` CHAR(36) NOT NULL,
  `account` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `enabled` BIT(1) NOT NULL,
  `createdate` VARCHAR(45) NOT NULL,
  `lastlogin` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE `database_demo`.`personnel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uid` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `idcard` VARCHAR(45) NOT NULL,
  `telephone` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE `database_demo`.`group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uid` CHAR(36) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;
```
## 数据库创建过程
使用root账号
```sh
CREATE SCHEMA `qhctec_internal` DEFAULT CHARACTER SET utf8mb4 ;
GRANT ALL PRIVILEGES ON qhctec_internal.* TO 'qhctec'@'%';
```

可使用qhctec执行
```sh
# 人员表创建
CREATE TABLE `qhctec_internal`.`personnel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) BINARY NOT NULL,
  `tel` VARCHAR(45) BINARY NOT NULL,
  `address` VARCHAR(45) NULL,
  `uid` CHAR(36) BINARY NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uid_UNIQUE` (`uid` ASC) VISIBLE);

# 账号表创建
CREATE TABLE `qhctec_internal`.`account` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) BINARY NOT NULL,
  `role` VARCHAR(15) NOT NULL,
  `enabled` BIT(1) NOT NULL,
  `uid` CHAR(36) NOT NULL,
  `useruid` CHAR(36) NOT NULL,
  `password` VARCHAR(45) BINARY NOT NULL,
  `createdate` DATETIME NOT NULL,
  `Lastlogin` DATETIME NULL,
  `lastloginresult` BIT(1) NULL,
  `passwdchange` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uid_UNIQUE` (`uid` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;
```