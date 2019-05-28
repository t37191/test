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
                </Col>
                <Col span="2">
                    <Button type="info" ghost long>关注</Button>
                </Col>
            </Row>
        </Col>
    </Row>
    <Row type="flex" justify="center" :gutter="24" style="margin-top: 1em;">
        <Col span="3">
            <Menu active-name="1">
                <MenuItem name="1">
                    <Icon type="md-document" />
                    
                    <router-link tag="span" :to=favLink>收藏</router-link>
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-person" />
                    关注的人
                </MenuItem>
                <MenuItem name="3">
                    <Icon type="md-chatbubbles" />
                    动态
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
    computed: {
        favLink: function() {
            return '/user/' + this.$route.params.userId + '/fav'
        }
    },
    beforeMount: function() {
        this.$router.push(this.favLink)
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
