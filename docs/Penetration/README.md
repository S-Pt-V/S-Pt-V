# 渗透测试

## 网站信息收集

### 网站指纹识别

网站的基本组成：服务器（操作系统），中间件（开启端口的Web容器），脚本语言，数据库

#### 操作系统

1. ping判断，windows的TTL一般为128，linux为64.TTL大于100的一般为windows，几十的一般为linux
2. nmap -O
3. windows 大小写不敏感，linux区分大小写。在url地址栏中可以看到。windows服务器上的url均为小写。

#### 网站服务/容器类型

1. F12查看响应头Server字段。
2. whatweb。https://www.whatweb.net，类似站长之家，是个在线的网站。
3. wappalyzer插件。浏览器插件。在其官网下载，官网上也有在线接口。

#### 脚本类型

php，jsp，asp/aspx，python

通过网站后缀判断，例如.php .jsp .do .action等。

#### 数据库类型

mysql，sqlserver，access，oracle

使用sqlmap探测指纹信息。

知道是什么语言才可以针对性的进行文件扫描、文件上传等操作。

#### CMS识别

内容管理系统，如dedecms织梦，Discuz，phpcms等。通常用于网站的内容文章、博客等管理。CMS框架有很多漏洞。

在线识别工具：http://whatweb.bugscaner.com/look/

在线工具：<br />
https://gihub.com/iceyhexman/onilnetools<br />
https://pentest.gdpicsa.org/<br />

例如discuz是一个博客内容管理系统，就可以在exploit-db.com看到其各个版本下的漏洞。

### 敏感文件及目录探测

可以通过搜索敏感文件和目录拿到系统信息，例如<br />
github，git，svn等为代码仓库备份文件。<br />
.DS_Stor，macos的网站文件备份系统<br />
.hg，.bzr，cvs，WEB_INF等。<br />

#### github泄露

开发人员上传代码至网站，没有删除一些重要信息，例如邮箱信息、SVN信息、内部账号和密码、数据库连接信息，服务器配置信息等。尤其是邮箱信息和内部账号和密码。

这类信息可以通过在github上搜索公司的一些特定信息，查看是否有程序员将这些信息上传到了github上。

#### .git泄露

网站管理员将本地仓库和远程仓库互相备份克隆时，没有隐藏.git。可以使用GitHack。

开发人员使用git进行版本控制，自动部署网站。若配置不当，可能会将.git文件部署到线上环境，引起git泄露。在网站安全维护方面，.git和svn信息泄露时非常常见也非常致命的漏洞。会导致整给网站源码泄露。

GitHack可以通过.git重建还原工程源码。

#### .svn泄露

svn和git类似，可以使用svnExploit。

#### WEB_INF/web.xml泄露

WEB-INF是java的WEB应用安全目录。如果向在页面中直接访问其中的文件，必须通过web.xml文件对要访问的文件进行响应映射才能访问。

#### 网站备份文件

比如开发人员将网站备份文件或敏感信息文件存放在某个网站目录下。可以用7kbscan-WenPathBrute（不太好用）

#### 目录探测

dirsearch： https://github.com/maurosoria/dirsearch

dirmap: https://github.com/H4ckForJob/dirmap

### 网站waf识别



