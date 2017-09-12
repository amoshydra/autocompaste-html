<template>
<div class="container">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <h1>Post-Experiment Questionnaire</h1>
      <hr>
      <p>This part of the interface collects whatever post-experiment information. After the experiment, you want to collect more qualitative and quantitative feedback about the tested techniques. Some of the typical questions include, personal preferences, any difficulties participants experienced in the experiment, and areas of improvement. Please design a basic post-experimental questionnaire (no more than 10 questions).</p>

      <p>Current participant: <span class="js-pid pid"></span></p>

      <form id="post-expt-form">
        <div class="form-group">
          <label for="q1">Question 1 - Text</label>
          <input type="text" class="form-control" id="q1" name="q1" placeholder="Enter answer">
        </div>
        <div class="form-group">
          <label for="q2">Question 2 - Radio</label>
          <div class="radio">
            <label>
              <input type="radio" name="q2" id="optionsRadios1" value="radio1">
              Radio response 1
            </label>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="q2" id="optionsRadios2" value="radio2">
              Radio response 2
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="q3">Question 3 - Checkbox</label>
          <div class="checkbox">
            <label>
              <input type="checkbox" name="q3" value="checkbox1">
              Checkbox response 1
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" name="q3" value="checkbox2">
              Checkbox response 2
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="q4">Question 4 - Select Options</label>
          <select class="form-control" name="q4">
            <option value="option1">Option response 1</option>
            <option value="option2">Option response 2</option>
            <option value="option3">Option response 3</option>
            <option value="option4">Option response 4</option>
            <option value="option1">Option response 5</option>
          </select>
        </div>
        <div class="form-group">
          <label for="q5">Question 5 - Textarea</label>
          <textarea class="form-control" id="q5" name="q5" placeholder="Enter response"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
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

    $('#post-expt-form').submit(function goToNextStep(event) {
      event.preventDefault();
      const formResponses = $(this).serializeArray();
      // Do your own form validation here.
      ACPToolKit.downloadFormData(formResponses, 'post');
      ACPToolKit.clearAllData();
      alert('Thank you for your participation!');
    });
  },
};
</script>

<style>

</style>
