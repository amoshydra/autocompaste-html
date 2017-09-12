<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <h1>Copy-Paste Experiment</h1>
        <hr>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <td>Technique</td>
              <td><span class="js-expt-technique">ACP</span></td>
            </tr>
            <tr>
              <td>Granularity</td>
              <td><span class="js-expt-granularity">Phrase</span></td>
            </tr>
            <tr>
              <td>Independent Variable 3</td>
              <td>???</td>
            </tr>
            <tr>
            <td>Trial</td>
              <td><span class="js-expt-current-trial"></span> / <span class="js-expt-num-trials"></span></td>
            </tr>
          </tbody>
        </table>
        <p>Please copy-paste the following <span class="js-expt-granularity">phrase</span> using the <span class="js-expt-technique">AUTOCOMPASTE</span> technique from one of the open windows.</p>
        <div id="stimuli" class="alert alert-danger js-expt-stimuli">This is a long stimuli!</div>
        <button class="btn btn-primary btn-lg"
                v-on:click="next">Next Task</button>
        <br>
      </div>
      <div id="autocompaste" class="col-md-9">
        <div id="autocompaste-display"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ACPToolKit from '@/libs/ACPToolKit';

export default {
  data() {
    return {
      trialsData: null,
      currentTrial: null,
      totalNumberOfTrials: null,
      headers: ['Participant id', 'Technique', 'Granularity',
        'Trial no', 'Stimuli', 'User Response', 'Trial Start Time',
        'Trial End Time', 'Trial Time', 'Accuracy'],
      trialData: [],
      pid: null,
    };
  },
  methods: {
    next() {
      if (this.currentTrial !== 0) {
        const trialResult = ACPToolKit.getCurrentTrialState();

        const technique = trialResult.technique;
        const granularity = trialResult.granularity;
        const trialNum = this.currentTrial;
        const stimuli = trialResult.stimuli;
        const userResponse = trialResult.user_response;
        const trialStartTime = trialResult.start_time;
        const trialEndTime = trialResult.end_time;
        const trialDuration = trialResult.duration;
        const accuracy = stimuli === userResponse ? 1 : 0;

        const row = [this.pid, technique, granularity, trialNum,
          stimuli, userResponse, trialStartTime,
          trialEndTime, trialDuration, accuracy];
        this.trialData.push(row);
      }

      if (this.currentTrial < this.totalNumberOfTrials) {
        ACPToolKit.presentTrial(this.trialsData[this.currentTrial]);
        this.currentTrial += 1;
        $('.js-expt-current-trial').text(this.currentTrial);
      } else {
        // Last trial completed
        ACPToolKit.downloadTrialResults(this.trialData);
        this.$router.push('questionnaire-post');
      }
    },
  },
  mounted() {
    Vue.nextTick(() => {
      ACPToolKit.updatePid();
      ACPToolKit.initExperiment();

      $.get('data/experiments.json', (data) => {
        this.trialsData = data.experiments;
        this.currentTrial = 0;
        this.totalNumberOfTrials = this.trialsData.length;
        $('.js-expt-num-trials').text(this.totalNumberOfTrials);
        this.trialData.push(this.headers);
        this.next();
        this.pid = ACPToolKit.getCurrentParticipantId();
      });
    });

    // Stretch to fill entire display.
    $('#autocompaste-display').css('height', $(window).height() - 50);

    $(window).resize(() => {
      // Stretch to fill entire display.
      $('#autocompaste-display').css('height', $(window).height() - 50);
    });
  },

  beforeDestroy() {
    if (typeof ACPToolKit.cleanUpDOM === 'function') {
      ACPToolKit.cleanUpDOM();
    }
  },
};
</script>

<style>
#autocompaste {
  min-height: 600px;
}
</style>
