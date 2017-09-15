// 表单验证服务
const validate = {
    mobile(mobileNum) {
        let phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        let isMobile = phoneReg.test(mobileNum.trim())
        return isMobile
    },
    email(emailStr) {
        let emailReg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
        let isEmail = emailReg.test(emailStr)
        return isEmail
    },
    password(passwordStr) { // 6-16位包含数字和字母
        let passwordReg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/
        let isPassword = passwordReg.test(passwordStr)
        return isPassword
    }
}

export default validate