# 交换机
## 工作机制
&ensp;&ensp;&ensp;&ensp;交换机在数据通信中完成两个基本操作：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;①构造和维护MAc地址表<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;②交换数据帧打开源端口与目标端口之间的数据通道，把数据帧转发到目标端口上。<br/>

&ensp;&ensp;&ensp;&ensp;交换机中有一个交换地址表，记录着主机MAC地址和该主机所连接的交换机端口之间的对应关系，并由交换机采用动态自学习源MAC地址的方法构造和维护。<br/>
&ensp;&ensp;&ensp;&ensp;在交换地址表为空时，表中无地址记录。当某一主机发送数据帧时，交换机会把该主机MAC地址与端口地址记录到表中，并向所有其他主机发送该数据帧（泛洪）。只有主机发送数据帧时，MAC地址才会跟端口一起记录到表中。<br/>
&ensp;&ensp;&ensp;&ensp;下一次发送数据帧时，交换机会提取数据帧的目的MAC地址，在表中查找到该MAC地址对应的端口，交换机就打开源端口与目的端口的通道，转发。<br/>
&ensp;&ensp;&ensp;&ensp;交换地址表的记录有一个时间标记，每次使用该条记录时，时间标记会被更新。一段时间内没有更新的话，该条记录就会被移除。<br/>

## 交换方式

### 直通 Cut-through
&ensp;&ensp;&ensp;&ensp;采用直通方式的交换机可以理解为各端口之间的纵横交叉的线路矩阵交换机。收到数据帧时，会检测帧头，获取目的地址，然后查表转换为相应端口，在输入与输出交叉处相连完成转发。<br/>
&ensp;&ensp;&ensp;&ensp;由于只检查帧头的14字节，不需要存储，所以延迟小，交换速度快。<br/>
&ensp;&ensp;&ensp;&ensp;缺点：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;①由于数据帧没有被交换机存储，所以无法检测数据帧是否有误。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;②输入/输出端口间有速度上的差异，连接到高速网络时，没有缓存直接接通输入/输出容易丢帧。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;③交换机端口增加时，交换矩阵变得越来越复杂，硬件实现困难。<br/>

### 存储转发 Store-and-Forward
&ensp;&ensp;&ensp;&ensp;是使用最为广泛的方式。把输入端口的数据帧先缓存，然后进行CRC校验。处理错误帧之后才取出目的MAC地址，通过查表得到输出端口之后送出帧。<br/>
&ensp;&ensp;&ensp;&ensp;优点：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;①有错误检测，提高了传输可靠性。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;②支持不同速度间的转换。<br/>
&ensp;&ensp;&ensp;&ensp;缺点：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;数据缓存、校验影响交换速度。但在不稳定的网络环境下，该方式仍然能提高网络性能。<br/>

### 碎片隔离 Fragment Free
&ensp;&ensp;&ensp;&ensp;这是介于直通式和存储转发式之间的一种解决方案。首先检查数据帧长度是否有64字节。小于64字节说明是假帧(残帧)，丢弃。大于64则发送。该方式不提供数据校验，速度大于存储转发式，小于直通式。广泛用于低端交换机中。<br/>
&ensp;&ensp;&ensp;&ensp;这类交换机使用了一种特殊的缓存。是一种先进先出的缓存(FIFO)。如果帧以小于512bit的长度结束，那么FIFO中的内容都被丢弃。<br/>
