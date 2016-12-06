var roleBuilder = require('role.builder');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('collecting');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('repairing');
	    }

	    if(creep.memory.repairing) {
	        var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => {return ((s.structureType == STRUCTURE_WALL) && s.hits < 10000)
                            || (s.structureType == STRUCTURE_ROAD && s.hits/s.hitsMax < .9) ;
            }
            });

	        if (structure != undefined){
	        	if (creep.repair(structure) == ERR_NOT_IN_RANGE){
	        		creep.moveTo(structure);
				}
			}
            else{
            	roleBuilder.run(creep);
			}
	    }
	    else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }
            });

            if (target){

                if (creep.pos.getRangeTo(target) <= 1){
                    creep.withdraw(target,RESOURCE_ENERGY);
                    //console.log(target);
                }
                else {
                    creep.moveTo(target);
                }
            }
            else{
                var source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: (s) => { return s.energy != 0;}});
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
	    }
	}
};

module.exports = roleRepairer;