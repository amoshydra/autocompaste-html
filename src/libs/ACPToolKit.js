import DataStorage from './DataStorage';
// ACPToolKit depends on DataStorage. Must be loaded after DataStorage.js.

/*
 * http://stackoverflow.com/questions/17836273/export-javascript-data-to-csv-file-without-server-interaction
 */
const arrayToCSV = function arrayToCSV(twoDiArray, fileName) {
  const csvRows = [];
  // eslint-disable-next-line
  for (let i = 0; i < twoDiArray.length; ++i) {
    // eslint-disable-next-line
    for (let j = 0; j < twoDiArray[i].length; ++j) {
      twoDiArray[i][j] = `"${twoDiArray[i][j]}"`;
    }
    csvRows.push(twoDiArray[i].join(','));
  }

  const csvString = csvRows.join('\r\n');
  const $a = $('<a></a>', {
    href: `data:attachment/csv;charset=utf-8,${escape(csvString)}`,
    target: '_blank',
    download: `${fileName}.csv`,
  });

  $('body').append($a[0]);
  $a.get(0).click();
  $a.remove();
};

const ACPToolKit = {
  setCurrentParticipantId(pid) {
    DataStorage.setItem('pid', pid);
  },

  getCurrentParticipantId() {
    let pid = DataStorage.getItem('pid');
    if (!pid) {
      alert('Current participant not set!');
      pid = prompt('Enter current participant ID:').toString();
      ACPToolKit.setCurrentParticipantId(pid);
    }
    return pid;
  },

  clearAllData() {
    ['pid', 'pretest', 'trials', 'posttest'].forEach((key) => {
      DataStorage.removeItem(key);
    });
  },

  downloadFormData(formResponses, type) {
    const headers = [];
    const data = [];
    const pid = ACPToolKit.getCurrentParticipantId();
    formResponses.unshift({ name: 'pid', value: pid });
    formResponses.forEach((item) => {
      headers.push(item.name);
      data.push(item.value);
    });
    arrayToCSV([headers, data], `acp-${pid}-${type}`);
  },

  downloadTrialResults(data) {
    const pid = ACPToolKit.getCurrentParticipantId();
    arrayToCSV(data, `acp-${pid}-trials`);
  },

  updatePid() {
    // Populate interface with current participant's ID
    const $pidEl = $('.js-pid');
    if ($pidEl.length > 0) {
      $pidEl.text(ACPToolKit.getCurrentParticipantId());
    }
  },
};

ACPToolKit.initExperiment = () => {
  const wm = new WindowManager('autocompaste-display');
  let currentTrialOptions = null;
  let startTime = null;

  ACPToolKit.cleanUpDOM = function cleanUpDOM() {
    // Clean up DOM
    wm.destroyAllWindows();
    $('#autocompaste-completion').remove();
    $('#autocompaste-measure-num-wrapped-lines').remove();
    $('#autocompaste-measure-get-single-line-height').remove();
    $('#autocompaste-measure-text-length-in-pixels').remove();
    $('#autocompaste-completion').remove();
  };

  ACPToolKit.presentTrial = function presentTrial(options) {
    startTime = new Date().getTime();
    currentTrialOptions = options;

    // eslint-disable-next-line
    const data_file = options.data_file;
    const stimuli = options.stimuli;

    ACPToolKit.cleanUpDOM();

    $('.js-expt-technique').text(options.technique);
    $('.js-expt-granularity').text(options.granularity);
    $('.js-expt-stimuli').text(options.stimuli);


    let engine = null;
    switch (options.technique) {
      case 'TRADITIONAL': {
        engine = null;
        break;
      }
      case 'ACP':
      default: {
        engine = new AutoComPaste.Engine();
        break;
      }
    }

    const iface = new AutoComPaste.Interface(wm, engine, data_file);

    // Highlight the relevant text.
    iface.addEventListener('loaded', () => {
      // eslint-disable-next-line
      const lines_to_highlight = stimuli.split('\n\n');

      const windows = wm.getWindowList();
      for (let i = 0; i < windows.length; i += 1) {
        if (windows[i] === 'text_editor') {
          // eslint-disable-next-line
          continue;
        }

        const win = wm.getWindowContent(windows[i]);
        let content = $(win).find('pre').html();
        lines_to_highlight.map((value, index, array) => {
          content = content.replace(value,
                      `<span class="highlighted">${value}</span>`);
          return null;
        });

        $(win).find('pre').empty().append(content);
      }
    });
  };

  ACPToolKit.getCurrentTrialState = () => {
    if (!currentTrialOptions) {
      console.error('There is no trial running right now!');
      return {};
    }
    const endTime = new Date().getTime();
    currentTrialOptions.start_time = startTime;
    currentTrialOptions.end_time = endTime;
    currentTrialOptions.duration = endTime - startTime;
    currentTrialOptions.user_response = $.trim($('.autocompaste-textarea').val());
    return currentTrialOptions;
  };
};

export default ACPToolKit;
