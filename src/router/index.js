import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import QuestionnairePre from '@/pages/QuestionnairePre';
import Instructions from '@/pages/Instructions';
import Experiment from '@/pages/Experiment';
import QuestionnairePost from '@/pages/QuestionnairePost';
import End from '@/pages/End';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: Index },
    { path: '/questionnaire-pre', component: QuestionnairePre },
    { path: '/instructions', component: Instructions },
    { path: '/experiment', component: Experiment },
    { path: '/questionnaire-post', component: QuestionnairePost },
    { path: '/end', component: End },
  ],
});
