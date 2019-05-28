<template>
    <div>
        <Row type="flex" justify="center">
            <Col span="16">
                <Tabs value="name1">
                    <TabPane label="标签一" name="name1"></TabPane>
                    <TabPane label="标签二" name="name2"></TabPane>
                    <TabPane label="标签三" name="name3"></TabPane>
                </Tabs>
                <div>
                    <div v-for="topic in topicList" :key="topic.topic_id">
                        <Row type="flex" justify="space-between">
                            <Col span="3">
                                <Row type="flex" justify="space-between">
                                    <Col>
                                    {{ topic.vote_number }}
                                    <br>
                                    赞同
                                    </Col>
                                    <Col>
                                    {{ topic.reply_number }}
                                    <br>
                                    回复
                                    </Col>
                                </Row>
                            </Col>
                            <Col span="20" class="list">
                                <Row>
                                    <router-link
                                        :to="`/user/${topic.user_id}`"
                                        style="color: #999;"
                                    >
                                        {{ topic.user_name }}
                                    </router-link>
                                </Row>
                                <Row>
                                    <h2 class="title">
                                        <a @click="topicPath(topic.topic_id)">{{ topic.topic_name }}</a>
                                    </h2>
                                </Row>
                            </Col>
                        </Row>
                        <Divider/>
                    </div>
                    <Page :total=topicNumber show-total @on-change="changePage" />
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            topicList: '',
            topicNumber: 0
        }
    },
    methods: {
        changePage: function(page) {
            this.$http.get('/bbs_topic?_start=' + 10*(page-1) + '&_limit=10')
                .then(res => {
                    this.topicList = res.data
                })
        },
        topicPath: function(id) {
            location.href = '/forum/topic/' + id
        }
    },
    beforeMount: function() {
        this.$http.get('/bbs_topic/count')
            .then(res => {
                this.topicNumber = res.data.topic_number

            })
        this.changePage(1)
    }
}
</script>


<style scoped>
.title {
    font-weight: 400;
    line-height: 22px;
    height: 22px;;
}
.title a {
    color: black;
}
.list {
    text-align: left;
}
</style>

