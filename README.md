## 门窗DEMO

### src关键目录说明
├─data.ts                       测试数据
├─types.ts                      类型定义  
├─utils                         工具函数
├─threeD                        3D相关
|   ├─index.ts                  入口，根据传入数据初始化3D效果
|   ├─models                    存放所有的模型，一般会继承basecModel下的对应类
|   ├─lights                    创建灯光, 如点光源、聚光灯等  
|   ├─common                    three.js相关的公共代码，如相机、场景、渲染器等
|   ├─basicModel                基础类
├─components                    存放React组件  
├─assets                        静态资源