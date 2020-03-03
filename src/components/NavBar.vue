<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
      <b-navbar-brand :to="{ path: '/' }">
        <img src="../assets/logo.png" width="25" />
        IDEO
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ path: '/' }" data-cy="nav-bar-dashboard">
            <i class="fa fa-home"></i>
            Home
          </b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            v-if="user"
            data-cy="nav-bar-welcome-text"
          >
            Welcome, {{user.type}}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: "NavBar",
  data() {
      return {
          user: {
              type: 'viewer',
              role: 'basic'
          }
      }
  },
  computed: {

  },
  methods: {

  }
};
</script>