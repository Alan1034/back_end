
开始运行：
cnpm install

npm start 

热刷新模式把packjson里面的 "start": "node ./bin/www"
改为  "start": "nodemon ./bin/www"


nodemon 配置

restartable-设置重启模式 
ignore-设置忽略文件 
verbose-设置日志输出模式，true 详细模式 
execMap-设置运行服务的后缀名与对应的命令 
{ 
“js”: “node –harmony”
} 
表示使用 nodemon 代替 node 
watch-监听哪些文件的变化，当变化的时候自动重启 
ext-监控指定的后缀文件名

cnpm install -g pkg

pkg . --out-path "./build"

打包存放到build文件夹内