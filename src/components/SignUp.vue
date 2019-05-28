<template>
    <div>
        <Row type="flex" justify="center">
            <Col span=12>
                <h2>Sign up</h2>
                <br>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="Name" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"/>
                </FormItem>
                <FormItem label="E-mail" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="Enter your e-mail"/>
                </FormItem>
                <FormItem label="Age" prop="age">
                    <Input type="text" v-model="formValidate.age" number/>
                </FormItem>
                <FormItem label="Password" prop="passwd">
                    <Input type="password" v-model="formValidate.passwd"/>
                </FormItem>
                <FormItem label="Confirm" prop="passwdCheck">
                    <Input type="password" v-model="formValidate.passwdCheck"/>
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
                } else {
                    if (this.formValidate.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password again'));
                } else if (value !== this.formValidate.passwd) {
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };

            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Age cannot be empty'));
                }
                if (!Number.isInteger(value)) {
                    callback(new Error('Please enter a numeric value'));
                }
                callback()
            };

            return {
                formValidate: {
                    name: '',
                    mail: '',
                    passwd: '',
                    passwdCheck: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    age: [
                        { required: true, validator: validateAge, trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { required: true, validator: validatePassCheck, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const data = {
                            username: this.formValidate.name,
                            password: this.formValidate.passwd,
                            email: this.formValidate.mail,
                            // point: 0,
                            age: this.formValidate.age
                        }
                        this.$http.post('/user/signup-user', data)
                          .then(res => {
                            if(res.data.token != '') {
                                localStorage.token = res.token
                                this.$store.commit('userSignin', res.data.user_id, this.formValidate.name)
                                this.$route.push('/')
                            }
                            else {
                                this.$Message.error(res.data.msg)
                            }
                        }).catch(error => {
                            console.log(error)
                            // this.$Message.error(error.data)
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
