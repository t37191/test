<template>
    <div v-if="!isSignin">
        <Button type="text" ghost to="/signup">Sign up</Button>
        <Button type="default" ghost to="/signin">Sign in</Button>
    </div>
    <div v-else>
        <Dropdown trigger="click">
            <Button ghost>
                Welcome
                <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <DropdownItem>
                    <router-link tag="span" :to="`/user/${$store.state.userData.userId}`">My Profile</router-link>
                </DropdownItem>
                <DropdownItem>
                    <span @click="signout">Sign out</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
export default {
    methods: {
        signout: function() {
            this.$store.commit('userSignout')
            console.log(this.$store.state.userData.isSignin)
        }
    },
    computed: {
        isSignin: function() {
            return this.$store.state.userData.isSignin
        }
    }
}
</script>

