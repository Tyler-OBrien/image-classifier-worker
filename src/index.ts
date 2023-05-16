import str from "string-to-stream";
import { PNG } from "pngjs/browser";

import { imagenetClasses } from "./imagenet";
import { Tensor, run } from "@cloudflare/constellation";


const HTML = `<!DOCTYPE html>
<html>
  <head>
    <title>WHAT IS THIS IMAGE!?!?!?!</title>
  </head>
  <body>
    <h1>Supercloud, what is this image?</h1>
    <form id="uploadForm">
    <input accept="image/*" type="file" name="logo" id="upload" /> <br />
	  <pre id="response">Feed me a png</pre> <br />
      <button type="submit">Upload</button> <br />
      <img id="myImg" src="#" alt="your image"  height="20%" width="20%"/>     <br />
      </form>
    <script>
    'use strict';

if (typeof exports === "undefined") {
    var exports = {};
}

if (typeof module === "undefined") {
   var module = {};
}

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var hasBlobConstructor = typeof Blob !== 'undefined' && (function () {
    try {
        return Boolean(new Blob());
    } catch (e) {
        return false;
    }
})();

var hasArrayBufferViewSupport = hasBlobConstructor && typeof Uint8Array !== 'undefined' && (function () {
    try {
        return new Blob([new Uint8Array(100)]).size === 100;
    } catch (e) {
        return false;
    }
})();

var hasToBlobSupport = typeof HTMLCanvasElement !== "undefined" ? HTMLCanvasElement.prototype.toBlob : false;

var hasBlobSupport = hasToBlobSupport || typeof Uint8Array !== 'undefined' && typeof ArrayBuffer !== 'undefined' && typeof atob !== 'undefined';

var hasReaderSupport = typeof FileReader !== 'undefined' || typeof URL !== 'undefined';

var ImageTools = (function () {
    function ImageTools() {
        _classCallCheck(this, ImageTools);
    }

    _createClass(ImageTools, null, [{
        key: 'resize',
        value: function resize(file, maxDimensions, callback) {
            if (typeof maxDimensions === 'function') {
                callback = maxDimensions;
                maxDimensions = {
                    width: 640,
                    height: 480
                };
            }

            var maxWidth = maxDimensions.width;
            var maxHeight = maxDimensions.height;

            if (!ImageTools.isSupported() || !file.type.match(/image.*/)) {
                callback(file, false);
                return false;
            }


            var image = document.createElement('img');

            image.onload = function (imgEvt) {
                var width = 224;
                var height = 224;
                var isTooLarge = true;

                if (!isTooLarge) {
                    // early exit; no need to resize
                    callback(file, false);
                    return;
                }

                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                var ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);

                if (hasToBlobSupport) {
                    canvas.toBlob(function (blob) {
                        callback(blob, true);
                    }, file.type);
                } else {
                    var blob = ImageTools._toBlob(canvas, file.type);
                    callback(blob, true);
                }
            };
            ImageTools._loadImage(image, file);

            return true;
        }
    }, {
        key: '_toBlob',
        value: function _toBlob(canvas, type) {
            var dataURI = canvas.toDataURL(type);
            var dataURIParts = dataURI.split(',');
            var byteString = undefined;
            if (dataURIParts[0].indexOf('base64') >= 0) {
                // Convert base64 to raw binary data held in a string:
                byteString = atob(dataURIParts[1]);
            } else {
                // Convert base64/URLEncoded data component to raw binary data:
                byteString = decodeURIComponent(dataURIParts[1]);
            }
            var arrayBuffer = new ArrayBuffer(byteString.length);
            var intArray = new Uint8Array(arrayBuffer);

            for (var i = 0; i < byteString.length; i += 1) {
                intArray[i] = byteString.charCodeAt(i);
            }

            var mimeString = dataURIParts[0].split(':')[1].split(';')[0];
            var blob = null;

            if (hasBlobConstructor) {
                blob = new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], { type: mimeString });
            } else {
                var bb = new BlobBuilder();
                bb.append(arrayBuffer);
                blob = bb.getBlob(mimeString);
            }

            return blob;
        }
    }, {
        key: '_loadImage',
        value: function _loadImage(image, file, callback) {
            if (typeof URL === 'undefined') {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    image.src = evt.target.result;
                    if (callback) {
                        callback();
                    }
                };
                reader.readAsDataURL(file);
            } else {
                image.src = URL.createObjectURL(file);
                if (callback) {
                    callback();
                }
            }
        }
    }, {
        key: 'isSupported',
        value: function isSupported() {
            return typeof HTMLCanvasElement !== 'undefined' && hasBlobSupport && hasReaderSupport;
        }
    }]);
    globalThis.ImageTools = ImageTools;
    return ImageTools;
})();

exports['default'] = ImageTools;
module.exports = exports['default'];
</script>
    <script>
    const messages = [ "Calculating....", "Inspecting...", "The hamster is spinning...", "Loading...", "Just a bit longer...", "This better not be a virus...", "One moment please...", "Patience is a virtue...", "First, we will identify your pictures, then we will take your job...", "Inspecting every inch...", "Please give me something better then random screenshots and animals...", "You will receive the result in the mail in 7-10 business days...", "The result is currently being faxed to you...", " Loading... Please insert one bitcoin to continue...", "Uploading pictures of purchased NFTs will result in self-destruction.....", "Loading.. would you like to turn this image into a NFT? Limited time deal, 10 supercloud coins today...", "Loading... we let you select the image even the supercloud already has full access...", "Loading... insert 5 supercoins to speed up the process..." ]
    upload.onchange = evt => {
        const [file] = upload.files
        if (file) {
        myImg.src = URL.createObjectURL(file)
        }
      }
      document.getElementById('uploadForm').addEventListener('submit', async function (event) 
      {
        var randomNumber = Math.floor(Math.random()*messages.length);
        document.getElementById('response').textContent  = messages[randomNumber];
        event.preventDefault();
        var fileInput = document.getElementById('upload');
        var file = fileInput.files[0];
        globalThis.ImageTools.resize(file, {
            width: 224, 
            height: 224 
        }, async function(blob, didItResize) {
            myImg.src = URL.createObjectURL(file)

            var formData = new FormData();
            formData.append('file', blob);
            
            var tryGetResponse = await fetch('/', {method:'POST', body:formData});
            var tryGetText = await tryGetResponse.text();
            try {
                var json = JSON.parse(tryGetText);
                document.getElementById('response').textContent = JSON.stringify(json, null, 4);
                if (json.err) {
                    if (json.err.includes("Invalid file signature")) {
                        document.getElementById('response').textContent = "Invalid file signature. Please try again. This is usually because you're trying to upload a Png, not a jpg :(";
                    }
                }
                return;
            } catch (e) {
            /* nom */
            }
            document.getElementById('response').textContent = tryGetText;
        });
      });
    </script>
  </body>
</html>`


export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (request.method === "GET") {
            return new Response(HTML, {
                headers: { "content-type": "text/html;charset=UTF-8" },
            });
        }
        const formData = await request.formData();
        const file = formData.get("file") as unknown as File;
        if (file) {
            const data = await file.arrayBuffer();
            const result = await processImage(env, data);
            return new Response(JSON.stringify(result));
        } else {
            return new Response("nothing to see here");
        }
    },
};

async function processImage(env: Env, data: ArrayBuffer) {
    let result;

    const input = await decodeImage(data).catch((err) => {
        result = err;
    });

    if (input) {
        const tensorInput = new Tensor("float32", [1, 3, 224, 224], input);

        const output = await run(
            env.CLASSIFIER,
            // Replace this with your actual model ID generated when you created your Constellation project
            "ee7ee6b8-e11f-4bc1-8c27-d7c356e8412a",
            tensorInput
        );

        const predictions = output.squeezenet0_flatten0_reshape0.value;
        const softmaxResult = softmax(predictions);
        const results = topClasses(softmaxResult, 5);

        result = results[0];
    }

    return result;
}

/* The model expects input images normalized in the same way, i.e. mini-batches of 3-channel RGB images
   of shape (N x 3 x H x W), where N is the batch size, and H and W are expected to be 224. */

async function decodeImage(
    buffer: ArrayBuffer,
    width: number = 224,
    height: number = 224
): Promise<any> {
    return new Promise(async (ok, err) => {
        // convert string to stream
        const stream: any = str(buffer as unknown as string);

        stream
            .pipe(
                new PNG({
                    filterType: 4,
                })
            )
            .on("parsed", function (this: any) {
                if (this.width != width || this.height != height) {
                    err({
                        err: `expected width to be ${width}x${height}, given ${this.width}x${this.height}`,
                    });
                } else {
                    const [redArray, greenArray, blueArray] = new Array(
                        new Array<number>(),
                        new Array<number>(),
                        new Array<number>()
                    );

                    for (let i = 0; i < this.data.length; i += 4) {
                        redArray.push(this.data[i] / 255.0);
                        greenArray.push(this.data[i + 1] / 255.0);
                        blueArray.push(this.data[i + 2] / 255.0);
                        // skip data[i + 3] to filter out the alpha channel
                    }

                    const transposedData = redArray
                        .concat(greenArray)
                        .concat(blueArray);
                    ok(transposedData);
                }
            })
            .on("error", function (error: any) {
                err({ err: error.toString() });
            });
    });
}

// Refer to https://en.wikipedia.org/wiki/Softmax_function
// Transforms values to between 0 and 1
// The sum of all outputs generated by softmax is 1.

function softmax(resultArray: number[]): any {
    const largestNumber = Math.max(...resultArray);
    const sumOfExp = resultArray
        .map((resultItem) => Math.exp(resultItem - largestNumber))
        .reduce((prevNumber, currentNumber) => prevNumber + currentNumber);
    return resultArray.map((resultValue) => {
        return Math.exp(resultValue - largestNumber) / sumOfExp;
    });
}

/* Get the top n classes from ImagetNet */

export function topClasses(classProbabilities: any, n = 5) {
    const probabilities = ArrayBuffer.isView(classProbabilities)
        ? Array.prototype.slice.call(classProbabilities)
        : classProbabilities;

    const sorted = probabilities
        .map((prob: any, index: number) => [prob, index])
        .sort((a: Array<number>, b: Array<number>) => {
            return a[0] == b[0] ? 0 : a[0] > b[0] ? -1 : 1;
        });

    const top = sorted.slice(0, n).map((probIndex: Array<number>) => {
        const iClass = imagenetClasses[probIndex[1]];
        return {
            id: iClass[0],
            index: parseInt(probIndex[1].toString(), 10),
            name: iClass[1].replace(/_/g, " "),
            probability: probIndex[0],
        };
    });

    return top;
}

export interface Env {
    CLASSIFIER: any;
}