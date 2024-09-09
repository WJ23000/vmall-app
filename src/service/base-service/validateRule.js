import RuleService from "./rule";

// 校验手机号
function validatePhone(rule, value, callback) {
  if (value) {
    if (value.length != 11) {
      callback(new Error("请保证输入11位有效手机号"));
      return;
    }
    if (!RuleService.PHONE.test(value)) {
      callback(new Error("手机号格式有误，请重新输入"));
    }
  }
  callback();
}

export { validatePhone };
