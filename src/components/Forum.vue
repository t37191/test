<template>
    <div>
        <Row class="topic" type="flex" justify="center">
            <Col span="14">
                <h1>{{ topic.topic_name }}</h1>
            </Col>
        </Row>
        <Row class="main" type="flex" justify="center">
            <Col class="profile-bar" span="2">
                <img class="profile-pic" src="../assets/logo.png" alt="">
                <br>
                <router-link :to="`/user/${firstReply.user_id}`">{{ firstReply.user_name }}</router-link>
            </Col>
            <Col class="context-bar" span="12">
                <span v-html="firstReply.reply_content"/>
            </Col>
        </Row>
        <Row v-for="reply in replies" :key="reply.reply_id" class="main" type="flex" justify="center">
            <Col class="profile-bar" span="2">
                <img class="profile-pic" src="../assets/logo.png" alt="">
                <br>
                <router-link :to="`/user/${firstReply.user_id}`">{{ reply.user_name }}</router-link>
            </Col>
            <Col class="context-bar" span="12">
                <span v-html="reply.reply_content"/>
                <br>
                <div style="margin-top: 5em;">
                    <Row type="flex" justify="end">
                        <Col>
                        <Button type="text" @click="showSubReply(reply.reply_id)"><span v-if="reply.isSubReplyShown">隐藏</span><span v-else>显示</span>回复</Button>
                        </Col>
                    </Row>
                    <Row v-if="reply.isSubReplyShown">
                        <Col>
                            <ForumReply v-for="rReply in reply.subReplies" :key="rReply.reply_id" :rid=rReply.reply_id
                                :topic_id=topic.topic_id
                                :reply_content=rReply.reply_content />
                        </Col>    
                    </Row>
                </div>
            </Col>
        </Row>
        <Row type="flex" justify="center">
            <Col>
                <Page :total=replyNumber show-total @on-change="changePage" />
            </Col>
        </Row>
        <Row type="flex" justify="center">
            <Col span="14">
                <Editor/>
            </Col>
        </Row>
        <Row type="flex" justify="center">
            <Col span="14">
                <Button style="float: right;" type="primary" @click="submitReply">submit</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import axios from 'axios'
import Editor from './Editor'
import ForumReply from './ForumReply'

export default {
    data() {
        return {
            topic: '',
            firstReply: '',
            replies: '',
            replyNumber: 0
        }
    },
    components: {
        Editor,
        ForumReply
    },
    methods: {
        changePage: function(page) {
            this.$http.get(`/bbs_reply/count?r_topic_id=${this.topic.topic_id}&r_reply_id=${this.firstReply.reply_id}&_sort=id&_start=${10*(page-1)}&_limit=10`)
                .then(res => {
                    this.replies = res.data
                    for (let reply of this.replies) {
                        reply.isSubReplyShown = false;
                    }
                })
        },
        submitReply: function() {
            var replyContext = this.$store.state.editorContent
            if (replyContext == '') {
                this.$Message.error('reply can not be empty')
            }
            else {
                var reply_data = {
                    "user_id": 1,
                    "r_topic_id": this.topic.topic_id,
                    "reply_content": replyContext,
                    "r_reply_id": this.firstReply.reply_id,
                    "reply_id": 5
                }
                this.$http.post('/bbs_reply', reply_data)
                    .then(res => {
                        this.$Message.success('success!')
                        location.href = '/forum/topic/' + this.topic.topic_id
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        showSubReply: function(rid) {
            let i = 0;
            for (i = 0; i < this.replies.length; ++i) {
                if (this.replies[i].reply_id == rid) {
                    let tem_reply = this.replies[i]
                    tem_reply.isSubReplyShown = !tem_reply.isSubReplyShown
                    this.$set(this.replies, i, tem_reply)
                    break
                }
            }           
            this.$http.get(`/bbs_reply?r_topic_id=${this.topic.topic_id}&r_reply_id=${rid}&_sort=id&_limit=10`)
                .then(res => {
                    let tem_reply = this.replies[i]
                    tem_reply.subReplies = res.data
                    this.$set(this.replies, i, tem_reply)
                })
        }
    },
    beforeMount: function() {
        this.$http.get('/bbs_topic/' + this.$route.params.topicId)
            .then(res => {
                this.topic = res.data
                this.$http.get(`/bbs_reply/count?r_topic_id=${this.topic.topic_id}`)
                  .then(res => {
                    this.replyNumber = parseInt(res.data.reply_number)
                }) 
                this.$http.get('/bbs_reply?r_topic_id=' + this.topic.topic_id + '&_limit=1&_sort=id')
                    .then(res => {
                        this.firstReply = res.data[0]
                        this.$http.get(`/bbs_reply?r_topic_id=${this.topic.topic_id}&r_reply_id=${this.firstReply.reply_id}&_sort=id&_start=0&_limit=10`)
                            .then(res => {
                                this.replies = res.data
                                for (let reply of this.replies) {
                                    reply.isSubReplyShown = false;
                                }
                            })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}
</script>


<style scoped>
.topic {
    text-align: left;
}
.main {
    margin-top: 1px;
}
.profile-bar {
    background-color: white;
    margin-right: 2px;
}
.profile-pic {
    width: 80px;
    height: 80px;
}
.context-bar {
    position: relative;
    text-align: left;
    background-color: white;
}
.reply-button {
    float: right;
}
</style>
