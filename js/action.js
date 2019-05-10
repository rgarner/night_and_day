action = {
  readCursors: function () {
    if (player.active) {
      var cursors = this.input.keyboard.createCursorKeys();
      if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
      }
      else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
      }
      else {
        player.setVelocityX(0);
        player.anims.play('turn');
      }

      if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
        if (typeof player.latestDoor !== 'undefined' && utils.checkOverlap(player, player.latestDoor)) {
          if (player.latestDoor.target && player.latestDoor.target.includes('-')) {
            console.log('leave this level!');
            map.draw(player.latestDoor.target);
          } else if (player.latestDoor.target) {
            console.log('trying jump');
            var target_door = doors.children.entries.find(function (d) {
              return d.name == player.latestDoor.target
            });
            console.log(target_door);
            if (typeof(target_door) !== 'undefined') {
              player.setPosition(target_door.x, target_door.y);
            }
          }
        }
      } else if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY((game.config.physics.arcade.gravity.y * -1) * 0.5);
      }

      var reset_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      if (Phaser.Input.Keyboard.JustDown(reset_key) && map.current) {
        map.restart();
      }
    }
//    if (cursors.down.isDown && !player.body.touching.down) {
//      player.setBounce(1.1);
//      player.setVelocityY(600);
//    }
    //   if (player.body.touching.down) {
//      player.setBounce(0.2);
//    }
  }
}
;
