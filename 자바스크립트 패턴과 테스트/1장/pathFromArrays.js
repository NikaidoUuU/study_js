const arrayData = [[10, 130], [100, 60], [190, 160], [280, 10]];
const lineGenerator = rj3.svg.line();
const path = lineGenerator(arrayData); // const path = rj3.svg.line()(arrayData);

document.querySelector("#pathFromArrays").setAttribute("d", path);
