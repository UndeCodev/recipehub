import { createStore } from "vuex";
import auth from "@/modules/auth/store";
import recipes from "@/modules/recipes/store";

const store = createStore({
    modules: {
        auth,
        recipes
    }
})

export default store