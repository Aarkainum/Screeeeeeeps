var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var repairer = require('role.repairer');
var minePos = Game.spawns['AARK'].room.find(FIND_SOURCES);


console.log(minePos.length);
module.exports.loop = function() {

    for(let name in Memory.creeps) {
        var creep = Game.creeps[name]
        if(creep == undefined) {
            delete Memory.creeps[name];
        }
        else if(creep.memory.role == 'harvester') {
          harvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
          upgrader.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            repairer.run(creep);
        }
        //creep.say("no pls", true)
    }
      var harvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester')
      var upgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader')
      var repairs = _.sum(Game.creeps, (c) => c.memory.role == 'repairer')
      var mine0 = _.sum(Game.creeps, (c) => c.memory.mine == '0')
      var mine1 = _.sum(Game.creeps, (c) => c.memory.mine == '1')
      
      
      if(harvesters < 6){
        if (mine0 > mine1) {
            var setMine = 1;
        }
        else {
            var setMine = 0;
        }
          Game.spawns.AARK.createCreep([WORK, CARRY, MOVE], setMine+' AARK H'+Game.time, {role: 'harvester', building: false, mine: setMine});
      }
      if(upgraders < 1 && harvesters >= 2){
          Game.spawns.AARK.createCreep([WORK, CARRY, MOVE], 'AARK U'+Game.time, {role: 'upgrader'});
      }
      else if(upgraders < 4 && harvesters >= 6){
          Game.spawns.AARK.createCreep([WORK, CARRY, MOVE], 'AARK U'+Game.time, {role: 'upgrader'});
      }
     else if (repairs < 1 && harvesters >= 2) {
          Game.spawns.AARK.createCreep([WORK, CARRY, MOVE], 'AARK R'+Game.time, {role: 'repairer', repairing: false});
      }
};
