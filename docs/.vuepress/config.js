module.exports = {
  title: "技术文档",
  themeConfig: {
    nav: [
      {text: "主页", link: "/"}
    ],
    sidebar: [
      ["/", "主页"],
      {
        title: "实验室记录",
        path: "/lab/",
        collapsable: true,
        children: [
          ["/lab/vue", "VUE"]
        ]
      },
      {
        title: "计算机网络",
        path: "/network/",
        collapsable: true,
        children: [
          ["/network/Basics", "基础知识"],
          ["/network/CCNA", "CCNA"],
          ["/network/CCNP", "CCNP"]
        ]
      },
      {
        title: "Oracle",
        path: "/oracle/",
        collapsable: true,
        children: [
          ["/oracle/structure", "Oracle体系架构"],
          ["/oracle/installation", "Oracle软件安装"],
          ["/oracle/dbcreate", "创建数据库"],
          ["/oracle/listener", "创建监听"],
          ["/oracle/directory", "Oracle目录结构"],
          ["/oracle/connect", "Oracle连接方式"],
          ["/oracle/instance", "Oracle实例"],
          ["/oracle/sid", "Oracle SID"],
          ["/oracle/checkpoint", "Oracle检查点"],
          ["/oracle/instancerecovery", "Oracle实例恢复"],
          ["/oracle/startup&shutdown", "Oracle启动和关闭"],
          ["/oracle/multienant", "Oracle多租户架构"],
          ["/oracle/cdb", "CDB"],
          ["/oracle/pdb", "PDB"],
          ["/oracle/architecture", "体系结构"],
          ["/oracle/memoryarchitecure", "内存结构"],
          ["/oracle/progressarchitecure", "进程结构"],
          ["/oracle/physicstorage", "物理存储结构"],
          ["/oracle/logicstorage", "逻辑存储结构"],
          ["/oracle/files", "文件"],
          ["/oracle/tablespace", "表空间"]
        ]
      },
      {
        title: "虚拟化",
        path: "/virtualize/",
        collapsable: true,
        children: [
          ["/virtualize/interface", "虚拟网卡"],
          ["/virtualize/yum", "yum换源"],
          ["/virtualize/ntp", "ntp服务"],
          ["/virtualize/dns", "dns服务"],
          ["/virtualize/kms", "kms服务"],
        ]
      },
      {
        title: "嵌入式",
        path: "/embeded/",
        collapsable: true,
        children: [
          ["/embeded/stm32", "stm32"]
        ]
      },
      {
        title: "机器学习",
        path: "/machinelearning/",
        collapsable: true,
        children: [
          ["/machinelearning/kNN", "k-邻近算法"],
          ["/machinelearning/decisiontree", "决策树"],
        ]
      },
      {
        title: "计算机视觉与深度学习",
        path: "/cv&dl/",
        collapsable: true,
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
        title: "数据库系统开发",
        path: "/db_demo/",
        collapsable: true,
        children: [
          ["/db_demo/database", "数据库配置"],
          ["/db_demo/dotnetcore", "Asp.net core 项目开发"],
          ["/db_demo/vue","前端开发"]
        ]
      },
      {
        title: "VUE",
        path: "/vue/",
        collapsable: true,
        children: [
          ["/vue/environment", "环境配置"],
          ["/vue/project", "项目创建"],
        ]
      },
      {
        title: "Python",
        path: "/python/",
        collapsable: true,
        children: [
          ["/python/crawl", "爬虫"]
        ]
      },
      {
        title: "Sangfor",
        path: "/sangfor/",
        collapsable: true,
        children: [
          ["/sangfor/firewall","AF"],
          ["/sangfor/ac", "AC"],
          ["/sangfor/vpn", "VPN"]
        ]
      },
    ],
    sidebarDepth: 4
  }
}
