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
var proxyquire = require('proxyquire').noPreserveCache();
process.env.SENDGRID_API_KEY = 'foo';

test.cb('should send an email', function (t) {
  proxyquire('../../computeengine/sendgrid.js', {
    sendgrid: function (key) {
      t.is(key, 'foo');
      return {
        send: function (payload, cb) {
          t.same(payload, {
            from: 'ANOTHER_EMAIL@ANOTHER_EXAMPLE.COM',
            to: 'EMAIL@EXAMPLE.COM',
            subject: 'test email from Node.js on Google Cloud Platform',
            text: 'Hello!\n\nThis a test email from Node.js.'
          });
          cb('done');
          t.end();
        }
      };
    }
  });
});
