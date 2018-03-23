<template>
  <div id="dashboard">
    <columns />
  </div>
</template>

<script>
import columns from '@/components/columns'

export default {
  name: 'Dashboard',
  components: {
    columns
  }
}
</script>

<style lang="scss" scoped>
  #dashboard{
    padding: 1em;
    overflow-x: scroll;
    min-width: 350px;
  }
</style>
