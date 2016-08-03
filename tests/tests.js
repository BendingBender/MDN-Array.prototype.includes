var expect = require("chai").expect;

function runTests(includes) {
  var sparseish = {length: 5, 0: 'a', 1: 'b'};
  var overfullarrayish = {length: 2, 0: 'a', 1: 'b', 2: 'c'};
  var thrower = {
    valueOf: function () {
      throw new RangeError('whoa');
    }
  };
  var numberish = {
    valueOf: function () {
      return 2;
    }
  };

  describe('Array#includes', function () {

    it('simple examples', function () {
      expect(includes.call([1, 2, 3], 1)).to.equal(true);
      expect(includes.call([1, 2, 3], 4)).to.equal(false);
      expect(includes.call([NaN], NaN)).to.equal(true);
    });

    it('does not skip holes', function () {
      expect(includes.call(Array(1))).to.equal(true);
    });

    describe('exceptions', function () {
      it('fromIndex conversion', function () {
        expect(includes.bind([0], 0, thrower)).to.throw(RangeError);
      });

      it('ToLength', function () {
        expect(includes.bind({length: thrower, 0: true}, true)).to.throw(RangeError);
      });

    });

    it('works with arraylikes', function () {
      expect(includes.call(sparseish, 'a')).to.equal(true);
      expect(includes.call(sparseish, 'c')).to.equal(false);

      expect(includes.call(overfullarrayish, 'b')).to.equal(true);
      expect(includes.call(overfullarrayish, 'c')).to.equal(false);
    });

    describe('fromIndex', function () {
      it('NaN fromIndex -> 0 fromIndex', function () {
        expect(includes.call([1], 1, NaN)).to.equal(true);
      });

      it('number coercion', function () {
        expect(includes.call(['a', 'b', 'c'], 'a', numberish)).to.equal(false);
        expect(includes.call(['a', 'b', 'c'], 'a', '2')).to.equal(false);
        expect(includes.call(['a', 'b', 'c'], 'c', numberish)).to.equal(true);
        expect(includes.call(['a', 'b', 'c'], 'c', '2')).to.equal(true);
      });

      it('fromIndex greater than length', function () {
        expect(includes.call([1], 1, 2)).to.equal(false);
        expect(includes.call([1], 1, 1)).to.equal(false);
        expect(includes.call([1], 1, 1.1)).to.equal(false);
        expect(includes.call([1], 1, Infinity)).to.equal(false);
      });

      describe('negative fromIndex', function () {
        it('negative computed length', function () {
          expect(includes.call([1, 3], 1, -4)).to.equal(true);
          expect(includes.call([1, 3], 3, -4)).to.equal(true);
          expect(includes.call([1, 3], 1, -Infinity)).to.equal(true);
        });

        it('actually searches for positive computed lengths', function () {
          expect(includes.call([12, 13], 13, -1)).to.equal(true);
          expect(includes.call([12, 13], 12, -1)).to.equal(false);
          expect(includes.call([12, 13], 13, -2)).to.equal(true);

          expect(includes.call(sparseish, 'b', -4)).to.equal(true);
          expect(includes.call(sparseish, 'a', -4)).to.equal(false);
          expect(includes.call(sparseish, 'a', -5)).to.equal(true);
        });
      });
    });
  });
}

module.exports = function run(requireTestee) {
  var origIncludes,
    implementation;

  origIncludes = Array.prototype.includes;
  delete Array.prototype.includes;

  requireTestee();

  implementation = Array.prototype.includes;
  if (origIncludes) {
    Array.prototype.includes = origIncludes;
  } else {
    delete Array.prototype.includes;
  }

  runTests(implementation);
};

