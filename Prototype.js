// 자바스크립트의 모든 객체는 자신의 부모 역할을 담당하는 객체와 연결되어 있다.
// 그리고 이것은 마치 객체 지향의 상속 개념과 같이 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있게 한다.
// 이러한 부모 객체를 Prototype(프로토타입) 객체 또는 줄여서 Prototype(프로토타입)이라 한다.
// Prototype 객체는 생성자 함수에 의해 생성된 각각의 객체에 공유 프로퍼티를 제공하기 위해 사용한다.

function Person(name) {
  this.name = name;
}

var foo = new Person("Lee");

// Person() 생성자 함수에 의해 생성된 객체를 생성한 객체는 Person() 생성자 함수이다.
console.log(Person.prototype.constructor === Person);

// foo 객체를 생성한 객체는 Person() 생성자 함수이다.
console.log(foo.constructor === Person);

// Person() 생성자 함수를 생성한 객체는 Function() 생성자 함수이다.
console.log(Person.constructor === Function);

// 자바스크립트는 특정 객체의 프로퍼티나 메소드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메소드가 없다면
// [[Prototype]]이 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드를 차례대로 검색한다.
// 객체 리터럴을 사용하여 객체를 생성한 경우, 그 객체의 프로토타입 객체는 Object.prototype이다.

// 어떠한 방식으로 함수 객체를 생성하여도 모든 함수 객체의 prototype 객체는 Function.prototype이다.
// 생성자 함수도 함수 객체이므로 생성자 함수의 prototype 객체는 Function.prototype이다.

var str = "test";
console.log(typeof str); // string
console.log(str.constructor === String); // true
console.dir(str); // test

var strObj = new String("test");
console.log(typeof strObj); // object
console.log(strObj.constructor === String); // true
console.dir(strObj);
// {0: "t", 1: "e", 2: "s", 3: "t", length: 4, __proto__: String, [[PrimitiveValue]]: "test" }

console.log(str.toUpperCase()); // TEST
console.log(strObj.toUpperCase()); // TEST

// 원시 타입 문자열과 String() 생성자 함수로 생성한 문자열 객체의 타입은 분명히 다르다. 원시 타입은 객체가 아니므로 프로퍼티나 메소드를 가질수 없다.
// 하지만 원시 타입으로 프로퍼티나 메소드를 호출할 때 원시 타입과 연관된 객체로 일시적으로 변환되어 프로토타입 객체를 공유하게 된다.
// 원시 타입은 객체가 아니므로 프로퍼티나 메소드를 직접 추가할 수 없다.

// 하지만 String 객체의 프로토타입 객체 String.prototype에 메소드를 추가하면 원시 타입, 객체 모두 메소드를 사용할 수 있다.

var str = "test";

String.prototype.myMethod = function() {
  return "myMethod";
};

console.log(str.myMethod()); // myMethod
console.log("string".myMethod()); // myMethod
console.dir(String.prototype);

//

function Person(name) {
  this.name = name;
}

var foo = new Person("Lee");

// 프로토타입 객체의 변경
Person.prototype = { gender: "male" };

var bar = new Person("Kim");

console.log(foo.gender); // undefined
console.log(bar.gender); // 'male'

console.log(foo.constructor); // ① Person(name)
console.log(bar.constructor); // ② Object() 프로토타입 체이닝에 의해

// 자바스크립트의 상속

function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function() {
  return this.name;
};

function Child(name) {
  Parent.call(this, name);

  this.age = 0;
}

/* object.create()없었을때 꼼수
function Ghost() {};
Ghost.prototype = Parent.prototype;

Child.prototype = new Ghost();
*/
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.getAge = function() {
  return this.age;
};

var c = new Child();

// ES6 클래스 활용

class Parent {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Child extends Parent {
  constructor(name) {
    super(name); // 생성자 빌려쓰기 대신....super 함수를 이용 한다.
    this.age = 0;
  }

  getAge() {
    return this.age;
  }
}
