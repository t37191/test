<template>
<div>
    <Row type="flex" justify="center">
        <Col span="16" class="search-bar">
            <SearchBar/>
        </Col>
    </Row>
    <Row type="flex" justify="center">
        <Col span="16">
            <Row class="list-title">
            </Row>
            <Row v-for="result in resList" :key="result.id" class="content">
                <p class="content-title">
                    <router-link :to="`/paper/${result.id}`" v-html="result.title"></router-link>
                </p>
                <p class="content-info">
                    <span v-for="author in result.authors" :key="author.id">
                        <router-link :to="`/expert/${author.id}`"><span>&nbsp;&nbsp;</span><span v-html="author.name"></span><span>&nbsp;&nbsp;</span></router-link>
                    </span>
                </p>
                <p class="content-info" v-html="result.year">
                </p>
                <p class="content-abstract" v-html="result.abstr">
                </p>
                <p>点击量：{{ result.cnt }}</p>
                <Divider/>
            </Row>
            <Page :total=resNumber show-total @on-change="changePage" />
        </Col>
    </Row>
</div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
    data() {
        return {
            content: '',
            type: '',
            resNumber: 0,
            resList: []
        }
    },
    methods: {
        changePage(page) {
            this.$http.get(`/search?_type=${this.type}&_content=${this.content}&_start=${(page-1)*10}&_limit=10`)
                .then(res => {
                    this.resList = res.data
                    // for (let res of this.resList) {
                    //     res.title = res.title.replace(new RegExp(this.content, 'g'), `<span style="color:#ed4014">${this.content}</span>`)
                    //     res.abstr = res.abstr.replace(new RegExp(this.content, 'g'), `<span style="color:#ed4014">${this.content}</span>`)
                    // }
                })
        },
        updateList() {
            this.content = this.$route.params.searchContent
            this.type= this.$route.params.searchType
            this.$http.get(`/search/count?_type=${this.type}&_content=${this.content}`)
            // this.$http.get(`/search/count`)
                .then(res => {
                    this.resNumber = parseInt(res.data)
                    this.changePage(1)
                })
        }
    },
    watch: {
        $route: function() {
            this.updateList()
        }
    },
    components: {
        SearchBar
    },
    beforeMount: function() {
        this.updateList()
    }
}
</script>


<style scoped>
.search-bar {
    margin-top: 3em;
    margin-bottom: 2em;
}
.list-title {
    font-weight: bold;
    line-height: 3em;
    height: 3em;
    margin-top: 1em;
    border-top: 3px #999 solid;
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

