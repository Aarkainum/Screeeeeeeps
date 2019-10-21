var roleUpgrader = {

    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
              if(creep.moveTo(creep.room.controller, { noPathFinding: true }) == ERR_NOT_FOUND) {
                creep.moveTo(creep.room.controller);
              }
            }
        } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER ||
                                    structure.structureType == STRUCTURE_STORAGE ||
                                    structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN &&
                                    structure.energy >= 200)//(creep.carryCapacity - creep.carry.energy)) 
                        } 
                });
                var target = creep.pos.findClosestByPath(targets);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  if(creep.moveTo(target, { noPathFinding: true }) == ERR_NOT_FOUND) {
                    creep.moveTo(target); 
                  } 
                }
            }
	}
};

module.exports = roleUpgrader;