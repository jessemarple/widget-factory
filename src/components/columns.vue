<template>
  <div>
    <div class="columns">
      <div v-for="(column, index) in columns" :key="column.id" class="column">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              <span>{{column.name}}</span>
            </p>
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
                        <b-tooltip v-if="column.timeMode === 'Minutes'" type="is-info" :label="`${f.minutes_ago} minutes ago.`" position="is-bottom" multilined="true">
                          <i class="fas fa-clock"></i>
                        </b-tooltip>
                        <b-tooltip v-if="column.timeMode === 'Hours'" type="is-info" :label="`${f.hours_ago} hours ago.`" position="is-bottom" multilined="true">
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
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'
import FactoriesData from '@/store/factoryData'
export default {
  name: 'Columns',
  data () {
    return {
      factoryOptions: [ 'Primary', 'Secondary' ],
      factories: FactoriesData,
      columns: [
        {
          id: 1,
          name: 'Column 1',
          factoryVisibility: 'all',
          timeMode: 'Hours',
          hoursAgo: 0,
          minutesAgo: 0,
          showSettings: true
        },
        {
          id: 2,
          name: 'Column 2',
          factoryVisibility: 'all',
          timeMode: 'Hours',
          hoursAgo: 0,
          minutesAgo: 0,
          showSettings: true
        }
      ]
    }
  },
  mounted () {
    EventBus.$on('add-column', () => {
      this.addColumn()
    })
  },
  computed: {},
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
    validForDisplay (f, column) {
      // console.log('column', column)
      // console.log('f', f)
      if (column.factoryVisibility === 'all') {
        // all factories are visible
        return true
      } else {
        if (column.factoryVisibility === f.factory) {
          // this particular factory is visible
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
            } else {}
          }
        } else {
          return false
        }
      }
    },
    addColumn () {
      let newColumn = this.columnFactory()
      this.columns.push(newColumn)
    },
    removeColumn (index) {
      this.columns.splice(index, 1)
    },
    columnFactory () {
      return {
        name: `Column ${this.columns.length + 1}`,
        showSettings: true,
        factoryVisibility: 'all',
        timeMode: 'Hours',
        hoursAgo: 0,
        minutesAgo: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// Import SCSS variables using webpack alias
// @import '~scss_vars';
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
// @import './style.scss';
</style>
