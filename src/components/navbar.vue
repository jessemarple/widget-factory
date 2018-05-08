<template>
  <nav id="navbar" class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div @click="toggleNavDrawer" class="navbar-burger left-burger always-burger" v-bind:class="{ 'is-active': open}">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <a class="navbar-item" href="https://jessemarple.github.io/widget-factory">
        Widget Factory
      </a>
      <div class="mobile-column-add-button is-hidden-desktop" v-if="$route.name === 'Dashboard'">
        <a @click="addColumn(true)" class="button">
          <i class="fas fa-plus"></i>
        </a>
      </div>
    </div>
    <div class="navbar-end is-hidden-touch" v-if="$route.name === 'Dashboard'">
      <div class="navbar-item">
        <a @click="addColumn" class="button">Add Column</a>
      </div>
    </div>
    <div class="navbar-end is-hidden-touch" v-if="$route.name === 'About'">
      <div class="navbar-item">
        <a href="https://github.com/jessemarple/widget-factory" class="button">Git Repo</a>
      </div>
    </div>
  </nav>
</template>
<script>
import { EventBus } from '@/event-bus'
export default {
  name: 'NavBar',
  props: ['open'],
  methods: {
    toggleNavDrawer: () => {
      EventBus.$emit('toggle-nav-drawer')
    },
    addColumn () {
      EventBus.$emit('add-column')
    }
  }
}
</script>
<style lang="scss" scoped>
  #navbar{
    -webkit-box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
    box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
    .navbar-burger.left-burger.always-burger{
      margin-left: 0;
      display: block;
    }
    .mobile-column-add-button{
      position: absolute;
      right: 1em;
      top: 10px;
    }
  }
</style>
