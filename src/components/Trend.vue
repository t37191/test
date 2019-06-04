<template>
<div class="main">
    <Row type="flex" justify="center">
        <Col span="16">
            <h1>{{ announcement.title }}</h1>
            <Divider/>
            <p class="context">{{ announcement.content }}</p>
            <p class="time">{{ announcement.time }}</p>
        </Col>
    </Row>
</div>
</template>

<script>
export default {
    data() {
        return {
            announcement: ''
        }
    },
    beforeMount: function() {
        this.$http.get(`/announcement/1?announcement_id=${this.$route.params.trendId}`)
          .then(res => {
            this.announcement = res.data
        })
    }
}
</script>


<style scoped>
.main h1 {
    font-size: 2.7em;
    font-weight: normal;
}
.context {
    text-align: left;
}
</style>

