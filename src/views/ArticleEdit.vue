<template>
    <div>
        <h1 class="text-primary">Edit Post</h1>
        <el-form @submit.native.prevent="save">
            <el-form-item label="Title">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item>
                <vue-editor v-model="model.body"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">Save</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
    components: {
        VueEditor
    },
    props: {
        id: {}
    },
    data() {
        return {
            model: {}
        };
    },
    methods: {
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // An example of using FormData
            // NOTE: Your key could be different such as:
            // formData.append('file', file)

            let formData = new FormData();
            formData.append("file", file);
            const res = await this.$http.post("upload", formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        },
        async save() {
            if (this.id) {
                await this.$http.put(`/rest/article/${this.id}`, this.model);
                this.$router.push("/");
                this.$message({
                    type: "success",
                    message: "Edit Success"
                });
            } else {
                await this.$http.post("/rest/article", this.model);
                this.$router.push("/");
                this.$message({
                    type: "success",
                    message: "Saved"
                });
            }
        },
        async fetch() {
            const res = await this.$http.get(`rest/article/${this.id}`);
            this.model = res.data;
        }
    },
    async created() {
        await this.$http.get("/rest/article");
        this.id && this.fetch();
    }
};
</script>
