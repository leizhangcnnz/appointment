## 安装

如果你想要部署在centos服务器上，可以直接使用我们的一键安装部署脚本：
```sh
$ sh install.sh
```
如果你想要自己安装配置，本项目使用 [node](http://nodejs.org),[npm](https://npmjs.com),[yarn](),[forever]() 请确保你在本地进行了正确的安装。

```sh
$ npm install --global yarn
$ npm install --global forever
```


## 使用说明

如果你使用了上述的一键安装脚本，后面启动时，请注意端口是否被占用：

```sh
$ yum install lsof
$ lsof -i:80
$ lsof -i:6060
```
如果存在端口占用，请结束进程或者更换端口
然后执行下列指令进行生产环境部署

```sh
$ cd src
$ yarn build
$ nohup serve -s build -l 80 &
$
$ cd server
$ forever start app.js
```

或者进行开发环境部署

```sh
$ cd src
$ nohup yarn dev
$
$ cd server
$ forever start app.js
```
