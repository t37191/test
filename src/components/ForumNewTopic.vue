<template>
<div>
    <Row type="flex" justify="center">
        <Col span="16">
            <Input
                class="title"
                placeholder="title"
                v-model="title"
            >
            </Input>
            <Editor/>
        </Col>
    </Row>
    <Row type="flex" justify="center">
        <Col span="16">
            <Row type="flex" justify="end">
                <Button @click="commit">commit</Button>
            </Row>
        </Col>
    </Row>
</div>
</template>

<script>
import Editor from './Editor'
export default {
    data() {
        return {
            title: ''
        }
    },
    methods: {
        commit: function() {
            if (this.title == '') {
                this.$Message.error('填写标题')
                return
            }
            if (this.$store.state.editorContent == '') {
                this.$Message.error('填写内容')
                return
            }
            let data = {
                user_id : this.$store.state.userData.userId,
                topic_name : this.title,
                user_name : this.$store.state.userData.userName,
                reply_number : 0,
                vote_number : 0,
                // topic_id: 0
            }
            this.$http.post('/bbs_topic', data)
              .then(res => {
                let replyData = {
                    user_id : this.$store.state.userData.userId,
                    user_name : this.$store.state.userData.userName,
                    r_topic_id : res.data.topic_id,
                    reply_content : this.$store.state.editorContent,
                    reply_time : '',
                    r_reply_id : 0,
                    r_reply_user_name : '',
                    r_reply_user_id: 0,
                    // reply_id: 0
                }
                this.$http.post('/bbs_reply', replyData)
                  .then(res => {
                      this.$Message.success('success')
                      this.$router.push('/forum')
                  })
              })
        }
    },
    components: {
        Editor
    }
}
</script>

<style scoped>
.title {
    margin: 1.5em 0;
}
</style>

