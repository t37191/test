<template>
    <div>
        <Row type="flex" justify="center">
            <Col span=12>
                <h2>Sign in</h2>
                <br>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="Name" prop="username">
                    <Input v-model="formValidate.username" placeholder="Enter your user name"/>
                </FormItem>
                <FormItem label="Password" prop="passwd">
                    <Input type="password" v-model="formValidate.passwd"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {

            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password'));
                }
                callback()
            };

            return {
                formValidate: {
                    username: '',
                    passwd: '',
                },
                ruleValidate: {
                    username: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const data = {
                            username: this.formValidate.username,
                            password: this.formValidate.passwd
                        }
                        this.$http.post('/user/login', data)
                          .then(res => {
                            if (res.data.token != '') {
                                let iAdmin = true
                                if (res.data.isadmin == 'false') {
                                    iAdmin = false
                                }
                                this.$store.commit('userSignin', {userId:res.data.user_id, userName:this.formValidate.username, token:res.data.token, isAdmin: iAdmin})
                                console.log('signin page')
                                console.log(this.$store.state.userData)
                                this.$router.push('/')
                            }
                            else {
                                this.$Message.error(res.data.msg)
                            }
                        }).catch(error => {
                            alert('error')
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
