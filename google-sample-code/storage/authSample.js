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

/**
 * @fileoverview Sample code that grabs default credentials from the
 * environment, then uses it to make an api call.
 */
'use strict';

var google = require('googleapis');

/**
 * Callback for remote requests.
 *
 * @callback requestCallback
 * @param {Object} err - if there's an error with the request, this is pass
 * through to the callback.
 * @param {Object} response - the response for the request.
 */

/**
 * Fetches a list of the buckets under the given project id.
 *
 * @param {String} projectId - The project id that owns the buckets.
 * @param {requestCallback} cb - A function to be called when the server
 *     responds with the list of buckets.
 */
// [START list_buckets]
function listBucketsExample(projectId, callback) {
  google.auth.getApplicationDefault(function(err, authClient) {
    if (err) {
      return callback(err);
    }

    // Depending on the environment that provides the default credentials
    // (e.g. Compute Engine, App Engine), the credentials retrieved may require
    // you to specify the scopes you need explicitly.
    // Check for this case, and inject the Cloud Storage scope if required.
    if (authClient.createScopedRequired &&
        authClient.createScopedRequired()) {
      authClient = authClient.createScoped(
          ['https://www.googleapis.com/auth/devstorage.read_write']);
    }

    // Create the service object.
    var storage = google.storage('v1');

    // Make the api call to list the buckets.
    storage.buckets.list({
      auth: authClient,
      project: projectId
    }, function (err, response) {
      if (err) {
      return callback(err);
    }

      console.log('Found ' + response.items.length + ' buckets');
      callback(null, response);
    });
  });
}
// [END list_buckets]

// Run the samples
exports.main = function (projectId, cb) {
  listBucketsExample(projectId, cb || function (err, response) {
    console.log(err, response.items);
  });
};

if (module === require.main) {
  exports.main(process.argv.slice(2).shift());
}
