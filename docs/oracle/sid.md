# SID

SID 系统标识符。用于特定主机上的Oracle数据库实例的唯一名称。在Linux上，Oracle数据库使用SID和Oracle home值创建共享内存的密钥，Oracle数据库默认情况下使用SID来定位初始化参数文件，该文件将找到相关文件，例如数据库控制文件。

系统中自定义环境变量ORACLE_SID，oracle通过SID来寻找ORACLE_HOME目录下dbs子目录中的参数文件。

参数文件的命名中带有SID。通过读取参数文件，得到其中记录的分配内存大小等参数，进行内存分配，启动后台进程，开启数据库实例。

