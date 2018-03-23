<template>
  <div>
    <draggable v-model="columns" :options="{draggable:'.column', handle:'.drag-handle'}">
      <transition-group id="columns" class="columns">
        <div :id="column.id" v-for="(column, index) in columns" :key="column.id" class="column widget-column-container">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <span v-if="column.factoryVisibility === 'all'">All Factories</span>
                <span v-if="column.factoryVisibility === 'Primary'">Primary Factory</span>
                <span v-if="column.factoryVisibility === 'Secondary'">Secondary Factory</span>
                <span v-if="column.timeMode === 'Hours' && column.hoursAgo > 0">
                  &nbsp;- last {{column.hoursAgo}} hours
                </span>
                <span v-if="column.timeMode === 'Minutes' && column.minutesAgo > 0">
                  &nbsp;- last {{column.minutesAgo}} minutes
                </span>
              </p>
              <span class="card-header-icon drag-handle is-hidden-touch">
                <i class="fas fa-arrows-alt-h"></i>
              </span>
              <b-dropdown class="card-header-icon" hoverable>
                <a slot="trigger">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </a>
                <b-dropdown-item v-show="!column.showSettings" @click="column.showSettings = true">
                  Show Settings
                </b-dropdown-item>
                <b-dropdown-item v-show="column.showSettings" @click="column.showSettings = false">
                  Hide Settings
                </b-dropdown-item>
                <b-dropdown-item @click="removeColumn(index)">
                  Delete
                </b-dropdown-item>
              </b-dropdown>
            </header>
            <div v-if="column.showSettings" class="card-settings">
              <div class="field has-addons">
                <div class="control">
                  <button type="submit" class="button is-static">Factory</button>
                </div>
                <div class="control is-expanded">
                  <div class="select is-fullwidth">
                    <select style="width:100%;" v-model="columns[index].factoryVisibility" placeholder="Select">
                      <option value="all" label="All"></option>
                      <option v-for="item in factoryOptions" :key="item" :label="item" :value="item"></option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <a class="button is-fullwidth" @click="column.timeMode = 'Hours'; column.minutesAgo = 0" v-bind:class="{ 'is-active is-info': column.timeMode === 'Hours' }">
                    <span>Hours</span>
                  </a>
                </p>
                <p class="control is-expanded">
                  <a class="button is-fullwidth" @click="column.timeMode = 'Minutes'; column.hoursAgo = 0" v-bind:class="{ 'is-active is-info': column.timeMode === 'Minutes' }">
                    <span>Minutes</span>
                  </a>
                </p>
              </div>
              <div v-if="column.timeMode === 'Hours'">
                <div class="field has-addons">
                  <p class="control is-expanded">
                    <input class="input is-full-width" type="number" v-model="column.hoursAgo" placeholder="" min="0" max="24" step="1">
                  </p>
                  <p class="control">
                    <a class="button" @click="incrementControl(column, 'hoursAgo', 'up')">
                      <i class="fas fa-plus"></i>
                    </a>
                  </p>
                  <p class="control">
                    <a class="button" @click="incrementControl(column, 'hoursAgo', 'down')">
                      <i class="fas fa-minus"></i>
                    </a>
                  </p>
                </div>
              </div>
              <div v-if="column.timeMode === 'Minutes'">
                <div class="field has-addons">
                  <p class="control is-expanded">
                    <input class="input is-full-width" type="number" v-model="column.minutesAgo" placeholder="" min="0" max="1200" step="1">
                  </p>
                  <p class="control">
                    <a class="button" @click="incrementControl(column, 'minutesAgo', 'up')">
                      <i class="fas fa-plus"></i>
                    </a>
                  </p>
                  <p class="control">
                    <a class="button" @click="incrementControl(column, 'minutesAgo', 'down')">
                      <i class="fas fa-minus"></i>
                    </a>
                  </p>
                </div>
              </div>
              <div class="notification" v-if="column.minutesAgo === 0 && column.hoursAgo === 0" style="margin-top:1em;">
                <span v-if="columns[index].factoryVisibility === 'all'">All results are showing for all factories.</span>
                <span v-if="columns[index].factoryVisibility !== 'all'">All results are showing for {{columns[index].factoryVisibility}} factory.</span>
              </div>
            </div>
            <div class="card-content">
              <div class="content">
                <div v-for="(f, fIndex) in factories" v-bind:key="fIndex" class="box" v-if="validForDisplay(f, column)" style="margin-bottom:1em">
                  <article class="media">
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>{{f.factory }}</strong> @ {{f.time}}
                          <b-tooltip v-if="column.timeMode === 'Minutes'" type="is-info" :label="`${f.minutes_ago} minutes ago`" position="is-bottom">
                            <i class="fas fa-clock"></i>
                          </b-tooltip>
                          <b-tooltip v-if="column.timeMode === 'Hours'" type="is-info" :label="`${f.hours_ago} hours ago`" position="is-bottom">
                            <i class="fas fa-clock"></i>
                          </b-tooltip>
                        </p>
                        <div class="widgets columns is-gapless">
                          <div class="widget column column-with-background" v-for="(widget, key) in f.widgets" v-bind:key="key" v-bind:class="{'is-warning': key === 'yellow', 'is-info': key === 'blue', 'is-success': key === 'green', 'is-danger': key === 'red'}">
                            {{key | capitalize}}: {{widget}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div><!-- end column -->
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'
import FactoriesData from '@/store/factoryData'
import DefaultColumnsData from '@/store/defaultColumns'
import draggable from 'vuedraggable'

export default {
  name: 'Columns',
  components: {
    draggable
  },
  data () {
    return {
      factoryOptions: [ 'Primary', 'Secondary' ],
      factories: FactoriesData,
      columns: []
    }
  },
  mounted () {
    EventBus.$on('add-column', () => {
      this.addColumn()
    })
    let savedColumns = this.$localStorage.get('columns')
    if (savedColumns && JSON.parse(savedColumns).length) {
      this.columns = JSON.parse(savedColumns)
    } else {
      this.columns = DefaultColumnsData
    }
  },
  watch: {
    columns: {
      handler: function () {
        this.saveColumns()
      },
      deep: true
    }
  },
  methods: {
    incrementControl (column, type, direction) {
      if (column[type] >= 0) {
        if (direction === 'up') {
          column[type]++
        } else {
          if (column[type] !== 0) {
            column[type]--
          }
        }
      }
    },
    saveColumns () {
      this.$localStorage.set('columns', JSON.stringify(this.columns))
    },
    validForDisplay (f, column) {
      if (column.factoryVisibility === 'all') {
        return this.filterTime(f, column)
      } else {
        if (column.factoryVisibility === f.factory) {
          return this.filterTime(f, column)
        } else {
          return false
        }
      }
    },
    filterTime (f, column) {
      if (column.hoursAgo === 0 && column.minutesAgo === 0) {
        // factory matches and time isn't an issue
        return true
      } else {
        if (column.hoursAgo > 0 && column.minutesAgo === 0) {
          if (f.hours_ago <= column.hoursAgo) {
            return true
          } else {
            return false
          }
        } else if (column.hoursAgo === 0 && column.minutesAgo > 0) {
          if (f.minutes_ago <= column.minutesAgo) {
            return true
          } else {
            return false
          }
        } else {
          console.log('A non-typical sort occured.')
          return false
        }
      }
    },
    addColumn (mobile) {
      let newColumn = this.columnFactory()
      this.columns.unshift(newColumn)
      this.saveColumns()
    },
    removeColumn (index) {
      this.columns.splice(index, 1)
    },
    columnFactory () {
      return {
        id: this.columnIdGenerator(),
        showSettings: true,
        factoryVisibility: 'all',
        timeMode: 'Hours',
        hoursAgo: 0,
        minutesAgo: 0
      }
    },
    columnIdGenerator () {
      let text = ''
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
.column.widget-column-container{
  max-width: 500px;
}
.card-settings{
  margin-top: 1em;
  padding-bottom:1em;
  padding-left:1em;
  padding-right:1em;
  -webkit-box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
  box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
}
.widget{
  &.column-with-background{
    padding: .5em 1em!important;
    text-align: center;
    &.is-info{
      background-color: #209cee;
      color: #fff;
    }
    &.is-success {
      background-color: #23d160;
      color: #fff;
    }
    &.is-warning {
      background-color: #ffdd57;
      color: rgba(0, 0, 0, 0.7);
    }
    &.is-danger {
      background-color: #ff3860;
      color: #fff;
    }
    &:first-of-type{
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-of-type{
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
}
// Remove that pesky input[number] up/down arrows
/* For Firefox */
input[type='number'] {
    -moz-appearance:textfield;
}
/* Webkit browsers like Safari and Chrome */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
