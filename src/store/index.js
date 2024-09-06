import { createStore } from 'vuex';

// Import your modules
import auth from './auth/index.js';
import users from './users/index.js';
import events from './events/index.ts';
import reference from './reference';
import dashboard from "@/modules/Dashboard/store/index.js";

const store = createStore({
    modules: {
        auth,
        users,
        events,
        reference,
        dashboard
    }
});

export default store;
