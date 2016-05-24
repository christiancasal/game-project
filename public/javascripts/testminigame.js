var init;
var k = 0;
var gameTime = 30;
var playerName = playerRef.character;
console.log('this is playerName: ', playerName);
var charNoUnderscore = playerName.replace(/\s/g, '_');
console.log('this is charNoUnderscore: ', charNoUnderscore);

var enemyName = enemyRef.character;
console.log('this is enemyName: ', enemyName);
var enemyNoUnderscore = enemyName.replace(/\s/g, '_');
console.log('this is enemyNoUnderscore: ', enemyNoUnderscore);

function startMinigame(_player, _enemy, battlestate){

    var enemyInitialHealthString = $('#enemy-health').html();
    var enemyInitialHealthInt = parseInt(enemyInitialHealthString); //THIS NEEDS TO BE UPDATED WHEN DB IS UPDATED WITH ALL ENEMY STATS
    var isGameOver = false;
    timer = setInterval(function(){
        gameTime--;
    }, 1000)
    _player.health = parseInt(_player.health);
    _player.defense = parseInt(_player.defense);
    _player.attack = parseInt(_player.attack);
    _player.ROF = parseInt(_player.ROF);

    _enemy.health = parseInt(_enemy.health);
    _enemy.defense = parseInt(_enemy.defense);
    _enemy.attack = parseInt(_enemy.attack);
    _enemy.ROF = parseInt(_enemy.ROF);

var CANVAS_WIDTH = 800; //1200
var CANVAS_HEIGHT = 350;
var FPS = 30;
var lastFire = Date.now();
$('#action-view').append('<h3 id="timer">' + gameTime + '</h3>')

var player = {
// color: "#00A",
x: 120,
y: 160,
width: 50,
height: 80,
draw: function() {
  // canvas.fillStyle = this.color;
  // canvas.fillRect(this.x, this.y, this.width, this.height);
},
drawUp: function() {
  player.sprite.draw(canvas, this.x, this.y);
  player.sprite = Sprite(charNoUnderscore+"-up");

  canvas.fillStyle = this.sprite;
  canvas.rect(this.x, this.y, this.width, this.height);
},
drawDown: function() {
  player.sprite.draw(canvas, this.x, this.y);
  player.sprite = Sprite(charNoUnderscore+"-down");
  canvas.fillStyle = this.sprite;
  canvas.rect(this.x, this.y, this.width, this.height);
},
drawLeft: function() {
  player.sprite.draw(canvas, this.x, this.y);
  player.sprite = Sprite(charNoUnderscore+"-left");
  canvas.fillStyle = this.sprite;
  canvas.rect(this.x, this.y, this.width, this.height);
},
drawRight: function() {
  player.sprite.draw(canvas, this.x, this.y);
  player.sprite = Sprite(charNoUnderscore+"-right");
  canvas.fillStyle = this.sprite;
  canvas.rect(this.x, this.y, this.width, this.height);
},
drawSpace: function() {
  player.sprite.draw(canvas, this.x, this.y);
  player.sprite = Sprite(charNoUnderscore+"-shoot");
  canvas.fillStyle = this.sprite;
  canvas.rect(this.x, this.y, this.width, this.height);
},
drawStand: function() {
  player.sprite.draw(canvas, this.x, this.y);
  player.sprite = Sprite(charNoUnderscore+"-stand");
  canvas.fillStyle = this.sprite;
  canvas.rect(this.x, this.y, this.width, this.height);
},
};

player.sprite = Sprite(charNoUnderscore+"-stand");

// player.drawStand = function() {
//   this.sprite.draw(canvas, this.x, this.y);
// };

var bossContainer = [];

function Boss(I) {
    I = I || {};

    I.active = true;
    I.age = Math.floor(Math.random() * 128);

    I.color = "#A2B";

    I.x = 720
    I.y = 130;
    I.xVelocity = 0
    I.yVelocity = 2;

    I.width = 60;
    I.height = 111;

    I.inBounds = function() {
      return I.x >= 0 && I.x <= CANVAS_WIDTH &&
      I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.sprite = Sprite(enemyNoUnderscore+"-boss");

  I.draw = function() {
      this.sprite.draw(canvas, this.x, this.y);
  };

  I.update = function() {
      I.x -= I.xVelocity;
      I.y -= I.yVelocity;

      I.yVelocity = 3 * Math.sin(I.age * Math.PI / 64);

      I.age++;

      I.active = I.active && I.inBounds();
  };

  I.explode = function() {

      this.active = false;
  };

  return I;
}

bossContainer.push(Boss());



var playerBullets = [];

function Bullet(I) {

    I = I || {};

    I.active = true;

    I.yVelocity = 0;
    I.xVelocity = I.speed;
    I.width = 50;
    I.height =50;
    I.color = "blue";
    I.sprite = Sprite(charNoUnderscore+"-bullet");

    I.inBounds = function() {
      return I.x >= 0 && I.x <= CANVAS_WIDTH &&
      I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };



  I.draw = function() {
      this.sprite.draw(canvas, this.x, this.y);
  };

  I.update = function() {
      I.x += I.xVelocity;
      I.y += I.yVelocity;

      I.active = I.active && I.inBounds();
  };

  I.explode = function() {
      this.active = false;

  };

  return I;
}

enemies = [];

function Enemybullet(I) {
    I = I || {};

    I.active = true;
    I.age = Math.floor(Math.random() * 128);

    I.color = "#A2B";

    var xAxis;
    var yAxis;

    bossContainer.forEach(function(boss) {
      xAxis = boss.x;
      yAxis = boss.y + boss.height / 4;
  });


    I.x = xAxis;
    I.y = yAxis;

    I.xVelocity = .5 + (1 * (_enemy.ROF / 25));
    I.yVelocity = 0;

    I.width = 32;
    I.height = 32;

    I.inBounds = function() {
      return I.x >= 0 && I.x <= CANVAS_WIDTH &&
      I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.sprite = Sprite(enemyNoUnderscore+"-boss-bullet");

  I.draw = function() {
      this.sprite.draw(canvas, this.x, this.y);
  };

  I.update = function() {
      I.x -= I.xVelocity;
      I.y -= I.yVelocity;

      I.yVelocity = 2 * Math.sin(I.age * Math.PI / 64);

      I.age++;

      I.active = I.active && I.inBounds();
  };

  I.explode = function() {
  // Sound.play("explosion");

  this.active = false;

};

return I;
};

var canvasElement = $("<canvas width='" + CANVAS_WIDTH +
    "' height='" + CANVAS_HEIGHT + "'></canvas")
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('#action-view');

init = setInterval(function() {
    drawChar();
    update();
    draw();
}, 1000/FPS);

// setInterval(function() {
//   drawChar();
// }, 1000/FPS);


function drawChar(){

    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if(keydown.space) {

      player.drawSpace();
      console.log('space working');
  // player.sprite = Sprite(charNoUnderscore+"-shoot");
  // player.drawSpace = function() {
  //   this.sprite.draw(canvas, this.x, this.y);
  //   console.log('"this" at space: ', this);
  //   console.log("space sprite: ", this.sprite);
  // };
} else if(keydown.left) {

  player.drawLeft();
  // player.sprite = Sprite(charNoUnderscore+"-left");
  // player.drawLeft = function() {
  //   this.sprite.draw(canvas, this.x, this.y);
  //   console.log('"this" at left: ', this);
  //   console.log("left sprite: ", this.sprite);
  // };

} else if (keydown.down) {

  player.drawDown();
  // console.log('down working');
  // player.sprite = Sprite(charNoUnderscore+"-down");
  // player.drawDown = function() {
  //   this.sprite.draw(canvas, this.x, this.y);
  //   console.log('"this" at down: ', this);
  //   console.log("down sprite: ", this.sprite);
  // };
} else if (keydown.up) {

  player.drawUp();
  // console.log('up working');
  // player.sprite = Sprite(charNoUnderscore+"-up");
  // player.drawUp = function() {
  //   this.sprite.draw(canvas, this.x, this.y);
  //   console.log('"this" at up: ', this);
  //   console.log("up sprite: ", this.sprite);
  // };
} else if (keydown.right) {

  player.drawRight();
  // player.sprite = Sprite(charNoUnderscore+"-right");
  // player.drawRight = function() {
  //   this.sprite.draw(canvas, this.x, this.y);
  //   alert('right working');
  //   console.log('"this" at right: ', this);
  //   console.log("left sprite: ", this.sprite);
  // };

  // player.draw();


} else {

  player.drawStand();
  // console.log('stand working');
  // player.sprite = Sprite(charNoUnderscore+"-stand");
  // player.drawStand = function() {
  //   this.sprite.drawStand(canvas, this.x, this.y);
  //   console.log('"this" at stand: ', this);
  //   console.log("stand sprite: ", this.sprite);
  // };
}

// if (player.spriteSpace){
//   debugger;
// }
}

function update() {
    $('#timer').empty();
    $('#timer').text(gameTime)

    if (gameTime <= 0) {
        k++
        if (k==1) {
            k==0;
         GameTimedOut();
        }
  }
  if(keydown.space && !isGameOver && Date.now() - lastFire > (250 - (_player.ROF * 2))) {
      player.shoot();
      lastFire = Date.now();
  }

  if(keydown.left) {
      if (player.x <= 0) {
        player.x = 0;
    } else {
        player.x -= 5;
    }
}

if(keydown.right) {
    if (player.x >= CANVAS_WIDTH * .6) {
        player.x = CANVAS_WIDTH * .6;
    } else {
        player.x += 5;
    }
}

if(keydown.up) {
    if (player.y <= 0) {
        player.y = 0
    } else {
        player.y -= 5;
    }
}

if(keydown.down) {
    if (player.y + player.height >= CANVAS_HEIGHT) {
        player.y = CANVAS_HEIGHT - player.height
    } else {
        player.y += 5;
    }
}

player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);

playerBullets.forEach(function(bullet) {
    bullet.update();
});

playerBullets = playerBullets.filter(function(bullet) {
    return bullet.active;
});

enemies.forEach(function(enemy) {
    enemy.update();
});

enemies = enemies.filter(function(enemy) {
    return enemy.active;
});

handleCollisions();

if(Math.random() < (0.1 + (_enemy.ROF / 900))) { //how fast the enemy bullets come
  enemies.push(Enemybullet());
}

bossContainer.forEach(function(boss){
  boss.update();
});
}

player.shoot = function() {
// Sound.play("shoot");

var bulletPosition = this.midpoint();

playerBullets.push(Bullet({
  speed: 5,
  x: bulletPosition.x,
  y: bulletPosition.y
}));
};

player.midpoint = function() {
    return {
      x: this.x + (this.width/4),
      y: this.y + (this.height/4)
  };
};

function draw() {

    player.draw();
    bossContainer.forEach(function(boss) {
      boss.draw();
  });

    playerBullets.forEach(function(bullet) {
      bullet.draw();
  });

    enemies.forEach(function(enemy) {
      enemy.draw();
  });
}

function collides(a, b) {
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}

function handleCollisions() {
    playerBullets.forEach(function(bullet) {
      enemies.forEach(function(enemy) {
        if(collides(bullet, enemy)) {
          enemy.explode();
          bullet.active = false;
      }
  });
      bossContainer.forEach(function(boss){
        if(collides(bullet, boss)) {
          Boss.explode();
          bullet.active = false;
      }
  });
  });

    enemies.forEach(function(enemy) {
      if(collides(enemy, player)) {
        if (!isGameOver) {
            enemy.explode();
            player.explode();
        }
    }
});
}

player.explode = function() {
    console.log(_player.health);
    _player.health = _player.health - (_enemy.attack - _player.defense);
    if(_player.health < 0){
        isGameOver = true;
        k++;
      _player.health = 0;
      pause();
      $('#action-view').append($('<div class="defense-option">'));
      $('.defense-option').append($('<h1 class="defense-announcement">').html('Game Over! You LOSE!'));
      if (k==1) {
      setTimeout(function(){
        k=0;
        $('.defense-option').remove();
        updater.allStats(Math.round(_player.attack), Math.round(_player.health), Math.round(_player.defense), 98, _player.ROF);
        updater.enemyStats(Math.round(_enemy.attack), Math.round(_enemy.health), Math.round(_enemy.defense), _enemy.position, _enemy.ROF);
        location.href = "/game/stats"
    }, 3000);
        }
      $('canvas').remove();
  }

  $('#player-health').html(_player.health);

  this.active = false;
};

Boss.explode = function() {
    console.log(_enemy.health)
    _enemy.health = _enemy.health - (_player.attack - _enemy.defense);
    $('#enemy-health').html(_enemy.health);
    if(_enemy.health <= 0){
        isGameOver = true;
        k++;
        Boss.explode = null;
        pause();
            if (k==1){
            $('#action-view').append($('<div class="defense-option">'));
            $('.defense-option').append($('<h1 class="defense-announcement">').html('You Won! Good Job!'));
            $('#enemy-health').html('0');
            k=0;
            _enemy.health = 0;
            _player.health += enemyInitialHealthInt / 4;
            setTimeout(function(){
                  if (battlestate == 2) {
                    player.position = 98;
                  }
                  console.log('in here with k')
                  updater.allStats(Math.round(_player.attack), Math.round(_player.health), Math.round(_player.defense), _player.position, _player.ROF);
                  updater.enemyStats(Math.round(_enemy.attack), Math.round(enemyInitialHealthInt / 3), Math.round(_enemy.defense), _enemy.position, _enemy.ROF);

              $('.defense-option').remove();
              $('#timer').remove();
          }, 3000);

            $('canvas').remove();
            $('#roll').show();
        }
    } else {
       this.active = false;
    }
};

function GameTimedOut(){
    pause();
    $('#action-view').append($('<div class="defense-option">'));
    $('.defense-option').append($('<h1 class="defense-announcement">').html('Time Up!'));
    if (_enemy.health < (enemyInitialHealthInt / 2)) {
        _enemy.health = (enemyInitialHealthInt / 2);
    }
    setTimeout(function(){
      $('.defense-option').remove();
      $('#timer').remove();
      updater.allStats(Math.round(_player.attack), Math.round(_player.health), Math.round(_player.defense), _player.position, _player.ROF);
      updater.enemyStats(Math.round(_enemy.attack), Math.round(_enemy.health), Math.round(_enemy.defense), _enemy.position, _enemy.ROF);
  }, 3000);
    $('canvas').remove();
    $('#roll').show();
}

} //end startMinigame() ******************

var pause = function(){
    gameTime = 30;
    console.log(init);
    clearInterval(init);
    clearInterval(timer);
}
