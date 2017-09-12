<template>
<div class="container">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <h1>Welcome!</h1>
      <hr>
      <p>The startup interface provides the basic instructions to your participants, and also collect input from the participant/experimenter the participant ID so that you can generate the correct data log for a particular experiment session.</p>

      <p>This is a template. Please write your participant number ID given by your experimenter. Participant IDs should only consist of alphanumeric characters.</p>
      <form class="form-inline" id="pid-form">
        <div class="form-group">
          <label for="pid">Participant ID</label>
          <input name="pid" type="text" class="form-control" id="pid" placeholder="E.g. P01">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import ACPToolKit from '@/libs/ACPToolKit';

export default {
  mounted() {
    ACPToolKit.updatePid();

    $('#pid-form').submit((event) => {
      event.preventDefault();
      const pid = $('#pid').val();
      if (pid) {
        ACPToolKit.setCurrentParticipantId(pid);
        this.$router.push('questionnaire-pre');
      } else {
        alert('Please enter a valid Participant ID (pid)!');
      }
    });
  },
};
</script>

<style>

</style>
