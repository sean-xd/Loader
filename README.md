#loader
This is a module loader that saves the content of CSS and JS files to localStorage so that if the version in the HTML is the same as the version you have already you don't have to download the same file every time you visit the site.

###gulpfile.js
This is intended to be used with gulp. Here is an example gulpfile.

```javascript
var gulp = require("gulp"),
    concat = require("gulp-concat"),
    babel = require("gulp-babel"),
    replace = require("gulp-replace"),
    src = {
        html: "src/index.html",
        js: ["src/index.js", "src/lib/*.js", "src/routes/**/*.js"],
        css: ["src/main.css", "src/routes/**/*.css"]
    },
    ver = {script: Date.now(), style: Date.now()},
    loader = require("./loader.js"),
    html = () => {
        return gulp.src(src.html)
            .pipe(replace("/*loader*/", loader(ver)))
            .pipe(gulp.dest("build/"))
    }

gulp.task("html", html);
gulp.task("js", () => {
    ver.script = Date.now();
    return gulp.src(src.js)
        .pipe(concat("build.js"))
        .pipe(babel())
        .pipe(gulp.dest("build/"))
});
gulp.task("css", () => {
    ver.style = Date.now();
    return gulp.src(src.css)
        .pipe(concat("build.css"))
        .pipe(gulp.dest("build/"))
});

//You need these to update the hard coded versions in the html.
gulp.task("jshtml", ["js"], html);
gulp.task("csshtml", ["css"], html);

gulp.task("default", ["html", "js", "css"], () => {
    gulp.watch(src.html, ["html"]);
    gulp.watch(src.js, ["jshtml"]);
    gulp.watch(src.css, ["csshtml"]);
});
```

###index.html
You need to aim the replacer at a script tag like so.

```html
<html>
    <head></head>
    <body>
        <nav></nav>
        <div class="side"></div>
        <div class="stage"></div>
    </body>
    <script id="loader">(function(){/*loader*/})();</script>
</html>
```