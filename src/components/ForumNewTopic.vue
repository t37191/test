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
                <Button type="info" ghost @click="commit">commit</Button>
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
                title : this.title,
                content : this.$store.state.editorContent
            }
            this.$http.post('/announcement', data)
              .then(res => {
                location.href = '/'
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

