# Type RouteRecordRaw的作用

`RouteRecordRaw` 是 Vue Router 库为 TypeScript 提供的 **路由规则类型接口（Interface）**，它定义了「一个合法的 Vue Router 路由配置项必须包含哪些属性、可选哪些属性，以及每个属性的类型是什么」。

| 属性名 | 类型  | 是否必填 | 说明  |
| --- | --- | --- | --- |
| `path` | `string` | 是   | 路由路径（如 `/home`） |
| `component` | `Component \| () => Promise<Component>` | 是   | 路由对应的组件（可是同步组件或异步组件） |
| `name` | `string \| symbol` | 否   | 路由名称（用于命名路由跳转） |
| `meta` | `Record<string, any>` | 否   | 路由元信息（存储自定义数据，如权限、标题） |
| `children` | `RouteRecordRaw[]` | 否   | 子路由配置（嵌套路由） |
| `redirect` | `string \| RouteLocationRaw \| () => RouteLocationRaw` | 否   | 路由重定向规则 |

简单来说，就是用来约束routes的。
