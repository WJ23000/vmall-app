const RuleService = {
  // 账号不能由纯数字组成
  NUMBER: /^[0-9]*$/,
  // 名称(姓名)由中文、英文大小写、任意数字组成
  REALNAME: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
  // 手机号
  PHONE: /^1[3456789]\d{9}$/,
  // 域名
  ORG: /^[a-zA-Z\d-]+(\.[a-zA-Z\d-]+){2}$/,
};

export default RuleService;
