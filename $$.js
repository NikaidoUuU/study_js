function $$(selector, context = document) {
  const elements = context.querySelectorAll(selector);
  return [...elements];
}
<html>
  <head>
    <style></style>
  </head>
  <body>
    <div></div>
  </body>
</html>;
