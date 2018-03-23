<template>
  <div id="about">
    <h1 class="title">About</h1>
    <div>
      <h3>How to Use Widget Factory</h3>
      <p>
        Columns can be added by clicking either the '+' button seen in the mobile view or the 'Add Column' for large tablets and desktop browsers. Once added, a column can have its data filtered by selecting from which factory and what time range to display. All changes are saved to local storage such that refreshing will persist added columns and their settings. By default, Widget Factory loads one column on start.
      </p>
      <p>
        Once setting selection has been made, the user can choose to close the settings panel in the column by hovering over the dropdown  indicator in the column's header and selecting 'Hide Settings'. Inversely, settings can be returned by following the same pattern and clicking 'Show Settings'.
      </p>
      <p>
        Columns can be deleted by clicking the dropdown indicator in the column's header and selecting 'Delete'. Should the user delete all of their columns, the default column will appear on reload.
      </p>
      <p>
        In desktop and large tablet viewports, columns can be rearranged by dragging using the column's drag handle and placing the column in the order the user desires.
      </p>
      <h3>About the Project</h3>
      <p>
        This project is an example of a widget factory dashboard. It allows for the user to add and remove collections of columns that return information about the operation of the factories by displaying how many widgets have been produced during the selected time. It does so while respecting the viewport size of the user's device.
      </p>
      <p>It was developed with:
        <ul>
          <li><a href="https://vuejs.org/" target="_blank">Vue</a> - MV*, handles the interactions between the data and the DOM as well as mounting, methods, computed values, and more.</li>
          <li><a href="https://vuex.vuejs.org/en/" target="_blank">Vuex</a> - manages the state(s) of the Widget Factory, from the status of the drawer (open/close), to the loaded columns and factory data.</li>
          <li><a href="https://github.com/pinguinjkeke/vue-local-storage" target="_blank">Vue LocalStorage</a> - allows of the saving of saved columns</li>
          <li><a href="https://router.vuejs.org/en/" target="_blank">Vue Router</a> - manages the routes</li>
          <li><a href="https://github.com/freearhey/vue2-filters" target="_blank">Vue Filters</a> - allows for inline filtering of properties. In this instance, I'm using it to capitalize the Widget type's name.</li>
          <li><a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue Draggable</a> - enables the columns to be dragged</li>
          <li><a href="https://webpack.js.org" target="_blank">WebPack</a> - JavaScript module bundler. Webpack takes modules with dependencies and generates static assets representing those modules.</li>
          <li><a href="https://bulma.io" target="_blank">Bulma</a> - simple, beautiful HTML/CSS framework that leaves Javascript out of the presentation</li>
          <li><a href="https://buefy.github.io" target="_blank">Buefy</a> - a Vue wrapper for certain Bulma elements and components</li>
        </ul>
      </p>
      <p>
        This project was developed over the in-between moments while working on other projects the week of March 19th through 23rd, 2018.
      </p>
      <p>
        If you see issues, or omissions, please don't think them intentional and do get in touch!
      </p>
      <p>
        All code, respective of their owners, is copyright 2018, Ossium, LLC.
      </p>
      <h3>About the Engineer</h3>
      <p>
        This example was developed by <a href="https://www.linkedin.com/in/jessemarple/" target="_blank">Jesse Marple</a>.
      </p>
      <p>
        Who am I? Well, I'm glad you asked! I am a software engineer and application architect, entrepreneur, mentor, leader, husband, father, and overall <a href="http://theleanstartup.com/" target="_blank">LEAN startup enthusiast</a>. I'm also known to my friends as somewhat of a Disney fan.
      </p>
      <p>
        My experience includes collaborating closely with executive, product, and creative stakeholders to deliver solutions that must handle high traffic and constant stability across a variety of devices, viewports, accessibility accommodations, and technologies.
      </p>
      <p>
        I have assisted teams struggling to deliver consistent quality code releases - to includes agile repair, and engaging the team’s “muscle memory” for lifecycle workflow.
      </p>
      <p>
        I have mentored dozens of junior engineers and designers; helping kickstart careers that have seen some of my former padawans employed by HubSpot, Microsoft, Apple, Amazon, Google and many others.
      </p>
      <p>
        I have worked with hybrid and native application development. I have worked with and in JavaScript, JSTL, PHP, Node, MC* frameworks, linters, unit tests, websockets and restful endpoints.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>
  #about{
    padding: 1em;
    h3{
      font-weight: bold;
    }
    p{
      margin-bottom: 1em;
    }
    ul{
      list-style: circle;
      padding-left: 1em;
      margin-top: 1em;
      margin-left: 1em;
    }
  }
</style>
