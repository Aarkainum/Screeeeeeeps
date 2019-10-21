var roleRepairer = {
    run: function(creep){
      if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
	    }else if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	    }
      if(creep.memory.repairing){
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: (s) => (s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL)});
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                  if(creep.moveTo(target, { noPathFinding: true }) == ERR_NOT_FOUND) {
                    creep.moveTo(target);
                  }
                }
      } else {
          var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => {
              return (s.structureType == STRUCTURE_CONTAINER ||
                      s.structureType == STRUCTURE_STORAGE ||
                      s.structureType == STRUCTURE_SPAWN &&
                      s.energy >= creep.carryCapacity)}});

            var target = creep.pos.findClosestByPath(targets);
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              if(creep.moveTo(target, { noPathFinding: true }) == ERR_NOT_FOUND) {
                creep.moveTo(target);
              }
            }
        }
    }
};

module.exports = roleRepairer;