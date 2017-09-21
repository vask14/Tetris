var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");
var matrixField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var fig = 2;

var scorer = 0;

function drawLines() {
    for (var i = 1; i < 10; i++) {
        ctx.moveTo(i * 32, 0);
        ctx.lineTo(i * 32, 20 * 32);
        ctx.stroke();
    }
    for (var i = 1; i < 20; i++) {
        ctx.moveTo(0, i * 32);
        ctx.lineTo(10 * 32, i * 32);
        ctx.stroke();
    }
}
var k = 0,
    stateChecker = 3;
var figure = [
    [0, 0, 0],
    [1, 1, 1]
];
randomFigureGenerator();

function rotate() {
    while (true) {
        if (k == 3) {
            var matrix = [
                [],
                []
            ];
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 3; j++) {
                    matrix[i][j] = figure[j][i];
                }
            }
            figure = matrix;
            k = 0;
            stateChecker = 3;
            break;
        }
        if (k == 2) {
            var matrix = [
                [],
                [],
                []
            ];
            for (var i = 0; i < 3; i++) {
                var l = 1;
                for (var j = 0; j < 2; j++) {
                    matrix[i][l] = figure[j][i];
                    l--;
                }
            }
            figure = matrix;
            k++;
            stateChecker = 2;
            break;
        }
        if (k == 1) {
            var matrix = [
                [],
                []
            ];
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 3; j++) {
                    matrix[i][j] = figure[j][i];
                }
            }
            figure = matrix;
            k++;
            stateChecker = 1;
            break;
        }
        if (k == 0) {
            var matrix = [
                [],
                [],
                []
            ];
            for (var i = 0; i < 3; i++) {
                var l = 1;
                for (var j = 0; j < 2; j++) {
                    matrix[i][j] = figure[l][i];
                    l--;
                }
            }
            figure = matrix;
            k++;
            stateChecker = 0;
            break;
        }
    }
}

function fill(matrix, m, n) {
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (matrix[i][j] != 0) {
                ctx.fillStyle = "yellow";
                ctx.fillRect((j) * 32, (i) * 32, 32, 32);
            }
        }
    }
}

function action(matrix, m, n) {
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (matrix[i][j] != 0) {
                ctx.fillStyle = "yellow";
                ctx.fillRect((j + x) * 32, (i + y) * 32, 32, 32);
            }
        }
    }
}
var x = 0;
y = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    drawLines();
    scoreChecker();
    if (endGameChecker()) document.getElementById("gameOverField").style.visibility = "visible";
    if (k % 2 == 0) action(figure, 2, 3);
    else action(figure, 3, 2);
    if ((y == 17) && (stateChecker == 0 || stateChecker == 2)) {
        fillMatrix();
        randomFigureGenerator();
    }
    if ((y == 18) && (stateChecker == 1 || stateChecker == 3)) {
        if (stateChecker == 1 && r == 2 && !(matrixField[y + 1][x] == 1 || matrixField[y + 1][x + 1] == 1 || matrixField[y + 1][x + 2] == 1)) y++;
        fillMatrix();
        randomFigureGenerator();
    }
    if (superPuperDuperDifficultChecker()) {
        fillMatrix();
        randomFigureGenerator();
    }
    fillColor();
    invisibleField();
    ctx.closePath();
    ctx.fill();
    requestAnimationFrame(draw);
}
draw();
var time = 500;

function ac() {
    setTimeout(ac, time);
    if (y < 19 && !endGameChecker()) {
        if ((stateChecker == 0 || stateChecker == 2) && y == 17) {} else y++
    }
}
setTimeout(ac, time);
document.body.onkeydown = function(e) {
    if (y < 18 && !endGameChecker()) {
        var KEYCODE_LEFT = 37;
        var KEYCODE_RIGTH = 39;
        var KEYCODE_UP = 38;
        var SecretKeyCode = 71;
        var KEYCODE_SPACE = 32;
        var h = 7;
        var f = 0;
        if (r == 1) f = -1;
        if (r == 2) {
            if (stateChecker == 0) {
                if (x == 9 || x == 8) {
                    KEYCODE_UP = 0;
                }
                h = 9;
            }
            if (stateChecker == 2) {
                if (x == 8) {
                    KEYCODE_UP = 0;
                }
                if (x == 0 || x == -1) {
                    f = -1;
                    KEYCODE_UP = 0;
                }
                h = 8;
            }
        }
        if (r == 3) {
            if (stateChecker == 0) {
                h = 8;
            }
            if (stateChecker == 2) {
                h = 8;
            }
        }
        if (((stateChecker == 0 || stateChecker == 2) && ((x == 7) || (x == 0))) && r == 0) {
            h = 8;
        }
        if (((stateChecker == 0 || stateChecker == 2) && x == 8) && r == 0) KEYCODE_UP = 0;
        if (e.keyCode == KEYCODE_LEFT && x > f) {
            if (r == 0) {
                if ((!(matrixField[y + 1][x - 1] == 1)) && stateChecker == 1) {
                    x -= 1;
                }
                if ((!(matrixField[y][x - 1] == 1)) && stateChecker == 3) {
                    x -= 1;
                }
                if (stateChecker == 2 && !(matrixField[y + 1][x - 1] == 1 || matrixField[y + 2][x - 1] == 1 || matrixField[y][x - 1] == 1)) {
                    x -= 1;
                }
                if (stateChecker == 0 && !(matrixField[y + 1][x - 1] == 1)) {
                    x -= 1;
                }
            }
            if (r == 1) {
                if (!(matrixField[y][x] == 1 || matrixField[y + 1][x] == 1)) {
                    x -= 1;
                }
            }
            if (r == 2) {
                if (stateChecker == 0 && !(matrixField[y][x - 1] == 1 || matrixField[y + 1][x - 1] == 1 || matrixField[y + 2][x - 1] == 1)) x -= 1;
                if (stateChecker == 1 && !(matrixField[y][x - 1] == 1)) x -= 1;
                if (stateChecker == 2 && !(matrixField[y][x] == 1 || matrixField[y + 1][x] == 1 || matrixField[y + 2][x] == 1)) x -= 1;
                if (stateChecker == 3 && !(matrixField[y + 1][x - 1] == 1)) x -= 1;
            }
            if (r == 3) {
                if (stateChecker == 0 && !(matrixField[y][x - 1] == 1 || matrixField[y + 1][x - 1] == 1 || matrixField[y + 2][x - 1] == 1)) x -= 1;
                if (stateChecker == 1 && !(matrixField[y][x - 1] == 1)) x -= 1;
                if (stateChecker == 2 && !(matrixField[y + 2][x - 1] == 1)) x -= 1;
                if (stateChecker == 3 && !(matrixField[y + 1][x - 1] == 1)) x -= 1;
            }
        }
        if (e.keyCode == KEYCODE_RIGTH && x < h) {
            if (r == 0) {
                if (!(matrixField[y + 1][x + 3] == 1) && stateChecker == 1) {
                    x += 1;
                }
                if (!(matrixField[y][x + 3] == 1) && stateChecker == 3) {
                    x += 1;
                }
                if (!(matrixField[y + 1][x + 2] == 1) && stateChecker == 2) {
                    x += 1;
                }
                if (!((matrixField[y][x + 2] == 1 || matrixField[y + 1][x + 2] == 1 || matrixField[y + 2][x + 2] == 1)) && stateChecker == 0) {
                    x += 1;
                }
            }
            if (r == 1) {
                if (!(matrixField[y][x + 3] == 1 || matrixField[y + 1][x + 3] == 1)) x += 1;
            }
            if (r == 2) {
                if (stateChecker == 0 && !(matrixField[y][x + 1] == 1 || matrixField[y + 1][x + 1] == 1 || matrixField[y + 2][x + 1] == 1)) x += 1;
                if (stateChecker == 1 && !(matrixField[y][x + 3] == 1)) x += 1;
                if (stateChecker == 2 && !(matrixField[y][x + 2] == 1 || matrixField[y + 1][x + 2] == 1 || matrixField[y + 2][x + 2] == 1)) x += 1;
                if (stateChecker == 3 && !(matrixField[y + 1][x + 3] == 1)) x += 1;
            }
            if (r == 3) {
                if (stateChecker == 0 && !(matrixField[y + 2][x + 2] == 1)) x += 1;
                if (stateChecker == 1 && !(matrixField[y][x + 3] == 1 || matrixField[y + 1][x + 3])) x += 1;
                if (stateChecker == 2 && !(matrixField[y][x + 2] == 1 || matrixField[y + 1][x + 2] == 1 || matrixField[y + 2][x + 2] == 1)) x += 1;
                if (stateChecker == 3 && !(matrixField[y][x + 3] == 1 || matrixField[y + 1][x + 3] == 1)) x += 1;
            }
        }
        if (e.keyCode == KEYCODE_UP) {
            if (r == 0) {
                if (!((stateChecker == 0 && (matrixField[y + 1][x - 1] == 1)) ||
                        (stateChecker == 2 && (matrixField[y + 1][x - 1] == 1 || matrixField[y + 2][x - 1] == 1 || matrixField[y][x - 1] == 1)) ||
                        ((matrixField[y + 1][x + 2] == 1) && stateChecker == 2) ||
                        (((matrixField[y][x + 2] == 1 || matrixField[y + 1][x + 2] == 1 || matrixField[y + 2][x + 2] == 1)) && stateChecker == 0))) rotate();
            }
            if (r == 2) {
                if (!(stateChecker == 0 && (matrixField[y][x - 1] == 1 || matrixField[y + 1][x - 1] == 1 || matrixField[y + 2][x - 1] == 1)) &&
                    !(stateChecker == 0 && (matrixField[y][x + 1] == 1 || matrixField[y + 1][x + 1] == 1 || matrixField[y + 2][x + 1] == 1)) &&
                    !(stateChecker == 2 && (matrixField[y][x] == 1 || matrixField[y + 1][x] == 1 || matrixField[y + 2][x] == 1)) &&
                    !(stateChecker == 2 && (matrixField[y][x + 2] == 1 || matrixField[y + 1][x + 2] == 1 || matrixField[y + 2][x + 2] == 1))) rotate();
            }
            if (r == 3) {
                if ((!(x == 8 && (stateChecker == 0 || stateChecker == 2))) &&
                    !(matrixField[y + 2][x + 2] == 1) ||
                    stateChecker == 2 && !(matrixField[y][x + 2] == 1 || matrixField[y + 1][x + 2] == 1 || matrixField[y + 2][x + 2] == 1)) rotate();
            }
        }
        if (e.keyCode == SecretKeyCode) {
            matrixField[3][0] = 1;
        }
        if (e.keyCode == KEYCODE_SPACE) {
            time = 20;
        }
    }
}

function superPuperDuperDifficultChecker() {
    if (stateChecker == 0) {
        for (var i = 0; i < 2; i++) {
            if ((matrixField[y + 3][x + i] == 1 && figure[2][i] == 1) || (matrixField[y + 2][x] == 1 && figure[1][0])) {
                return true;
            }
        }
        return false;
    }
    if (stateChecker == 1) {
        if (r != 2 && r != 3) {
            for (var i = 0; i < 3; i++) {
                if ((matrixField[y + 2][x + i] == 1 && figure[1][i] == 1)) {
                    return true;
                }
            }
            return false;
        }
        if (r == 2) {
            for (var i = 0; i < 3; i++) {
                if (matrixField[y + 1][x + i] == 1 && figure[0][i] == 1) return true;
            }
            return false;
        }
        if (r == 3) {
            if (matrixField[y + 2][x + 2] == 1 && figure[1][2] == 1) return true;
            for (var i = 0; i < 2; i++) {
                if (matrixField[y + 1][x + i] == 1 && figure[0][i] == 1) return true;
            }
            return false;
        }
    }
    if (stateChecker == 2) {
        for (var i = 0; i < 2; i++) {
            if ((matrixField[y + 3][x + i] == 1 && figure[2][i] == 1) || (matrixField[y + 2][x + 1] == 1 && figure[1][1])) {
                return true;
            }
        }
        return false;
    }
    if (stateChecker == 3) {
        for (var i = 0; i < 3; i++) {
            if ((matrixField[y + 2][x + i] == 1 && figure[1][i] == 1) || (matrixField[y + 1][x] == 1 && figure[0][0] == 1) || (matrixField[y + 1][x + 2] == 1 && figure[0][2] == 1)) {
                return true;
            }
        }
        return false;
    }
}

function fillMatrix() {
    if (stateChecker == 0) {
        var k = 0;
        for (var i = 0; i < 3; i++) {
            var k1 = 0;
            for (var j = 0; j < 2; j++) {
                if (matrixField[y + k][x + k1] != 1) {
                    matrixField[y + k][x + k1] = figure[i][j];
                }
                k1++;
            }
            k++;
        }
    }
    if (stateChecker == 1) {
        if (r != 2) {
            var k = 0;
            for (var i = 0; i < 3; i++) {
                var k1 = 0;
                for (var j = 0; j < 2; j++) {
                    if (matrixField[y + k1][x + k] != 1) {
                        matrixField[y + k1][x + k] = figure[j][i];
                    }
                    k1++;
                }
                k++;
            }
        } else {
            for (var i = 0; i < 3; i++) {
                matrixField[y][x + i] = figure[0][i];
            }
        }
    }
    if (stateChecker == 2) {
        var k = 0;
        for (var i = 0; i < 3; i++) {
            var k1 = 0;
            for (var j = 0; j < 2; j++) {
                if (matrixField[y + k][x + k1] != 1) {
                    matrixField[y + k][x + k1] = figure[i][j];
                }
                k1++;
            }
            k++;
        }
    }
    if (stateChecker == 3) {
        var k = 0;
        for (var i = 0; i < 3; i++) {
            var k1 = 0;
            for (var j = 0; j < 2; j++) {
                if (matrixField[y + k1][x + k] != 1) {
                    matrixField[y + k1][x + k] = figure[j][i];
                }
                k1++;
            }
            k++;
        }
    }
}

function fillColor() {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            if (matrixField[i][j] != 0) {
                ctx.fillStyle = "deeppink";
                ctx.fillRect((j) * 32, (i) * 32, 32, 32);
            }
        }
    }
}

function randomFigureGenerator() {
    time = p;
    r = Math.floor((Math.random() * 4));
    if (r == 0) figure = [
        [1, 1, 1],
        [0, 1, 0]
    ];
    if (r == 1) figure = [
        [0, 1, 1],
        [0, 1, 1]
    ];
    if (r == 2) figure = [
        [0, 0, 0],
        [1, 1, 1]
    ];
    if (r == 3) figure = [
        [0, 0, 1],
        [1, 1, 1]
    ];
    k = 0;
    stateChecker = 3;
    y = 0;
    x = Math.floor((Math.random() * 7) + 1)
}

function endGameChecker() {
    for (var i = 0; i < 10; i++) {
        if (matrixField[3][i] == 1) return true;
    }
    return false;
}

function startNewGame() {
    document.getElementById("gameOverField").style.visibility = "hidden";
    scorer = 0;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 20; j++) matrixField[j][i] = 0;
    }
    randomFigureGenerator();
}
var p = 500;

function scoreChecker() {
    for (var i = 19; i > 4; i--) {
        var s = 0;
        for (var j = 0; j < 10; j++) {
            if (matrixField[i][j] == 1) s++;
        }
        if (s == 10) {
            for (var j = 0; j < 10; j++) {
                matrixField[i][j] = 0;
            }
            matrixSlide(i);
            scorer += 1;
            if (scorer % 5 == 0) p -= p * 0.3;
            document.getElementById("scorer").innerText = scorer;
        }
    }
};

function matrixSlide(u) {
    for (var i = u; i > 4; i--) {
        for (var j = 0; j < 10; j++) {
            matrixField[i][j] = matrixField[i - 1][j];
        }
    }
};

function invisibleField() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 10; j++) {
            ctx.fillStyle = "white";
            ctx.fillRect((j) * 32, (i) * 32, 32, 32);
        }
    }
}