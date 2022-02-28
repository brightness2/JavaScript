# 性能优化
1、减少打包体积
    - 图片压缩，静态资源CDN托管
    - tree shaking，开启 terser-webpack-plugin
    - 移除多余的css

2、优化策略
    - css link 放在头部，script标签放在底部
    - 减少DOM操作
    - 批量操作css，减少页面重绘重排
    - 复用公共函数、组件
    - construction 构造函数中绑定this
    - 对循环的节点增加可以属性
    - 对事件添加防抖和节流

#   如何提高webpack的构建速度？
1、开启缓存插件
2、使用thread-loader进行多进程构建
3、预打包第三方类库


#  webpack的构建流程是怎样的？
初始化参数->编译->确定入口->编译模块->完成编译->输出资源->完成输出

# webpack的loader和plugin的区别是什么？
loader用于对模块源码的转换，在buld中引入这些依赖，比如 css-loader

plugin 是插件，目的在于解决loader无法实现的其他事。

#    webpack中的resolve.modules和resolve.alias有什么区别
resolve.modules 设置第三包的路径
resolve.alias 设置路径别名，缩短路径

