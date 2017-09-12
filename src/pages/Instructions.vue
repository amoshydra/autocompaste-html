<template>
<div class="container">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <h1>Instructions</h1>
      <hr>
      <p>Dear participant <span class="js-pid pid"></span>, please read the instructions before the experiment.

      <p>There should always be an instruction before doing the actual evaluation of the interface.<p>
      <p>Enter your instructions to your participant here. Diagrams and screenshots will be very helpful!</p>

      <form class="form-inline">
        <button type="submit" class="btn btn-primary btn-lg">Next</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
// eslint-disable-next-line
import ACPToolKit from '@/libs/ACPToolKit';

export default {
  mounted() {
    ACPToolKit.updatePid();

    $('form').submit((event) => {
      event.preventDefault();
      this.$router.push('experiment');
    });
  },
};
</script>

<style>

</style>
