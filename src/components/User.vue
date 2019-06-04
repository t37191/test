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
                    <p style="font-size: 3em;">user name</p>
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
                        <div></div>
                    </div>
                </Col>
                <Col span="2">
                    <Button v-if="$route.params.userId == $store.state.userData.userId"
                        type="info" ghost long @click="editProfile"
                    >编辑信息</Button>
                </Col>
            </Row>
        </Col>
    </Row>
    <Row type="flex" justify="center" :gutter="24" style="margin-top: 1em;">
        <Col span="3">
            <Menu active-name="fav" @on-select="changeRoute">
                <!-- <MenuItem name="1">
                    <Icon type="md-document" />
                    <router-link tag="span" :to=favLink>收藏</router-link>
                </MenuItem> -->
                <MenuItem name="fav">
                    <Icon type="md-document" />
                    <span>收藏</span>
                </MenuItem>
                <MenuItem v-if="$route.params.userId == $store.state.userData.userId" name="point">
                    <Icon type="md-chatbubbles" />
                    我的钱包
                </MenuItem>
                <!--div>
                    <Divider/>
                    <MenuItem name="4">
                        <Icon type="md-chatbubbles" />
                        论文
                    </MenuItem>
                    <MenuItem name="5">
                        <Icon type="md-chatbubbles" />
                        项目
                    </MenuItem>
                    <MenuItem name="6">
                        <Icon type="md-chatbubbles" />
                        专利
                    </MenuItem>
                </div-->
            </Menu>
        </Col>
        <Col span="14">
            <router-view></router-view>
        </Col>
    </Row>
</div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: '',
            isEdit: false
        }
    },
    methods: {
        changeRoute: function(name) {
            this.$router.push(`/user/${this.$route.params.userId}/${name}`)
        },
        editProfile: function() {
            this.$http.get(`/admin/${this.$store.state.userData.userName}`)
          .then(res => {
            this.userInfo = res.data
        })
        this.$http.get(`/admin/userlist`)
          .then(res => {
            this.userInfo = res.data
        })
        }
    },
    beforeMount: function() {
        this.$http.get(`/admin/userlist`)
          .then(res => {
            this.userInfo = res.data
        })
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
