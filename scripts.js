const checkBoxesSelector = () => 'input[type=checkbox';
const selectAllElements = (selector) => document.querySelectorAll(selector);
const createArray = (arrayLike) => Array.from(arrayLike);

const isSet = (value) => value != null;
const clickGradientAgnosticRange = (firstClicked, nextClicked) => {
  const startIndex = firstClicked < nextClicked ? firstClicked : nextClicked;
  const stopIndex = startIndex + Math.abs(firstClicked - nextClicked);
  return [startIndex, stopIndex];
};

const checkHandler = (checkBoxes) => {
  let lastClickedIndex;
  return (event) => {
    const currentClickedIndex = checkBoxes.indexOf(event.target);
    if (event.shiftKey && isSet(lastClickedIndex)) {
      const [startIndex, stopIndex] = clickGradientAgnosticRange(
        lastClickedIndex,
        currentClickedIndex,
      );

      checkBoxes
        .slice(startIndex, stopIndex + 1)
        .forEach((checkBox) => (checkBox.checked = true));
    }
    lastClickedIndex = currentClickedIndex;
  };
};

const checkBoxes = compose(createArray, selectAllElements, checkBoxesSelector);
document
  .querySelector('.inbox')
  .addEventListener('click', compose(checkHandler, checkBoxes)());

function compose(...fns) {
  return function innerComposeF(initValue) {
    return fns.reduceRight(function innerReduceRightF(currentValue, fn) {
      return fn(currentValue);
    }, initValue);
  };
}
