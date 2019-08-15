<template>
    <div class="m-3">
        <div>
            <div class="nav d-flex ai-center pt-5 pb-3 fs-xl border-bottom">
                <img class="logo mr-3" src="../assets/logo.png" alt />
                <div
                    class="nav-item mr-5"
                    v-for="(item, index) in nav"
                    @click="routerLink(index, item.path)"
                    :key="index"
                >
                    <!--  -->
                    <a
                        class="text-grey-1"
                        :class="navIndex === index ? 'active' : 'item-cn'"
                    >{{ item.title }}</a>
                    <!--  -->
                </div>
                <div class="flex-1">
                  <a
                  href="https://github.com/aizwellenstan/vue_express_blog" target="_blank" rel="noopener noreferrer" 
                  class="repo-link">
                    GitHub
                    <svg xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound">
                      <path
                        fill="currentColor"
                        d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,
                        1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
                      </path>
                      <polygon
                        fill="currentColor"
                        points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
                      </polygon>
                    </svg></a></div>
                <div class="fs-lg">
                    <span>Hello,</span>
                    <span>{{model.username}}&nbsp;</span>
                    <span>
                        <a
                            href
                            @click="logout"
                            class="text-primary"
                            style="font-weight:bold"
                        >ログアウト</a>
                    </span>
                </div>
            </div>
        </div>
        <div class="mt-3">
            <router-view :key="$route.path"></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {},
            nav: [
                { title: "ホーム", path: "/" },
                { title: "New Post", path: "/write-article" },
                { title: "My Post", path: "/manage-articles" }
            ],
            navIndex: 0
        };
    },
    methods: {
        async getUserInfo() {
            const res = await this.$http.get("/userinfo");
            this.$set(this, "model", res.data);
        },
        logout() {
            this.$router.push('/login')
            localStorage.removeItem("token");

        },
        /**
         * Router
         * @param index
         * @param link
         */
        routerLink(index, path) {
            //
            this.navIndex = index;
            //
            this.$router.push(path);
        },

        /**
         * Search current path
         * @param path
         */
        checkRouterLocal(path) {
            //
            this.navIndex = this.nav.findIndex(item => item.path === path);
        }
    },
    created() {
        this.getUserInfo();

        // Get current path
        let path = this.$route.path;
        // Search current path
        this.checkRouterLocal(path);
    },
    watch: {
        $route() {
            // Get current path
            let path = this.$route.path;
            // Search current path
            this.checkRouterLocal(path);
        }
    }
};
</script>
<style lang="scss">
.logo {
    height: 1.5em;
    width: auto;
}
</style>
