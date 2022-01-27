import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserEdit, faEdit, faUserMinus, faPhoneSlash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserEdit, faEdit, faUserMinus, faPhoneSlash)

createApp(App).mount('#app')
