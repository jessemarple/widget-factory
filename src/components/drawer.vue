<template>
  <div id="drawer" v-bind:class="{ open: open}">
    <aside class="menu">
      <ul class="menu-list">
        <li>
          <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'About' }">About</router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>
<script>
export default {
  name: 'Drawer',
  props: ['open']
}
</script>
<style lang="scss" scoped>
  #drawer{
    display:none;
    &.open{
      height: calc(100vh - 54px);
      padding-top:1em;
      padding-left:1em;
      border-right: 2px solid whitesmoke;
      width: 200px;
      display: inline-block;
    }
    .menu-list a{
      border-radius: 0;
    }
    .router-link-exact-active{
      border-right: 3px solid #2a70de;
    }
  }
</style>
