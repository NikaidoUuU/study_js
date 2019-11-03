const objectData = [
  { x: 10, y: 130 },
  { x: 100, y: 60 },
  { x: 190, y: 160 },
  { x: 280, y: 10 }
];
const lineGenerator = rj3.svg
  .line()
  .x(d => d.x)
  .y(d => d.y);
const path = lineGenerator(objectData);

document.querySelector("#pathFromObjects").setAttribute("d", path);
