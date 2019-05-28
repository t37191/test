<template>
<div>
    <p>
        {{ reply_content }}
    </p>
    <Row type="flex" justify="end">
        <Col span="22">
            <Input v-model="replyContent" @on-enter="submit" v-if="isEdit" />
        </Col>
        <Col span="2">
            <Button type="text" class="reply-button" long @click="submit"><span v-if="isEdit">发布</span>回复</Button>
        </Col>
    </Row>
    <div class="divider">
        
    </div>
    <Row v-for="reply in replies" :key="reply.reply_id">
        <ForumReply :rid=reply.reply_id :topic_id=topic_id :reply_content=reply.reply_content />
    </Row>
</div>
</template>

<script>
export default {
    data() {
        return {
            replies: '',
            isEdit: false,
            replyContent: ''
        }
    },
    methods: {
        submit: function() {
            if (this.isEdit) {
                let reply_data = {
                    "user_id": 1,
                    "r_topic_id": this.topic_id,
                    "reply_content": this.replyContent,
                    "r_reply_id": this.rid,
                    "reply_id": 7
                }
                this.$http.post('/bbs_reply', reply_data)
                    .then(res => {
                        this.$Message.success('发布成功')
                    })
            }
            this.isEdit = !this.isEdit
        }
    },
    name: 'ForumReply',
    props: {
        rid: '',
        topic_id: '',
        reply_content: ''
    },
    beforeMount: function() {
        this.$http.get('/bbs_reply?r_topic_id=' + this.topic_id + '&r_reply_id=' + this.rid + '&_sort=id&_limit=10')
            .then(res => {
                this.replies = res.data
            })
    }
}
</script>

<style scoped>
.divider {
    height: 1px;
    width: 100%;
    background-color: #ccc;
    margin-bottom: 3px;
    margin-top: 3px;
}
.reply-button {
    outline:0 none !important;
}
</style>
