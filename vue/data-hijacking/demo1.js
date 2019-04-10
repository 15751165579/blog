/**
 * 数据双向绑定
 * 
 * 
 * 
 *       data
 *        
 *       getter -------> 收集依赖 
 *                                  Watcher -------> 更新视图
 *       setter -------> 通知变化 
 * 
 * 
 * 数据劫持 + 发布订阅
 */

// 一、简单的数据劫持
function defineReactive (obj, key) {
  let val = obj[key]
  Object.defineProperty(obj, key, {
    get () {
      console.log(' === 收集依赖 === ')
      console.log(' 当前值为：' + val)
      return val
    },
    set (newValue) {
      console.log(' === 通知变更 === ')
      console.log(' 当前值为：' + newValue)
      val = newValue
    }
  })
}

const student = {
  name: 'xiaoming'
}

defineReactive(student, 'name')

student.name
student.name = 'xiaohong'
student.name