<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 回执登录表单 -->
      <el-form ref="LoginFormRef" :model="LoginForm" :rules="rules">
        <img src="./logo_index.png" alt />
        <!-- prop使得校验规则可以找到当前目录进行匹配校验 -->
        <!-- 值就是当前校验的名称 -->
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号码：">
            <!-- <i slot="prefix" class="el-input__icon el-icon-mobile"></i> -->
            <i slot="prefix" class="iconfont icon-icon-test"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="LoginForm.code" placeholder="请输入验证码：">
            <!-- <i slot="prefix" class="el-input__icon el-icon-mobile"></i> -->
            <i slot="prefix" class="iconfont icon-icon_verification"></i>
          </el-input>
        </el-form-item>
        <!-- 自定义校验： xieyi-->
        <el-form-item prop="xieyi">
          <!-- 复选框 -->
          <el-checkbox v-model="LoginForm.xieyi"></el-checkbox>
          <span>
            我已阅读并同意
            <a href="#">用户协议</a>
            和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            style="width:100%"
            :disabled="isLoading"
            :loading="isLoading"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// gt.js 文件本身没有做导出，所以可以直接导入，此时系统新增一个全局变量initGeeTest
import './gt'
// 导入 iconfont文件：
import '@/assets/font/iconfont.css'

export default {
  name: 'login',
  data () {
    // 声明局部函数，实现校验：
    var xieyiTest = function (rule, value, callback) {
      // rule 校验规则 一般无用
      // value 被校验的值：
      // callback 回调函数 校验成功或者失败：
      // if (value) {
      //   // 校验成功
      //   callback()
      // } else {
      //   // 校验失败
      //   callback(new Error('请遵守协议'))
      // }
      // 三元表达式 优化：
      value ? callback() : callback(new Error('请遵守协议'))
    }
    return {
      capObj: null,
      isLoading: false,
      LoginForm: {
        mobile: '',
        code: '246810',
        xieyi: true
      },
      // 表单校验
      rules: {
        // 项目名称:[{具体校验规则},{具体校验规则}]
        mobile: [
          {
            // 规则：required 项目必填 message：错误提示  min：信息长度最小显示 max：信息长度最大限制
            required: true,
            message: '手机号码必填'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码必填'
          }
        ],
        xieyi: [
          {
            validator: xieyiTest
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      // 表单校验：
      // this.$refs.LoginFormRef // el-form 组件对象
      this.$refs.LoginFormRef.validate(valid => {
        // valid:true  校验通过  valid:false 校验失败
        if (!valid) {
          return false // 校验失败 代码停止
        }
        // 检验极验窗口是否存在：
        if (this.capObj !== null) {
          return this.capObj.verify()
        }
        // 设置按钮状态：
        this.isLoading = true
        // A. 人机交互验证
        // axios获得极验的秘钥信息
        let pro = this.$http({
          url: '/mp/v1_0/captchas/' + this.LoginForm.mobile,
          method: 'get'
        })
        pro
          .then(result => {
            // console.log(result) // 极验的秘钥信息

            // 从result里边解构下述的data对象出来(对象结构赋值)
            let { data } = result.data
            // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
            window.initGeetest(
              {
                // 以下配置参数来自服务端 SDK
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success,
                new_captcha: true,
                product: 'bind' // 设置验证窗口样式的
              },
              captchaObj => {
                // 这里可以调用验证实例 captchaObj 的实例方法
                captchaObj
                  .onReady(() => {
                    // 验证码ready之后才能调用verify方法显示验证码(可以显示窗口了)
                    captchaObj.verify() // 显示验证码窗口
                    this.capObj = captchaObj
                    this.isLoading = false
                  })
                  .onSuccess(() => {
                    // 行为校验正确的处理
                    // B. 验证账号，登录系统
                    this.submitAt()
                  })
                  .onError(() => {
                    // 行为校验错误的处理
                  })
              }
            )
          })
          .catch(err => {
            return this.$message.error('获取极验秘钥失败：' + err)
          })
        // B.验证账号，登录系统：
        // this.submitAt()
      })
    },
    // 账号真实性校验，单独拿出来：
    submitAt () {
      let pro = this.$http({
        url: '/mp/v1_0/authorizations',
        method: 'POST',
        data: this.LoginForm
        // {
        //   mobile: 18040570831,
        //   code: 123456
        // }
      })
      pro
        .then(result => {
          // console.log(result)

          // 客户端记录服务端返回的秘钥：
          window.sessionStorage.setItem(
            'userinfo',
            JSON.stringify(result.data.data)
          )
          this.$router.push('/home')
        })
        .catch(error => {
          // console.log('手机号码或验证码错误' + error)
          // Element 弹出方法
          this.$message.error('手机号码或验证码错误' + error)
        })
      // this.$router.push('/home')
      // this.$router.push({ name: 'home' })  // name属性实现编程导航
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  //   background-color: #ccc;
  background-image: url(./login_bg.jpg);
  background-size: cover;
  // width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    background-color: #fff;
    width: 410px;
    height: 340px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 75%;
      text-align: center;
      img {
        width: 60%;
        margin: 20px auto;
      }
    }
  }
}
</style>
