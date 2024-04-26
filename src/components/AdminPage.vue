<template>
    <div>
        <el-menu class="el-menu-demo" mode="horizontal" 
            background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-submenu index="2">
                <template slot="title">Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
        </el-menu>
        <div>
            <el-row :gutter="20">
                <el-col :span="isCollapse ? 2 : 4">





                    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse"
                        style="height: 100vh;">


                        <el-switch v-model="isCollapse" class="ps-2">
                        </el-switch>

                        <el-menu-item index="1" @click="goCourseTable()">
                            <i class="fa-regular fa-newspaper"></i>
                            <span slot="title">Course Table</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="goChart()">
                            <i class="fa-solid fa-chart-simple"></i>
                            <span slot="title">Revenue</span>
                        </el-menu-item>

                        <el-menu-item index="2" @click="goOrg()">
                            <i class="fa-solid fa-sitemap"></i>
                            <span slot="title">Organization</span>
                        </el-menu-item>
                        <el-submenu index="3">

                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">Navigator One</span>
                            </template>
                            <el-menu-item-group>
                                <span slot="title">Group One</span>
                                <el-menu-item index="1-1">item one</el-menu-item>
                                <el-menu-item index="1-2">item two</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="Group Two">
                                <el-menu-item index="1-3">item three</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <span slot="title">item four</span>
                                <el-menu-item index="1-4-1">item one</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="4">
                            <i class="el-icon-menu"></i>
                            <span slot="title">Navigator Two</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">Navigator Three</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">Navigator Four</span>
                        </el-menu-item>
                        <el-menu-item index="4" @click="logout()">
                            <i class="el-icon-error"></i>
                            <span slot="title">Log out</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="20">
                    <router-view></router-view>
                </el-col>
            </el-row>

        </div>
    </div>


</template>

<script>

export default {

    name: 'AdminPage',
    data() {
        return {

            phone: '',
            password: '',
            userName: localStorage.getItem("username"),
            isCollapse: true
        }
    },

    computed: {

        listCourseCategories() {
            return this.$store.state.lstCourseCategory;
        },
        userLogined() {
            return this.$store.state.userLogined;
        },
        cartItems() {
            return this.$store.state.cart;
        },
        total() {
            return this.$store.state.totalCartMoney;
        },
    },
    methods: {
        goCourseTable() {
            this.$router.push({ path: "/CourseTable" })
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        logout() {
            this.$store.state.userLogined = '';
            localStorage.removeItem('accessToken')
            localStorage.removeItem('role')
            localStorage.removeItem('username')
            localStorage.removeItem('userimg')
            localStorage.removeItem('ownerId')
            setTimeout(location.reload.bind(location), 90);
            this.$router.push({ path: '/' }).catch(() => { })
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        goHome() {
            this.$router.push({ path: "/" })
        },
        goChart() {
            this.$router.push({ path: "/RevenueChart" })
        },
        goOrg(){
            this.$router.push({path: "/OrgManagerment" })
        }
    },



}

</script>