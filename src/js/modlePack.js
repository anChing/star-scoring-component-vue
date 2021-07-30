// 引入vue
import Vue from 'vue';
// 创建实例
let v = new Vue();

function errModle(content = '出错了', title = '警告') {
	return new Promise((resove, reject) => {
    v.$confirm(content, title, {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              resove('yes')
            }).catch(() => {
              reject('no')
            });

	})
}

export {
	errModle,
}
