<template>
  <div>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="70px" class="login-form" label-position="left">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-button type="primary" @click="onLogin('form')" style="width:61.8%">注册</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        form: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onLogin (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // console.log('submit!')
          } else {
            // console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  h2 {
    text-align: left;
    margin-left: 5%;
  }
</style>
