var init;
var enemyInitialHealthString = $('#enemy-health').html();
var enemyInitialHealthInt = parseInt(enemyInitialHealthString); //THIS NEEDS TO BE UPDATED WHEN DB IS UPDATED WITH ALL ENEMY STATS

function startMinigame(){

  // // Background image
  // var bgReady = false;
  // var bgImage = new Image();
  // bgImage.onload = function () {
  // 	bgReady = true;
  // };
  // bgImage.src = "images/background.jpg";


  var playerHealthString = $('#player-health').html();
  var playerHealthInt = parseInt(playerHealthString);
  var playerDefenseString = $('#player-defense').html();
  var playerDefenseInt = parseInt(playerDefenseString);
  var playerAttackString = $('#player-attack').html();
  var playerAttackInt = parseInt(playerAttackString);

  var enemyHealthString = $('#enemy-health').html();
  var enemyHealthInt = parseInt(enemyHealthString);
  var enemyDefenseString = $('#enemy-defense').html();
  var enemyDefenseInt = parseInt(enemyDefenseString);
  var enemyAttackString = $('#enemy-attack').html();
  var enemyAttackInt = parseInt(enemyAttackString);



  var CANVAS_WIDTH = 800; //1200
  var CANVAS_HEIGHT = 350;
  var FPS = 30;

  var player = {
    color: "#00A",
    x: 120,
    y: 160,
    width: 20,
    height: 30,
    draw: function() {
      canvas.fillStyle = this.color;
      canvas.fillRect(this.x, this.y, this.width, this.height);
    }
  };

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

    I.sprite = Sprite("boss");

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
    I.sprite = Sprite("Black Panter-bullet");

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
      // Extra Credit: Add an explosion graphic
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
      yAxis = boss.y;
    });


    I.x = xAxis;
    I.y = yAxis;

    I.xVelocity = 2
    I.yVelocity = 0;

    I.width = 32;
    I.height = 32;

    I.inBounds = function() {
      return I.x >= 0 && I.x <= CANVAS_WIDTH &&
        I.y >= 0 && I.y <= CANVAS_HEIGHT;
    };

    I.sprite = Sprite("enemybullet");

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
      // Sound.play("explosion");

      this.active = false;
      // Extra Credit: Add an explosion graphic
    };

    return I;
  };

  var canvasElement = $("<canvas width='" + CANVAS_WIDTH +
    "' height='" + CANVAS_HEIGHT + "'></canvas")//.css('background-image', 'url(images/background.png)');
  var canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('#action-view');

  init = setInterval(function() {
    update();
    draw();
  }, 1000/FPS);

  setInterval(function() {
    drawChar();
  }, 5000/FPS);


  function drawChar(){

    if(keydown.space) {
      console.log('space working');
      player.sprite = Sprite("Black Panter-shoot");
      player.draw = function() {
        this.sprite.draw(canvas, this.x, this.y);
      };
    }

    if(keydown.left) {
      console.log('left working');
      player.sprite = Sprite("Black Panter-left");
      player.draw = function() {
        this.sprite.draw(canvas, this.x, this.y);
      };
    }

    if(keydown.right) {
      console.log('right working');
      player.sprite = Sprite("Black Panter-right");
      player.draw = function() {
        this.sprite.draw(canvas, this.x, this.y);
      };
    }

    if(keydown.down) {
      console.log('down working');
      player.sprite = Sprite("Black Panter-down");
      player.draw = function() {
        this.sprite.draw(canvas, this.x, this.y);
      };
    }

    if(keydown.up) {

      player.sprite = Sprite("Black Panter-up");
      player.draw = function() {
        this.sprite.draw(canvas, this.x, this.y);
      };
    }

    else{
      player.sprite = Sprite("Black Panter-stand");
      player.draw = function() {
        this.sprite.draw(canvas, this.x, this.y);
      };
    }
  }

  function update() {
    if(keydown.space) {
      player.shoot();
    }

    if(keydown.left) {
      player.x -= 5;
    }

    if(keydown.right) {
      player.x += 5;
    }

    if(keydown.up) {
      player.y -= 5;
    }

    if(keydown.down) {
      player.y += 5;
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

    if(Math.random() < 0.1) { //how fast the enemy bullets come
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
      x: this.x + this.width/1,
      y: this.y + this.height/1
    };
  };

  function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player.draw();
    // Boss.draw();

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
  //
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
        enemy.explode();
        player.explode();
      }
    });
  }

  player.explode = function() {
    console.log(playerHealthInt);
    if(playerHealthInt < 0){
      pause();
      $('#action-view').append($('<div class="defense-option">'));
      $('.defense-option').append($('<h1 class="defense-announcement">').html('Game Over! You LOSE!'));
      // setTimeout(function(){
      // }, 2000);
      $('.defense-option').remove();
      $('canvas').remove();
    }

    playerHealthInt = playerHealthInt - (enemyAttackInt - playerDefenseInt);
    $('#player-health').html(playerHealthInt);

    this.active = false;
  };

  player.sprite = Sprite("Black Panter-stand");

  player.draw = function() {
    this.sprite.draw(canvas, this.x, this.y);
  };

  Boss.explode = function() {
    if(enemyHealthInt < 0){
      pause();
      setTimeout(function(){
        $('#action-view').append($('<div class="defense-option">'));
        $('.defense-option').append($('<h1 class="defense-announcement">').html('You Won! Good Job!'));
      }, 2000);
      playerHealthInt += enemyInitialHealthInt / 4;
      $('#player-health').html(playerHealthInt);

      $('.defense-option').remove();
      $('canvas').remove();
      $('#roll').show();

    }

    enemyHealthInt = enemyHealthInt - (playerAttackInt - enemyDefenseInt);
    $('#enemy-health').html(enemyHealthInt);

    this.active = false;
  };

} //end startMinigame() ******************

var pause = function(){
  console.log(init);
  clearInterval(init);
}
