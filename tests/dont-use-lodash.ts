// @ts-expect-error no types
import _ from 'lodash';

console.log(_.get({a: {b: 1}}, 'a.b')); // 1
console.log(_.size(1)); // 1
