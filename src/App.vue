<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';

export default {
  name: 'app',
  components: {
    Navigation,
  },
  mounted() {
    // $(() => {
    //   $('#pid-form').submit((event) => {
    //     event.preventDefault();
    //     const pid = $('#pid').val();
    //     if (pid) {
    //       ACPToolKit.setCurrentParticipantId(pid);
    //       window.location = 'questionnaire-pre.html';
    //     } else {
    //       alert('Please enter a valid Participant ID (pid)!');
    //     }
    //   });
    // });
  },
};
</script>

<style>

</style>
