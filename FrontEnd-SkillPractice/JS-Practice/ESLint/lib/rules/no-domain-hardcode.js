module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "不允许硬编码业务域名",
        },
        fixable: "code",
    },

    create: function (context) {
        const sourceCode = context.getSourceCode();

        function checkDomain(node) {
            // 匹配硬编码的业务域名的正则
            // 此处可以使用 业务传入配置进行 匹配
            const Reg = /^(http:\/\/|https:\/\/|\/\/)(.*.){0,1}customdomain(.com|cn)(.*)/;
            const content =
                (node.type === "Literal" && node.value) ||
                (node.type === "TemplateLiteral" && node.quasis[0].value.cooked);

            const domainNode =
                (node.type === "Literal" && node) ||
                (node.type === "TemplateLiteral" && node.quasis[0]);

            if (Reg.test(content)) {
                context.report({
                    node,
                    // 错误/警告提示信息
                    message: "不允许硬编码业务域名",
                    // 修复
                    fix(fixer) {

                        const fixes = [];

                        let domainKey = content.match(Reg)[2];
                        domainKey = domainKey
                            ? domainKey.substr(0, domainKey.length - 1)
                            : "";

                        if (node.type === "Literal") {
                            fixes.push(
                                fixer.replaceTextRange(
                                    [domainNode.start + 1, domainNode.end - 1],
                                    content.replace(Reg, `$4`)
                                )
                            );
                        }

                        if (node.type === "TemplateLiteral") {
                            fixes.push(
                                fixer.replaceTextRange(
                                    [domainNode.start, domainNode.end],
                                    content.replace(Reg, `$4`)
                                )
                            );
                        }

                        if (
                            node.type === "Literal" &&
                            node.parent.type === "JSXAttribute"
                        ) {
                            fixes.push(fixer.insertTextBefore(node, "{"));
                            fixes.push(fixer.insertTextAfter(node, "}"));
                        }

                        fixes.push(
                            fixer.insertTextBefore(
                                node,
                                `window.getDomain('${domainKey}') + `
                            )
                        );

                        return fixes;
                    },
                });
            }
        }
        return {
            // 文本
            Literal: checkDomain,
            // 模板字符串
            TemplateLiteral: checkDomain,
        };
    },
};