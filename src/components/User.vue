<template>
<div>
    <Row type="flex" justify="center" :gutter="24">
        <Col span="3">
            <div class="profile-pic-box">
                <img src="../assets/logo.png" alt="" class="profile-pic">
            </div>
        </Col>
        <Col span="14" class="profile-box">
            <Row type="flex" justify="space-between" align="middle">
                <Col span="14">
                    <p style="font-size: 3em;">{{ userInfo.username }}</p>
                    <br>
                    <div v-if="!isEdit">
                        <p>年龄：{{ userInfo.age }}</p>
                        <br>
                        <p>性别：{{ userInfo.sex }}</p>
                        <br>
                        <p>联系方式：{{ userInfo.email }}</p>
                    </div>
                    <div v-else>
                        <div>年龄：<Input type="text" v-model="age"/></div>
                        <div>性别：<Input type="text" v-model="sex"/></div>
                        <div>联系方式：<Input type="text" v-model="email"/></div>
                    </div>
                </Col>
                <Col span="2">
                    <Button v-if="$route.params.userId == $store.state.userData.userId"
                        type="info" ghost long @click="editProfile"
                    >{{ curButtonInfo }}</Button>
                </Col>
            </Row>
        </Col>
    </Row>
</div>
</template>

<script>
import { userInfo } from 'os';
export default {
    data() {
        return {
            userInfo: '',
            isEdit: false,
            buttonInfo: ['编辑信息','提交'],
            curButtonInfo: '',
            age: '',
            sex: '',
            email: ''
        }
    },
    methods: {
        changeRoute: function(name) {
            this.$router.push(`/user/${this.$route.params.userId}/${name}`)
        },
        editProfile: function() {
            this.isEdit = !this.isEdit
            if (this.isEdit) {
                this.curButtonInfo = this.buttonInfo[1]
                
            }
            else {
                this.curButtonInfo = this.buttonInfo[0]
                this.userInfo.age = this.age
                this.userInfo.sex = this.sex
                this.userInfo.email = this.email
                this.$http.put(`/admin/update`, this.userInfo)
                  .then(res => {
                    this.userInfo = res.data
                    this.updateInfo()
                })
            }
        },
        updateInfo: function() {
            this.age = this.userInfo.age
            this.email = this.userInfo.email
            this.sex = this.userInfo.sex
        }
    },
    beforeMount: function() {
        this.isEdit = false
        this.$http.get(`/admin/${this.$store.state.userData.userName}`)
            .then(res => {
                this.userInfo = res.data
                this.updateInfo()
            })
        this.curButtonInfo = this.buttonInfo[0]
    },
    mounted: function() {
        this.$router.push(`/user/${this.$route.params.userId}/fav`)
    }
}
</script>


<style scoped>
.profile-pic-box {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
}
.profile-pic {
    width: 100%;
}
.profile-box {
    text-align: left;
}
</style>
