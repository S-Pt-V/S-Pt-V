# 静态路由协议

路由器按照路由表选路。

路由器是连接不同局域网以形成一个大的广域网的设备。交换机连接设备，形成一个局域网，通过路由器连接其他局域网。路由器在保证各个局域网独立时，还提供连通性。

路由器的接口隔离广播域，隔离地址段。路由器的每个接口地址都属于不同的地址段。

路由器转发数据时，根据数据包中IP头部的目的ip查询路由表，查看有无到达目的ip的路由。需要在路由器上填写静态路由，指定目的地址走的下一跳。

跳数：网络中经过路由器的个数；下一跳地址：下一个路由器的地址，自己能到达的并且有能力帮忙转发数据的路由器。

指定下一跳的方式会进行递归查询，根据提供的下一跳地址，再查询是否有到达下一跳地址的路由。

指定出接口可能会导致一些问题，例如路由不是最优，或者arp的问题(arp代理)。

```shell
ip route add [目的地址] [子网掩码] [下一跳地址]
ip route add [目的地址] [子网掩码] [出接口]
ip route add [目的地址] [子网掩码] [出接口] [下一跳地址]
```

默认路由，去往所有地址的路由。适用于末梢网络环境，边缘网络。
```shell
ip route 0.0.0.0 0.0.0.0 [出接口] [下一跳]
```

若同一目的地址段写多条不同下一跳的路由，同一条路由会出现并列的下一跳，叫做负载均衡。在匹配到这个路由时，会在每个接口/下一跳各发一个包，这样会不稳定。

掩码最长匹配规则，路由表中同一地址，但是不同掩码长度，会匹配最长掩码的路由条目。在没有匹配到别的路由时，会匹配默认路由。
