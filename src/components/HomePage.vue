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
                <p slot="title">Card 1</p>
            </Card>
        </Col>
        <Col span="8">
            <Card dis-hover class="home-page-card">
                <p slot="title">Card 2</p>
            </Card>
        </Col>
    </Row>
    <Row class="home-page-trend" type="flex" justify="center">
        <Col span="8">
            <Card dis-hover :bordered="false">
                <p slot="title">动态</p>
            </Card>
        </Col>
        <Col span="8">
            <Card dis-hover :bordered="false">
                <div style="text-align: center">
                    <img src="../assets/logo.png" alt="">
                </div>
            </Card>
        </Col>
    </Row>
</div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
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
</style>
