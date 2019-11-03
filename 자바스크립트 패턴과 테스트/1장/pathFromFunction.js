rj3.svg.samples = {};

rj3.svg.samples.functionBasedLine = function() {
  const firstXCoord = 10;
  const xDistanceBetweenPoints = 50;
  const svgHeight = 200;

  const lineGenerator = rj3.svg
    .line()
    .x((_, i) => firstXCoord + i * xDistanceBetweenPoints)
    .y(function(d) {
      return svgHeight - this.getValue(d);
    });

  return lineGenerator;
};

const yearlyPriceGrapher = {
  lineGenerator: rj3.svg.samples.functionBasedLine(),

  getValue: function getValue(year) {
    return 10 * Math.pow(1.8, year - 2010);
  }
};
const years = [2010, 2011, 2012, 2013, 2014, 2015];
const path = yearlyPriceGrapher.lineGenerator(years);

document.querySelector("#pathFromFunction").setAttribute("d", path);
