import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import PrimeVue from 'primevue/config';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from "primevue/panel";
import Menubar from "primevue/menubar";
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

import 'primevue/resources/themes/mdc-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'


axios.defaults.baseURL = 'http://localhost:8080/api/'

const app = createApp(App)
app
    .use(PrimeVue)
    .component('DataTable', DataTable)
    .component('Column', Column)
    .component('Panel', Panel)
    .component('Menubar', Menubar)
    .component('Dialog', Dialog)
    .component('InputText', InputText)
    .component('InputNumber', InputNumber)
    .component('Toolbar', Toolbar)
    .component('Button', Button)
    .component('FileUpload', FileUpload)
    .use(ToastService)
    .component('Toast', Toast)
    .mount('#app');
//createApp(App).mount('#app')


