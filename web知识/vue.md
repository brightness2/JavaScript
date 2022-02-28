# 前端模块化：CommonJS,AMD,CMD,ES6 
    1、模块化的开发方式可以提高代码复用率，方便进行代码的管理。

    2、commonJS：
        - Node.js是commonJS规范的主要实践者，它有四个重要的环境变量为模块化的实现提供支持：module、exports、require、global。(比如 node.js)
        - 实际使用时，用module.exports定义当前模块对外输出的接口（不推荐直接用exports），用require加载模块。
        - commonJS用同步的方式加载模块
        ```
        // 定义模块math.js
        var basicNum = 0;
        function add(a, b) {
        return a + b;
        }
        module.exports = { //在这里写上需要向外暴露的函数、变量
        add: add,
        basicNum: basicNum
        }

        // 引用自定义的模块时，参数包含路径，可省略.js
        var math = require('./math');
        math.add(2, 5);

        // 引用核心模块时，不需要带路径
        var http = require('http');
        http.createService(...).listen(3000);

        ```
    3、AMD：
        - AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
        - require.js实现AMD规范的模块化：用require.config()指定引用路径等，用define()定义模块，用require()加载模块。(比如 layui)
        ```
        /** 网页中引入require.js及main.js **/
        <script src="js/require.js" data-main="js/main"></script>
        /** main.js 入口文件/主模块 **/
        // 首先用config()指定各模块路径和引用名
        require.config({
        baseUrl: "js/lib",
        paths: {
            "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
            "underscore": "underscore.min",
        }
        });
        // 执行基本操作
        require(["jquery","underscore"],function($,_){
        // some code here
        });

        ```
    4、CMD：
        - CMD是另一种js模块化方案，它与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。

    5、ES6：
        - ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，旨在成为浏览器和服务器通用的模块解决方案。
        - 由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
        ```
        /** 定义模块 math.js **/
        var basicNum = 0;
        var add = function (a, b) {
            return a + b;
        };
        export { basicNum, add };

        /** 引用模块 **/
        import { basicNum, add } from './math';
        function test(ele) {
            ele.textContent = add(99 + basicNum);
        }

        ```

# 在vue中@tap是什么？和@click有什么区别？
都是点击事件，但是@click在移动端有延迟，@tap没有 

# 使用vue如何监听元素尺寸的变化？
通过 ResizeObserver 实现
    ```
        const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            entry.target.style.borderRadius = Math.max(0, 250 - entry.contentRect.width) + 'px';
        }
        });
        resizeObserver.observe(document.querySelector('.box:nth-child(2)'));
    ```

# 监听 vue怎么监听command+回车
   1、监听回车 @keyup.enter
   2、监听其它键 @keyup.67  (67 是按键编号)
   2、监听command/window键 @keyup.meta 
   3、监听组合command+回车 @keyup.meta.enter


# 请解释下Vue中slot和slot-scope两者的区别
    1、插槽 slot，是组件的一块HTML模板，这块模板显示不显示、以及怎样显示由父组件来决定。
    2、slot-scope ,作用域插槽。

# vue的v-for里如何动态绑定v-model？
```
    <div v-for="item in proList">
        <el-input type="number" v-model="$data[item.trsNum]" class="trsInput"></el-input>
    </div>

    //////////
    data() {
        return {
          trsNum_0: '',  //数量
          trsNum_1: '',  //数量
        }
    }

```

# 如何让你开发的组件支持 v-model
```
<template>
<div>
  我们是TI{{ ame }}冠军
  <el-button @click="playDota2(1)">加</el-button>
  <el-button @click="playDota2(-1)">减</el-button>
</div>
</template>
<script>
export default {
  props: {
    ame: {
      type: Number,
      default: 8
    }
  },
  model: { // 自定义v-model的格式
    prop: 'ame', // 代表 v-model 绑定的prop名
    event: 'zard' // 代码 v-model 通知父组件更新属性的事件名
  },
  methods: {
    playDota2(step) {
      const newYear = this.ame + step
      this.$emit('zard', newYear)
    }
  }
}
</script>

```

# 计算属性computed和watch的区别是什么？
1、computed：计算属性，计算结果会被缓存
2、watcher ：监听回调，当依赖的 data 的数据变化，执行回调，在方法中会传入 newVal 和 oldVal。
3、能用computed实现的功能，尽量用computed

# Vue中的computed如何监听数组的变化？
1、计算属性由数组元素计算得来，数组元素变化，数组length不变，不会触发计算属性变化，如果数组length改变了，则会触发计算属性变化；
2、所以，解决方案是，让数组length改变；

# 父子组件异步动态获取数据，子组件获取不到值或者延时获取如何解决？
1、v-if 条件渲染子组件，当有值时再加载；
2、$nextTick()函数，处理等待子组件渲染完成时再操作

# 使用v-for分别获取列表前n个数据、中间范围数据、末尾n条数据的方法有哪些？
1、从数据来源处理，slice 截取数组
2、判断 index 

# vue组件中的data能否以对象形式返回？为什么？
不能，因为这样会造成对象共享，数据混乱；以函数返回这回new一个新的对象。

