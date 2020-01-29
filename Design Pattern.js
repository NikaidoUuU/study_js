/*
  Proven, Reusable, Expressive
 */

// 1. Modules
// 1-1 Object Literals
const bankAccount = {
  balance: 900,
  deposit(amount) {
    this.balance += amount;
  },
  withdraw(amount) {
    this.balance -= amount;
  }
};

// 1-2 Privacy Concerns
(function() {
  function createBankAccount(user, password) {
    let balance = 0;

    return {
      deposit: amount => (balance += amount),
      withdraw: (amount, pw) => {
        if (password !== pw) return;

        balance -= amount;
      }
    };
  }
})();

// 1-3 Singletons
const userModule = function() {
  const users = [];
  let userId = 0;

  return {
    create(username, password) {
      const user = { id: userId++, username, password };
      users.push(user);

      return user;
    },
    get(username) {
      let targetUser;

      users.forEach(user => {
        if (user.username === username) targetUser = user;
      });

      return targetUser;
    }
  };
};

// 2. Mixin
// example #1
const bird = {
  fly: function() {}
};

const human = {
  walk: function() {}
};

const whale = {
  swim: function() {}
};

eatMixin(bird);
eatMixin(human);
eatMixin(whale);

function eatMixin(animal) {
  animal.eat = function() {};
}

// example #2
function Human() {}

eatMixin(Human.prototype);

function Bird() {}

eatMixin(Bird.prototype);

Bird.prototype.fly = function() {
  alert("I am flying..");
};

function eatMixin(target) {
  target.eat = function() {
    alert("I am eating..");
  };
}

// 3. Pub-Sub: Publish & Subscribe

function createPubSubModule() {
  const subscribers = {};

  function publish(eventName, data) {
    if (!Array.isArray(subscribers[eventName])) return;

    subscribers[eventName].forEach(callback => callback(data));
  }

  function subscribe(eventName, callback) {
    if (!Array.isArray(subscribers[eventName])) subscribers[eventName] = [];

    subscribers[eventName].push(callback);
    const index = subscribers[eventName].length - 1;

    return {
      unsubscribe() {
        subscribers[eventName].splice(index, 1);
      }
    };
  }

  return {
    publish,
    subscribe
  };
}

const pubsubModule = createPubSubModule();

const quizSubscription = pubsubModule.subscribe("daily-quiz", () => {
  console.log("new quiz!");
});

pubsubModule.publish("daily-quiz");

quizSubscription.unsubscribe();
