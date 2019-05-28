<template>
<div class="main">
    <Row type="flex" justify="center">
        <Col span="16">
            <h2>{{ paper.title }}</h2>
            <p>
                <span v-for="author in paper.authors" :key="author.id">&nbsp;&nbsp;{{ author.name }} &nbsp;&nbsp;</span>
            </p>
            <p>
                {{ paper.year }}
            </p>
            <Divider/>
            <p class="abstract">摘要：{{ paper.abstr }}</p>
            <p class="keyword">
                关键词： <span v-for="keyword in paper.keywords" :key="keyword">{{ keyword }} &nbsp;&nbsp;</span>
            </p>
        </Col>
    </Row>
    <Row type="flex" justify="center">
        <Col span="2">
            <Button type="info" long>阅读全文</Button>
        </Col>
        <Col span="1">
        </Col>
        <Col span="2">
            <Button type="info" long>收藏</Button>
        </Col>
    </Row>
</div>
</template>

<script>
export default {
    data() {
        return {
            paper: ''
        }
    },
    beforeMount: function() {
        this.$http.get('/paper/' + this.$route.params.paperId)
            .then(res => {
                this.paper = res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
}
</script>


<style scoped>
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
</style>

