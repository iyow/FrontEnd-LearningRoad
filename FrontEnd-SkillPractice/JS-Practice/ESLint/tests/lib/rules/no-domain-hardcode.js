var rule = require("../../../lib/rules/no-zcy-domain"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("no-customdomain-domain", rule, {
    valid: [
        "bar",
        "baz",
        `
  var s = {
    x: "customdomain"
  };
  `,
    ],
    invalid: [
        {
            code: `
              var s = "//customdomain.cn"
            `,
            errors: [
                {
                    message: "不允许硬编码业务域名",
                },
            ],
        },
        {
            code: `
            var s = {
              x: "http://custom.domain.cn"
            };
            `,
            errors: [
                {
                    message: "不允许硬编码业务域名",
                },
            ],
        },
    ],
});