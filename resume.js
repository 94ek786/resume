function resume() {
    document.getElementById('summary').innerHTML = '<p></p><h1>陳柏翰</h1><p></p>\
    擅長的程式語言：' + major + '<p></p>\
    學過的程式語言：' + learned + '<p></p>\
    學過的工具：' + tool + '<p></p>\
    <div style="font-size: 26px;">簡歷：</div>' + autobiography + '\
    ';
}

function loops(loop) {
    i = document.getElementById('portfolio')
    i.innerHTML = i.innerHTML + '\
            <section class="container">\
                <hr>\
                <div class="row align-items-center" id="p' + loop + '">\
                </div>\
            </section>\
        ';

    fetch('./portfolio/' + loop + '/info.json').then((response) => response.json()).then((json) => {

        console.log(json.title);

        document.getElementById('p' + loop).innerHTML = '\
        <img class="col-md-3" src="./portfolio/' + loop + '/img.png">\
        <div class="col-md-8"><a href="./portfolio/' + loop + '/index.html" style="text-decoration:none;"><div><h3>' + json.title + '</h3><div style="color:black;"><p></p>' + json.description + '<p></p>' + json.content + '</div></div></a></div><div class="col-md-1" id="G' + loop + '"></div>';

        if (typeof json.github !== 'undefined') {
            document.getElementById('G' + loop).innerHTML = '<a class="btn btn-outline-secondary" href="' + json.github + '">原始碼</a>';
        }

        //好討厭遞迴==
        loops(loop + 1);
    }).catch(function() {
        console.log('true')
        return true;
    });
}

var major;
var learned;
var tool;
var autobiography;

function main() {
    loops(1);

    fetch('./resume.json').then((response) => response.json()).then((json) => {
        major = json.major;
        learned = json.learned;
        tool = json.tool;
        autobiography = json.autobiography;
        resume();
    });
}