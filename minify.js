var fs = require('fs');
var UglifyJS = require("uglify-js");

var dirname = './public';
var path = dirname + '/minified.js';

if (fs.existsSync(dirname)) {

    fs.readdir(dirname, function (err, filenames) {

        if (err) {
            console.log(err)
        }

        filenames.forEach(function (filename) {
            fs.readFile(dirname + '/' + filename, 'utf-8', function (err, content) {

                if (err) {
                    console.log(err)
                }

                // advance UglifyJS configuration
                var result = UglifyJS.minify(content, {
                    parse: {},
                    compress: true,
                    mangle: true,
                    output: {
                        ast: true,
                        code: true // optional - faster if false
                    },
                    ie8: true,
                    keep_fnames: true
                });

                // console.log(result.error); // runtime error, or `undefined` if no error
                // console.log(result.code); // minified output: function add(n,d){return n+d}

                // Async variant
                // fs.writeFile('final.js', result.code, {
                //     flag: "a"
                // }, (err) => {
                //     if (err) {
                //         console.log(err)
                //     }
                //     console.log('The file has been saved!');
                // });

                // Sync variant 
                return fs.writeFileSync(path, result.code, {
                    flag: "a" // Open file for appending. The file is created if it does not exist.
                });

            });
        });
    });

}

if (fs.existsSync(path)) {
    console.log('File exists already!');
} else {
    console.log('Unable to find public folder! Please make sure it exits.');
}