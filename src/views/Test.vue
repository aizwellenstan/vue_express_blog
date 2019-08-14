<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="hideSider">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">Navigation1</span>
      </template>
      <el-menu-item-group>
        <span slot="title">グループ1</span>
        <el-menu-item index="1-1">オプション1</el-menu-item>
        <el-menu-item index="1-2">オプション2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="グループ2">
        <el-menu-item index="1-3">オプション3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">オプション4</span>
        <el-menu-item index="1-4-1">オプション1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">Navigation2</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">Navigation3</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">Navigation4</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {


};
</script>
<style lang="scss">

</style>
