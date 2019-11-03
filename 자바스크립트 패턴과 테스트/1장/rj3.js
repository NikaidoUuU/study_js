// d3.svg.line을 축약한 코드

// 다른 전역 변수와 충돌을 피하기 위해 네임스페이스를 생성한다.
const rj3 = {};

// svg라는 하위 네임스페이스를 만든다.
rj3.svg = {};

// rj3.svg 네임스페이스에 line 메서드를 넣는다.
rj3.svg.line = function() {
  let getX = function(point) {
    return point[0];
  };
  let getY = function(point) {
    return point[1];
  };
  const interpolate = function(points) {
    return points.join("L");
  };

  function line(data) {
    const segments = [];
    const points = [];

    function segment() {
      segments.push("M", interpolate(points));
    }

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      points.push([+getX.call(this, d, i), +getY.call(this, d, i)]);
    }

    if (points.length) segment();

    return segments.length ? segments.join("") : null;
  }

  line.x = function(funcTogetX) {
    if (!arguments.length) return getX;
    getX = funcTogetX; // 함수 오버로딩
    return line; // 호출 체이닝
  };

  line.y = function(funcTogetY) {
    if (!arguments.length) return getY;
    getY = funcTogetY;
    return line;
  };

  return line;
};
