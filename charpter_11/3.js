'use strict';
(function () {
  const obj = { age: 18 };
  function people() {
    console.log(this.age);
    function student() {
      obj.age++;
      console.log(obj.age);
    }
    return student;
  }
  // eslint-disable-next-line no-useless-call
  people.call(null, { age: 20 })();
  // eslint-disable-next-line no-useless-call
  people.apply(null, [obj])();
})();
