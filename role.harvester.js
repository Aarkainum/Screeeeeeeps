var roleHarvester = {
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity  && !creep.memory.building) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.mine]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.mine], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
          var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length && creep.room.energyAvailable >= 200) {
              if(creep.memory.building && creep.carry.energy == 0) {
                    creep.memory.building = false;
              }
              if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                  creep.memory.building = true;
              }

              if(creep.memory.building) {
                  var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                  var closest = creep.pos.findClosestByPath(targets)
                    if(targets.length) {
                        if(creep.build(closest) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(closest, {reusePath: 10, visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        if (!creep.memory.building || creep.room.energyAvailable < 300 && creep.carry.energy == creep.carryCapacity ) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0 && creep.carry.energy == creep.carryCapacity && !creep.memory.building) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;