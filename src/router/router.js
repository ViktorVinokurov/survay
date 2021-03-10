import survay from "@/views/survey/index";
import dataSurvay from "@/views/dataSurvey/index";

const routes = [
    {
        path: '/',
        name: 'Survay',
        component: survay,
        title: 'Опрос',
        icon: 'mdi-clipboard-list-outline'
    },
    {
        path: '/dataSurvay',
        name: 'dataSurvay',
        component: dataSurvay,
        title: 'Данные опроса',
        icon: 'mdi-clipboard-flow-outline'
    },
]
export default routes