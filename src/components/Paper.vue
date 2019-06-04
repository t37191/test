<template>
<div class="main">
    <Row type="flex" justify="center">
        <Col span="16">
            <h2>{{ paper.title }}</h2>
            <p>
                <router-link v-for="author in paper.authors" :key="author.id" :to="`/expert/${author.id}`">&nbsp;&nbsp;{{ author.name }} &nbsp;&nbsp;</router-link>
            </p>
            <p>
                {{ paper.year }}
            </p>
            <Divider/>
            <p class="abstract">摘要：{{ paper.abstr }}</p>
            <p class="keyword">
                关键词： <span v-for="keyword in paper.keywords" :key="keyword">&nbsp;&nbsp;{{ keyword }}&nbsp;&nbsp;</span>
            </p>
        </Col>
    </Row>
    <Row type="flex" justify="center">
        <Col span="2">
            <Button v-if="paper.pdf != ''" type="info" long><a :href="paper.pdf">阅读全文</a></Button>
            <Button v-else type="info" long disabled>阅读全文</Button>
        </Col>
    </Row>
    <Row type="flex" justify="center">
        <Col span="16">
            <p style="text-align: left; font-size: 1.5em; margin-top: 2em;">评论区</p>
            <Divider/>
        </Col>
    </Row>
    
    <Row v-for="reply in replies" :key="reply.reply_id" type="flex" justify="center">
        <Col class="profile-bar" span="2">
            <img class="profile-pic" src="../assets/logo.png" alt="">
            <br>
            <span>{{ reply.user_name }}</span>
        </Col>
        <Col class="context-bar" span="14">
            <span v-html="reply.reply_content"/>
            <br>
            <!-- <div style="margin-top: 5em;">
                <Row type="flex" justify="end">
                    <Col>
                    <Button type="text" @click="showSubReply(reply.reply_id)"><span v-if="reply.isSubReplyShown">隐藏</span><span v-else>显示</span>回复</Button>
                    </Col>
                </Row>
                <Row v-if="reply.isSubReplyShown">
                    <Col>
                        <ForumReply v-for="rReply in reply.subReplies" :key="rReply.reply_id" :rid=rReply.reply_id
                            :topic_id=paper.id
                            :reply_content=rReply.reply_content />
                    </Col>    
                </Row>
            </div> -->
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
import Editor from './Editor'
import ForumReply from './ForumReply'
export default {
    data() {
        return {
            paper: '',
            replies: '',
            replyNumber: 0
        }
    },
    components: {
        Editor,
        ForumReply
    },
    methods: {
        // changePage: function(page) {
        //     this.$http.get(`/bbs_reply/count?r_topic_id=${this.topic.topic_id}&r_reply_id=${this.firstReply.reply_id}&_sort=id&_start=${10*(page-1)}&_limit=10`)
        //         .then(res => {
        //             this.replies = res.data
        //             for (let reply of this.replies) {
        //                 reply.isSubReplyShown = false;
        //             }
        //         })
        // }
        submitReply: function() {
            var replyContext = this.$store.state.editorContent
            if (replyContext == '') {
                this.$Message.error('reply can not be empty')
            }
            else {
                var reply_data = {
                    "userid": parseInt(this.$store.state.userData.userId),
                    "outcomeid": this.paper.id,
                    "replycontent": replyContext,
                    "replytype": 0
                }
                this.$http.post('/bbs_reply', reply_data)
                    .then(res => {
                        this.$Message.success('success!')
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
            this.$http.get(`/bbs_reply/count?r_outcome_id=${this.paper.id}&reply_id=${rid}&_sort=time&&_start=0&_limit=10`)
                .then(res => {
                    if (res.data != 0) {
                        this.$http.get(`/bbs_reply?r_outcome_id=${this.paper.id}&reply_id=${rid}&_sort=time&&_start=0&_limit=10`)
                            .then(res => {
                                let tem_reply = this.replies[i]
                                tem_reply.subReplies = res.data
                                this.$set(this.replies, i, tem_reply)
                            })
                    }
                    
                })
        }
    },
    beforeMount: function() {
        this.$http.get(`/paper?id=${this.$route.params.paperId}`)
            .then(res => {
                this.paper = res.data
                // this.paper = res.data[0]
            })
            .catch(err => {
                console.log(err)
            })
            this.$http.get(`/bbs_reply/count?r_outcome_id=${this.$route.params.paperId}&reply_id=0`)
                .then(res => {
                this.replyNumber = parseInt(res.data)
                if (this.replyNumber != 0) {
                    console.log(this.replyNumber)
                this.$http.get(`/bbs_reply?r_outcome_id=${this.$route.params.paperId}&reply_id=0&_start=0&_limit=${this.replyNumber}`)
                    .then(res => {
                        this.replies = res.data
                        for (let reply of this.replies) {
                            reply.isSubReplyShown = false
                            reply.isEdit = false
                        }
                    })
            }
            })
            
            
    }
}
</script>


<style scoped>
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
    font-size: 1em;
}
.reply-button {
    float: right;
}

.main {
    text-align: center;
    margin-top: 1em;
}
.main h2 {
    font-size: 2.5em;
    font-weight: normal;
    margin-bottom: 0.4em;
}
.main button {
    font-size: 1.5em;
}
.abstract {
    font-size: 1.5em;
    text-align: left;
}
.keyword {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    text-align: left;
}
button a {
    color: white;
}
</style>

