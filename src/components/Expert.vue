<template>
<div>
    <Row type="flex" justify="center">
        <Col span="16">
            <Row class="profile">
                <h1>{{ expert.name }}</h1>
                <p class="profile-dep">论文数量：{{ expert.n_pubs }}</p>
            </Row>
            <Row class="detail">
                <p class="title">作者所属领域</p>
                <Divider/>
                <div class="fields">
                    <span v-for="tag in expert.tags" :key="tag.t">{{ tag.t }}</span>
                </div>
                <p class="title">作者文献</p>
                <Divider/>
                <div class="fields">
                    <Row v-for="result in papers" :key="result.id" class="content">
                        <p class="content-title">
                            <router-link :to="`/paper/${result.id}`" v-html="result.title"></router-link>
                        </p>
                        <p class="content-info">
                            <span v-for="author in result.authors" :key="author.id">
                                <router-link :to="`/expert/${author.id}`">&nbsp;{{ author.name }}&nbsp;</router-link>
                            </span>
                        </p>
                        <p class="content-info">
                            {{ result.year }}
                        </p>
                        <p class="content-abstract" v-html="result.abstr">
                        </p>
                        <Divider/>
                    </Row>
                </div>
            </Row>
        </Col>
    </Row>
</div>
</template>

<script>
export default {
    data() {
        return {
            expert: '',
            papers: []
        }
    },
    methods: {
        getPaper: function(paperId) {
            this.$http.get(`/paper?id=${paperId}`)
              .then(res => {
                papers.push(res.data)
            })
        }
    },
    beforeMount: function() {
        this.$http.get(`/expert?id=${this.$route.params.expertId}`)
          .then(res => {
            this.expert = res.data
            for (paper of this.expert.pubs) {
                this.getPaper(paper.i)
            }
        })
    }
}
</script>


<style scoped>
.profile {
    text-align: left;
    padding: 2em;
    background-color: #f5f7f9;
}
.profile h1 {
    font-size: 3em;
    font-weight: normal;
    margin-bottom: 0.5em;
}
.profile-dep {
    font-size: 1.7em;
}
.detail {
    text-align: left;
    margin-bottom: 2em;
}
.detail .title {
    margin-top: 2.5em;
    font-size: 1.5em;
}
.detail .fields span {
    margin-right: 2em;
    display: inline-block;
}

.content {
    text-align: left;
}
.content-title {
    font-size: 17px;
}
.content-abstract {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.content-info {
    color: #808695;
}
.content-info a {
    color: #808695;
}
</style>
