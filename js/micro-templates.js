var _tmplCache = {}
this.parseTemplate = function(str, data) {
  var err = "";
  try {
    var func = _tmplCache[str];
    if (!func) {
      var strFunc =
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        //                        str
        //                  .replace(/[\r\t\n]/g, " ")
        //                  .split("<#").join("\t")
        //                  .replace(/((^|#>)[^\t]*)'/g, "$1\r")
        //                  .replace(/\t=(.*?)#>/g, "',$1,'")
        //                  .split("\t").join("');")
        //                  .split("#>").join("p.push('")
        //                  .split("\r").join("\\'") + "');}return p.join('');";

        str.replace(/[\r\t\n]/g, " ")
        .replace(/'(?=[^#]*#>)/g, "\t")
        .split("'").join("\\'")
        .split("\t").join("'")
        .replace(/<#=(.+?)#>/g, "',$1,'")
        .split("<#").join("');")
        .split("#>").join("p.push('")
        + "');}return p.join('');";

      //alert(strFunc);
      func = new Function("obj", strFunc);
      _tmplCache[str] = func;
    }
    return func(data);
  } catch (e) { err = e.message; }
  return "< # ERROR: " + err.htmlEncode() + " # >";
}