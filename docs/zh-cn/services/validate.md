# validate数据校验

---

- 介绍

用于表单的提交前的数据校验,验证通过返回true,否则为false

- 示例

```js
// 手机验证
this.$_validate.mobile('15000000001') // true
// 邮箱验证
this.$_validate.email('abc@qq.com') // true
// 6-16为密码验证
this.$_validate.password('123') // false
// ...其他
```