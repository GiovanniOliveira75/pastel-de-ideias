import * as rules from "vee-validate/dist/rules";
import { extend, localize, configure } from "vee-validate";
import en from "vee-validate/dist/locale/pt_BR.json";

for (let rule in rules) {
    extend(rule, rules[rule]);
}

configure({
    classes: {
        valid: "is-valid",
        invalid: "is-invalid"
    }
});

localize({ en });