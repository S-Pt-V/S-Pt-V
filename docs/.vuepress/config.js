module.exports = {
  title: "技术文档",
  themeConfig: {
    nav: [
      {text: "主页", link: "/"}
    ],
    sidebar: [
      ["/", "主页"],
      {
        title: "虚拟化",
        path: "/virtualize/",
        collapsable: false,
        children: [
          ["/virtualize/interface", "虚拟网卡"],
          ["/virtualize/yum", "yum换源"],
          ["/virtualize/ntp", "ntp服务"],
          ["/virtualize/dns", "dns服务"],
          ["/virtualize/kms", "kms服务"],
        ]
      },
      {
        title: "计算机网络",
        path: "/network/",
        collapsable: false,
        children: [
          ["/network/osi", "OSI模型"],
          ["/network/Internet", "互联网"],
          ["/network/switch", "交换机"],
          ["/network/router", "路由器"],
          ["/network/storage", "存储"],
        ]
      },
      {
        title: "Sangfor",
        path: "/sangfor/",
        collapsable: false,
        children: [
          ["/sangfor/vpn", "VPN"],
          ["/sangfor/ac", "AC"],
          ["/sangfor/firewall","AF"]
        ]
      },
      {
        title: "Oracle",
        path: "/oracle/",
        collapsable: false,
        children: [
          ["/oracle/oracle", "Oracle"],
          ["/oracle/structure", "Oracle体系架构"],
          ["/oracle/directory", "Oracle目录结构"],
          ["/oracle/connect", "Oracle连接方式"],
          ["/oracle/instance", "Oracle实例"],
          ["/oracle/sid", "Oracle SID"],
          ["/oracle/checkpoint", "Oracle检查点"],
          ["/oracle/instancerecovery", "Oracle实例恢复"],
          ["/oracle/startup&shutdown", "Oracle启动和关闭"],
          ["/oracle/multitenant", "Oracle多租户环境"]
        ]
      },
      {
        title: "嵌入式",
        path: "/embeded/",
        collapsable: false,
        children: [
          ["/embeded/stm32", "stm32"]
        ]
      },
      {
        title: "机器学习",
        path: "/machinelearning/",
        collapsable: false,
        children: [
          ["/machinelearning/kNN", "k-邻近算法"],
          ["/machinelearning/decisiontree", "决策树"],
        ]
      },
      {
        title: "计算机视觉与深度学习",
        path: "/cv&dl/",
        collapsable: false,
        children: [
          ["/cv&dl/imagclassify", "图像分类"],
          ["/cv&dl/linear", "线性分类器"],
          ["/cv&dl/FC", "全连接神经网络"],
          ["/cv&dl/CNN", "卷积神经网络"],
          ["/cv&dl/classic", "经典网络分析"],
          ["/cv&dl/segmentation","图像分割"]
        ]
      },
      {
        title: "vue",
        path: "/vue/",
        collapsable: false,
      },
      {
        title: "数据库系统开发",
        path: "/db_demo/",
        collapsable: false,
        children: [
          ["/db_demo/database", "数据库配置"],
          ["/db_demo/dotnetcore", "Asp.net core 项目开发"],
          ["/db_demo/vue","前端开发"]
        ]
      },
      {
        title: "Python",
        path: "/python/",
        collapsable: false,
        children: [
          ["/python/crawl", "爬虫"]
        ]
      },
    ],
    sidebarDepth: 4
  }
}
