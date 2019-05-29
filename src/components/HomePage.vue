<template>
<div>
    <Row type="flex" justify="center">
        <Col span="16" style="margin-top: 2em;">
            <SearchBar/>
        </Col>
    </Row>
    <Row class="home-page-product" type="flex" justify="center">
        <Col span="8">
            <Card dis-hover class="home-page-card">
                <p slot="title">热门领域</p>
                <router-link v-for="keyword in keywords" :key="keyword"
                    :to="`/keyword/${keyword}`"
                >
                    {{ keyword }}
                </router-link>
            </Card>
        </Col>
        <Col span="8">
            <Card dis-hover class="home-page-card">
                <p slot="title">热门讨论</p>
            </Card>
        </Col>
    </Row>
    <Row class="home-page-trend" type="flex" justify="center">
        <Col span="8">
            <Card dis-hover :bordered="false">
                <p slot="title">动态</p>
                <ul>
                    <li v-for="trend in trends" :key="trend.id">
                        <router-link :to="`/trend/${trend.id}`" style="float: left">Advanced Lighting</router-link>
                        <span style="float:right">1999-12-24</span>
                    </li>
                </ul>
            </Card>
        </Col>
        <Col span="8">
            <Card dis-hover :bordered="false">
                <div style="text-align: center">
                    <router-link :to="`/trend/233`"><img src="../assets/logo.png" alt=""></router-link>
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
            trends: [
                {
                    id : '1',
                    title: 'Advanced Lighting',
                    time: '1999-12-23'
                }
            ]
        }
    },
    components: {
        SearchBar
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
</style>
