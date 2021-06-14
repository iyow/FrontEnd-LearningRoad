function getPseudoSelector(classList) {
    return classList.map(slt => `${slt}::before`).join(', ');
}

function createPseudoElement(classList) {
    return `
${getPseudoSelector(classList)} {
  content: ' ';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  box-sizing: border-box;
  font-size: 100px;
}`;
}

function createMediaQuery(classList, dpr, radiusValue, radiusUnit) {
    if (classList.length < 1) return '';
    return `
/* dpr is ${dpr} */
@media only screen and (-webkit-min-device-pixel-ratio: ${dpr}), 
only screen and (min-device-pixel-ratio: ${dpr}) {
  ${getPseudoSelector(classList)} {
    transform: scale(${parseFloat((1 / dpr).toFixed(3))});
    transform-origin: 0 0;
    width: ${dpr * 100}%;
    height: ${dpr * 100}%;
    font-size: ${dpr * 100}px;
    ${radiusValue ? `border-radius: ${radiusUnitTransformAnyUnit(radiusValue, radiusUnit, dpr)};` : ''}
  }
}`;
}

function radiusUnitTransformAnyUnit(value, unit, dpr) {
    const reg = new RegExp(`(\\d+(\\.\\d+)?)${unit}`, 'g');
    return value.replace(reg, ($0, $1) => `${(parseFloat($1) * dpr).toFixed(3)}${unit}`);
}

function unique(list) {
    const table = {};
    return list.reduce((c, item) => {
        if (!table[item]) {
            table[item] = true;
            c.push(item);
        }
        return c;
    }, []);
}

module.exports = {
    getPseudoSelector,
    createPseudoElement,
    createMediaQuery,
    radiusUnitTransformAnyUnit,
    unique
};