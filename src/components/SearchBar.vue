<template>
<div>
    <Row>
        <Col span="4">
            <Dropdown trigger="click" @on-click="changeType"
                style="width: 100%; height: 100%;">
                <Button style="width: 100%; height: 100%;">
                    {{ selectedTypeName }}
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="type in types" :key="type.type"
                        :name="type.id">
                        {{ type.typeName }}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Col>
        <Col span="20">
            <Input search v-model="searchContent" 
                @on-search="search"
                enter-button="Search" placeholder="Enter something..." />
        </Col>
    </Row>
</div>
</template>

<script>
export default {
    data() {
        return {
            types: [
                {
                    id: 0,
                    type: 'keywords',
                    typeName: '关键字'
                },
                {
                    id: 1,
                    type: 'titab',
                    typeName: '篇名'
                },
                {
                    id: 2,
                    type: 'author',
                    typeName: '作者'
                }
            ],
            selectedType: 'titab',
            selectedTypeName: '篇名',
            searchContent: ''
        }
    },
    methods: {
        changeType: function(name) {
            this.selectedType = this.types[name].type
            this.selectedTypeName = this.types[name].typeName
        },
        search: function() {
            if (this.searchContent != '') {
                this.$router.push({path: `/search/${this.selectedType}/${this.searchContent}`})
            }
        }
    }
}
</script>


<style scoped>
.drop-down {
    height: 100%;
    line-height: 100%;
}
</style>
