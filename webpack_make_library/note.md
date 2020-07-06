#### webpack打包一个自定义第三方库
- 配置文件：webpack.confing.js 
- 目标文件：`./src/index.js`
- 打包命令：npm run build
- 打包输出文件：index.bundle.js

#### 使用方法
- 导入文件：
```javascript
import {wordToNum} from index.bundle
```
