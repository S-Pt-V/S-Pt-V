# 存储

## 概述

&ensp;&ensp;&ensp;&ensp;企业级存储通常被称为“磁盘阵列”。计算机存储的发展路程：纸袋->磁带->硬盘。<br/>
&ensp;&ensp;&ensp;&ensp;硬盘：分为SATA,SAS和SSD。SATA，SAS是传统机械硬盘，用磁性碟片存储数据，SSD使用芯片存储数据，又名固态硬盘。SSD性能是机械硬盘的几十倍，但是价格高，寿命短。<br/>
&ensp;&ensp;&ensp;&ensp;DAS-盘柜，直连式存储(Direct-Attached-Storage)。使用独立的磁盘柜来放置本来放置在服务器中的磁盘，并单独配置供电模块，服务器直接管理磁盘，扩展了服务器存储空间。对于要求大空间的业务，受限于单磁盘容量并出于数据安全的考虑，需要使用大量的磁盘组成RAID来提供更高效更安全的服务(Redundant Arrays of Independ Disks，磁盘阵列)。使用DAS的系统中，RAID计算由服务器完成。<br/>
&ensp;&ensp;&ensp;&ensp;磁盘阵列，使用专门的控制器来完成RAID计算以及其它存储功能，提升I/O性能，而且减轻了服务器的压力，提供强大的数据管理功能。单控制器->双控制器->多控制器。

&ensp;&ensp;&ensp;&ensp;对于计算机数据来说，数据只有三种状态：计算、传输、存储。<br/>
&ensp;&ensp;&ensp;&ensp;分别对应三大基础设施：服务器、网络、磁盘阵列。

&ensp;&ensp;&ensp;&ensp;计算：数据的形式转化，，服务器、PC手机都属于计算设备。<br/>
&ensp;&ensp;&ensp;&ensp;网络：网络承载数据的跨空间传播。网络设备包括：交换机、路由器、无线设备。<br/>
&ensp;&ensp;&ensp;&ensp;存储：存储承载数据的跨时间传播，将数据保存下来。

&ensp;&ensp;&ensp;&ensp;IT基础设施层面的发展：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;1980~1990，以大型计算机为核心，纸袋穿孔记录数据。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;1990~2000，以PC为核心<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;2000~2010，以网络为核心。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;2004~，以数据为核心。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;(这几个时间都是大致的)<br/>

&ensp;&ensp;&ensp;&ensp;磁盘阵列架构发展：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;软件RAID。通过操作系统中的软件实现RAID功能，但是要耗费大量计算资源。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;硬件RAID卡。由RAID卡提供RAID计算所需要的资源，不会占用系统资源，但是由于空间限制一台计算机无法连接多个硬盘，而且这样做不利于多服务器共享资源来实现集群或HA功能。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;单控制器磁盘阵列。把RAID保护的功能转移到主机外，实现了存储与计算的分离。通过SCSI、SAS、FC、IP等接口把更多台主机同时连接到外部存储器上，以实现对集群功能的支持。同时可连接更多的硬盘。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;双控制器磁盘阵列。提高存储的冗余性，来避免单点故障。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;多控制器磁盘阵列。更多控制器，更强性能。控制器之间耦合比较强，结构复杂，一般只有高端存储采用。<br/>

## RAID
Redundant Arrays of Independ Disks
### RAID0
&ensp;&ensp;&ensp;&ensp;RAID0将N块硬盘上选择合理的带区来创建带区集，将数据分割成不同条带分散写入到所有的硬盘中同时进行读写。多块硬盘的并行操作使同意时间内磁盘读写速度提升N倍。但是整个系统非常不可靠，如果出现故障，无法进行任何补救。<br/>
&ensp;&ensp;&ensp;&ensp;创建带区集的时候，需要合理地选择带区的大小。如果带区过大，可能一块硬盘上的带区空间就可以满足大部分I/O操作，使数据读写仍然只局限在少数的一两块银盘上，不能充分发挥并行优势。此外，如果控制器少的话，频繁读写很容易使控制器或总线负荷超载。最好一个磁盘一个控制器。

### RAID1
&ensp;&ensp;&ensp;&ensp;RAID1成为磁盘镜像，原理是把一个磁盘的数据镜像到另一个磁盘上。在写入一块磁盘使，会在另一块闲置的磁盘上生成镜像文件，在不影响性能的情况下最大限度地保障系统地可靠性和可修复性。只要系统中任何一对镜像盘中至少由一块磁盘可以使用，甚至可以在一半数量的硬盘出现问题时系统都可以正常运行，当一块硬盘失效时，系统会忽略该硬盘，转而使用剩余的镜像盘读写数据。坏掉的硬盘需要及时更换，不然镜像盘也坏了，系统会崩溃。<br/>
&ensp;&ensp;&ensp;&ensp;RAID1通过二次读写实现磁盘镜像，所以控制器负载也比较大。

### RAID0+1
&ensp;&ensp;&ensp;&ensp;是RAID0和RAID1的结合。至少要4块盘。在磁盘镜像中建立带区集。数据除分布在多个盘上外，每个盘都有物理镜像盘。

### RAID2
&ensp;&ensp;&ensp;&ensp;RAID2带海明码校验。将数据条块话分布于不同的硬盘上，条块单位为位或字节，使用一定的编码技术来提供错误检查及恢复。需要多个磁盘存放检查及恢复信息，技术实施复杂，商业环境很少用。

### RAID3
&ensp;&ensp;&ensp;&ensp;RAID3带奇偶校验码的并行传送。与RAID2类似，数据存放在多块盘上，用户要有3个以上驱动器。但与RAID2不同，只能查错不能纠错。

### RAID4
&ensp;&ensp;&ensp;&ensp;RAID4和RAID3很像，但它对数据的访问是按数据块进行，每次是一个盘。失败恢复的难度、控制器设计难度比RAID3大得多，访问数据效率不怎么好。

### RAID5
&ensp;&ensp;&ensp;&ensp;RAID5，分布式奇偶校验的独立磁盘结构。奇偶校验码存放在所有磁盘上。读出效率高，写入效率一般。奇偶校验码在不同盘上，提高了可靠性。但是对数据传输的并行性解决不好，控制器的设计也相当困难

### RAID6
&ensp;&ensp;&ensp;&ensp;RAID6，带两种分布存储的奇偶校验码独立磁盘结构，是对RAID5的扩展，主要用于要求数据绝对不能出错的场合，需要N+2个盘，控制器设计十分复杂，写入速度不好，计算奇偶校验值和验证数据正确性花费的时间比较多。

### RAID7
&ensp;&ensp;&ensp;&ensp;优化的高速数据传送磁盘结构。RAID7所有I/O传送是同步进行的，可以分别控制，这样提高了系统的并行性，提高系统访问数据的速度。

### RAID10
&ensp;&ensp;&ensp;&ensp;一个带区结构加一个镜像结构。

### RAID53
&ensp;&ensp;&ensp;&ensp;RAID3和带区结构的统一，价格十分高，不易于实现

### RAID5E
&ensp;&ensp;&ensp;&ensp;在RAID5上的改进，数据校验信息均匀分布在各个盘上，但是每个硬盘都有一个未使用的空间没有进行条带化，最多允许两块物理盘故障。看起来RAID5E和RAID5加一块热备盘差不多，但RAID5E>RAID5+热备盘。一块硬盘故障时，所有故障盘上的数据会被压缩到其他硬盘上未被使用的空间，逻辑盘保持RAID5级别。

### RAID5EEE
&ensp;&ensp;&ensp;&ensp;每个硬盘的一部分空间作为热备盘，是阵列的一部分，当阵列中一个物理盘出现故障时，数据重建的速度会更快。

:::tip
一般在数据库场景都用RAID10
:::
