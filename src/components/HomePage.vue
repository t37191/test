<template>
<div>
    <Row type="flex" justify="center">
        <Col span="16" style="margin-top: 2em;">
            <SearchBar/>
        </Col>
    </Row>
    <Row class="home-page-product" type="flex" justify="center">
        <!-- <Col span="8">
            <Card dis-hover class="home-page-card">
                <p slot="title">热门领域</p>
                <router-link v-for="keyword in keywords" :key="keyword"
                    :to="`/keyword/${keyword}`"
                >
                    {{ keyword }}
                </router-link>
            </Card>
        </Col> -->
        <Col span="16">
            <Card dis-hover class="home-page-card">
                <p slot="title">热门论文</p>
                <Row style="text-align: left;"
                    v-for="paper in hotPapers" :key="paper.id"
                >
                    <Col span="20" class="card-title">
                        <router-link :to="`/paper/${paper.id}`">{{ paper.title }}</router-link>
                    </Col>
                    <Col span="4">
                        点击量：{{ paper.cnt }}
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
    <Row class="home-page-trend" type="flex" justify="center">
        <Col span="8">
            <Card dis-hover :bordered="false">
                <p slot="title">动态</p>
                <ul>
                    <li v-for="trend in trends" :key="trend.id">
                        <div><router-link :to="`/trend/${trend.id}`" style="float: left">{{ trend.title }}</router-link>
                        <span style="float:right">{{ trend.time }}</span></div>
                        <br>
                    </li>
                </ul>
            </Card>
        </Col>
        <Col span="8">
            <Card dis-hover :bordered="false">
                <div style="text-align: center">
                    <router-link :to="`/trend/13`"><img src="../assets/logo.png" alt=""></router-link>
                </div>
            </Card>
        </Col>
    </Row>
</div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
    data() {
        return {
            keywords: ['123', 'opengl', 'dx12', 'MSAA', 'SSAO'],
            trends: [],
            hotPapers: ''
        }
    },
    components: {
        SearchBar
    },
    beforeMount: function() {
        this.$http.get('/hotpapers')
          .then(res => {
            this.hotPapers = res.data.slice(0, 15);
        })
        this.$http.get('/announcement/count')
          .then(res => {
            if (parseInt(res.data) != 0) {
                this.$http.get('/announcement?_start=0&_limit=7')
                  .then(res => {
                    this.trends = res.data
                })
            }
        })
        
    }
}
</script>


<style scoped>
.home-page-product {
    margin-top: 35px;
}
.home-page-card {
    margin: 5px;
}
.home-page-trend {
    margin-top: 30px;
    background-color: white;
}
ul li {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
.card-title {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>
