# Linux虚拟机硬盘扩容(LVM)

## 扩容前信息

df -Th

![](./assets/2024-05-31-15-05-29.png)

lsblk

![](./assets/2024-05-31-15-06-02.png)

创建快照

![](./assets/2024-05-31-15-08-36.png)

不行，不能创建快照，创建快照之后不能修改硬盘大小

![](./assets/2024-05-31-15-15-05.png)

## 扩展物理磁盘

在vCenter中编辑虚拟机硬盘大小，加一个T，250+1024GB。

![](./assets/2024-05-31-15-16-12.png)

## 扩展系统磁盘

进入操作系统后查看磁盘状态。

![](./assets/2024-05-31-15-19-34.png)

磁盘大小已经变成了1.3T。

![](./assets/2024-05-31-15-20-02.png)

## 对指定磁盘初始化

使用fdisk工具

![](./assets/2024-05-31-15-22-52.png)

查看分区信息

![](./assets/2024-05-31-15-23-34.png)

创建新分区，新的分区参数信息均为默认

![](./assets/2024-05-31-15-25-33.png)

将新的分区设置为LVM格式

![](./assets/2024-05-31-15-26-59.png)

w保存，提示说要重启才能应用新的分区表，可以看到出现了1T的sda3

![](./assets/2024-05-31-15-31-33.png)

## 创建物理卷

创建物理卷前仅有1个Physical Volume

![](./assets/2024-05-31-15-33-17.png)

创建物理卷

![](./assets/2024-05-31-15-34-43.png)

## 逻辑卷操作

查看卷组名称，名称为rhel

![](./assets/2024-05-31-15-35-50.png)

将物理卷扩展到卷组

![](./assets/2024-05-31-15-39-02.png)

查看当前逻辑卷空间状态，卷组rhel的逻辑卷路径为/dev/rhel/root

![](./assets/2024-05-31-15-39-28.png)

将卷组中的空闲空间按扩展到跟分区逻辑卷

![](./assets/2024-05-31-15-41-05.png)

完成根目录扩展

![](./assets/2024-05-31-15-42-55.png)
