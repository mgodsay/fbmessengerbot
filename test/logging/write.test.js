// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var test = require('ava');
var writeExample = require('../../logging/write');

test.cb('should write entries', function (t) {
  writeExample.main(function (err, results) {
    if (err && err.code === 404) {
      return t.end();
    }
    t.ifError(err);
    t.is(results.length, 2, 'should have two results');
    t.end();
  });
});
