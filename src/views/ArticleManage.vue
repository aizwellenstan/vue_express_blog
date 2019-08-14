<template>
    <div>
        <h1 class="text-primary">My Posts</h1>
        <el-table :data="items">
        <template slot="empty">No Data</template>
            <el-table-column type="index" width="50" label="ID"></el-table-column>
            <el-table-column prop="title" label="Title"></el-table-column>
            <el-table-column prop="author.username" label="作者"></el-table-column>
            <el-table-column prop="createdAt" label="日期"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">

                <template slot-scope="scope">
                    <el-button
                    class="btn"
                        type="warning"
                        size="small"
                        @click="$router.push(`/write-article/${scope.row._id}`)"
                    >Edit</el-button>
                    <el-button type="danger" size="small" @click="remove(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: []
        };
    },
    methods: {
        async fetch() {
            // const res = await this.$http.get("rest/article");
            // let moment= require('moment') ;
            // res.data.forEach(element => {
            //     element.date = moment(element.date).format('M[月]D[日]')
            // });
            const res = await this.$http.get("/articles");
            this.items = res.data;
        },
        async remove(row) {
            this.$confirm(`Are You Sure To Delete "${row.title}"`, "Warning", {
                confirmButtonText: "確認",
                cancelButtonText: "やめろ",
                type: "warning"
            })
                .then(async () => {
                    await this.$http.delete(`rest/article/${row._id}`);
                    this.$message({
                        type: "success",
                        message: "Delete Success"
                    });
                    this.fetch();
                })
                .catch(() => {
                    this.$message({
                        type: "success",
                        message: "まだ考える"
                    });
                });
        }
    },
    created() {
        this.fetch();
    }
};
</script>
