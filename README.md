## 门窗DEMO

### src关键目录说明 
|- data.ts                       <font color= "#999">测试数据</font>
|- types.ts                      <font color= "#999">类型定义</font>  
|- utils                         <font color= "#999">工具函数</font>  
|- threeD                        <font color= "#999">3D相关</font>  
|---- index.ts                   <font color= "#999">入口，根据传入数据初始化3D效果</font>  
|---- models                     <font color= "#999">存放所有的模型，一般会继承basecModel下的对应类</font>  
|---- lights                     <font color= "#999">创建灯光, 如点光源、聚光灯等</font>  
|---- common                     <font color= "#999">three.js相关的公共代码，如相机、场景、渲染器等</font>  
|---- basicModel                 <font color= "#999">基础类</font>  
|- components                    <font color= "#999">存放React组件</font>   
|- assets                        <font color= "#999">静态资源</font>  