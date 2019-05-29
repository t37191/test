<template>
<div>
    <Row type="flex" justify="center">
        <Col span="16">
            <Row class="profile">
                <h1>Keyword name</h1>
                <p class="profile-description">description</p>
            </Row>
            <Row class="detail">
                <p class="title">相关文献</p>
                <Divider/>
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
            </Row>
        </Col>
    </Row>
</div>
</template>

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
.profile-description {
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
</style>
