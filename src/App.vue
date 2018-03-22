<template>
  <div id="app">
    <navbar :open="drawerOpen"></navbar>
    <div id="content-block">
      <drawer :open="drawerOpen"></drawer>
      <div id="content" v-bind:class="{ wide: !drawerOpen }">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus'
import navbar from '@/components/navbar'
import drawer from '@/components/drawer'

export default {
  name: 'App',
  components: {
    navbar,
    drawer
  },
  data () {
    return {
      drawerOpen: true
    }
  },
  mounted () {
    EventBus.$on('toggle-nav-drawer', () => {
      this.drawerOpen = !this.drawerOpen
      console.log('close the drawer')
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#content-block{
  display: flex;
}
#content{
  // border: 1px solid red;
  width: calc(100% - 205px);
  display: inline-block;
  &.wide{
    width: 100%;
  }
}
.card-header .dropdown-menu{
  right: 0;
  left: initial;
  top: 94%;
  .dropdown-content{
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
    padding-top:0;
    padding-bottom:0;
  }
}
</style>
