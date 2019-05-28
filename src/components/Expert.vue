<template>
<div>
    <Row type="flex" justify="center">
        <Col span="16">
            <Row class="profile">
                <h1>Expert name</h1>
                <p class="profile-dep">expert dep</p>
            </Row>
            <Row class="detail">
                <p class="title">作者关注领域</p>
                <Divider/>
                <div class="fields">
                    <span>asdfa</span>
                    <span>asdfa</span>
                    <span>asdfa</span>
                    <span>asdfa</span>
                    <span>asdfa</span>
                    <span>asdfa</span>
                    <span>asdfa</span>
                </div>
                <p class="title">作者文献</p>
                <Divider/>
                <div class="fields">
                    asdfa asdfnaos sadofnoa
                </div>
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
</style>
