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
                <Col span="10">
                    题名
                </Col>
                <Col span="3">
                    作者
                </Col>
                <Col span="3">
                    来源
                </Col>
                <Col span="3">
                    发表时间
                </Col>
                <Col span="3">
                    下载
                </Col>
                <Col span="2">
                    收藏
                </Col>
            </Row>
            <Divider/>
            <Row class="list-content"
                v-for="result in resList" :key="result.id">
                <Col span="10" class="content-title">
                    <router-link :to="`/paper/${result.id}`">{{ result.title }}</router-link>
                </Col>
                <Col span="3">
                    <span v-for="author in result.authors" :key="author.id">
                        <router-link :to="`/expert/${author.id}`">&nbsp;{{ author.name }}&nbsp;</router-link>
                    </span>
                </Col>
                <Col span="3">
                    {{ result.source }}&nbsp;
                </Col>
                <Col span="3">
                    {{ result.year }}
                </Col>
                <Col span="3">
                    <a :href="result.pdf">下载</a>
                </Col>
                <Col span="2">
                    
                </Col>
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
                })
        },
        updateList() {
            this.content = this.$route.params.searchContent
            this.type= this.$route.params.searchType
            this.$http.get(`/search/count?_type=${this.type}&_content=${this.content}`)
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
.list-content {
    height: 3.5em;
    line-height: 3.5em;
    border-bottom: 1px #e8eaec solid;
}
.list-content div {
    overflow: hidden;
    text-overflow: ellipsis;
}
.content-title a {
    color: black;
}
.content-title {
    font-size: 17px;
    text-align: left;
}
</style>

