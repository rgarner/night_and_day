interaction = {
  touchDoor: function (player, door) {
    if (typeof(door.required) == 'undefined') {
      player.latestDoor = door;
    } else {
      if (player.inventory.includes(door.required)) {
        player.latestDoor = door;
      }
    }
  },
  killPlayer: function (player, killer) {
    player.active = false;
    audio.play_die();
    map.restart();
    setTimeout(
      interaction.resumeGame,
      4000
  )
  },
  resumeGame: function () {
    player.active = true;
    audio.resume_theme();
  },
  pickUpKey: function (player, key) {
    if (typeof key.collected == 'undefined') {
      key.collected = true;
      key.destroy();
      player.inventory.push(key.name);
      var x = 180 + (player.inventory.length * 48);
      var y = 32;
      var inventoryDisplay = this.add.image(x, y, key.sprite);
      inventoryDisplay.setScrollFactor(0);
      inventoryImages.push(inventoryDisplay);
      audio.play_sfx('pick_up')
    }
  },
  landOnPlatform: function (player, platform) {
    if (platform.breakable) {
      interaction.breakPlatform(player, platform);
    }
    if (player.slamming) {
      player.slamming = false;
    }
    if (player.jumping) {
      if (player.body.onFloor()) {
        audio.play_land();
        player.jumping = false;
      } else if (player.body.onCeiling()) {
        audio.play_sfx('head_block')
      }
    }
  },
  breakPlatform: function (player, platform) {
    if (player.slamming || player.body.onCeiling() && !platform.breaking_right_now) {
      platform.anims.play('break', false);

      audio.play_sfx('break');
      platform.breaking_right_now = true;

      platform.once(
        'animationcomplete',
        function () {
          platform.destroy();
        }
      );
    }
  },
  bounceOnSpring: function (player, spring) {
    player.slamming = false;

    if (player.body.onFloor() && player.body.velocity.y < -10) {
      audio.play_sfx('spring');
      player.setVelocityY(Math.abs(player.body.velocity.y * 5) * -1);
    }
  },
  hitSlider: function (player, slider) {
    //TODO only follow tracks
    if (slider.direction == 'vertical') {
      if (player.body.onFloor() && player.slamming) {
        slider.setY(slider.y + block_size);
        slider.body.position.y = (slider.y - (block_size / 2));
      } else if (player.body.onCeiling()) {
        slider.setY(slider.y - block_size);
        slider.body.position.y = (slider.y - (block_size / 2));
      }
    }
    player.slamming = false;
  }

};
