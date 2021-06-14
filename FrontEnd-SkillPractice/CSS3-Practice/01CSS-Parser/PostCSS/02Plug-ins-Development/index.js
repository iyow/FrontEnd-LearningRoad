const postcss = require('postcss');
const {
    createPseudoElement,
    createMediaQuery,
    getPseudoSelector,
    unique
} = require('./helper');

const borderReg = /border(?:-top|-bottom|-left|-right|-image)?(?:-width)?$/;
const borderRadiusReg = /border-radius/;
const borderColorReg = /border-color/;
const unit1PxReg = /1px/;
const pseudoReg = /:(?:before|after)$/;

const retina1px = postcss.plugin('postcss-retina-1px', (options = {}) => (root) => {
    const {
        dpr = 4,
        radiusUnit = 'vw',
    } = options;
    const retinaRuleList = [];
    const selectors = [];
    let borderRadiusValue = undefined;
    root.walkRules((rule) => {
        const borderDecls = [];
        let isExistBorderWidth = false;
        let isPositionStatic = true;

        rule.walkDecls((decl) => {
            if (borderReg.test(decl.prop) && unit1PxReg.test(decl.value)) {
                const next = decl.next();
                if (!next || next.type !== 'comment' || !/^no$/.test(next.text.trim())) {
                    isExistBorderWidth = true;                    
                    decl.remove();
                    borderDecls.push(decl);
                }
            }
        });
        if (isExistBorderWidth) {
            rule.walkDecls((decl) => {
                if (borderRadiusReg.test(decl)) {
                    borderRadiusValue = decl.value;
                    borderDecls.push(decl);
                }
                if (borderColorReg.test(decl)) {
                    borderDecls.push(decl);
                }
                if (decl.prop === 'position' && decl.value !== 'static') {
                    isPositionStatic = false;
                }
            });
        }

        const slts = rule.selectors.filter(slt => !pseudoReg.test(slt));
        if (!isExistBorderWidth || slts.length <= 0) {
            return;
        }

        const newRule = postcss.rule({
            selector: getPseudoSelector(slts)
        });
        borderDecls.forEach((decl) => {
            newRule.append(decl);
        });
        retinaRuleList.push(newRule);

        if (isPositionStatic) {
            rule.append({ prop: 'position', value: 'relative' });
        }
        [].push.apply(selectors, rule.selectors);
    });

    retinaRuleList.forEach((rule) => {
        root.append(rule);
    });

    if (selectors.length > 0) {
        const slts = unique(selectors);
        root.append(createPseudoElement(slts));
        for (let i = 2, len = dpr + 1; i < len; i++) {
            root.append(createMediaQuery(slts, i, borderRadiusValue, radiusUnit));
        }
    }
});

module.exports = retina1px;