<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="collapse navbar-collapse">
        <div class="nav navbar-nav">
          <router-link to="/">Welcome</router-link>
          <router-link to="/questionnaire-pre">Pre Questionnaire</router-link>
          <router-link to="/instructions">Instructions</router-link>
          <router-link to="/experiment">Experiment</router-link>
          <router-link to="/questionnaire-post">Post Questionnaire</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
};
</script>

<style>
.navbar-nav::after {
  clear: both;
}

.navbar-nav > a {
  text-decoration: none;
  color: #777;
  display: block;
  float: left;
  height: 100%;
  padding: 15px;
}

.router-link-exact-active {
  color: #555;
  background-color: #e7e7e7;
}
</style>
