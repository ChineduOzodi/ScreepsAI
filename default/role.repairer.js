var roleBuilder = require('role.builder');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('r_harvesting');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('repairing');
	    }

	    if(creep.memory.repairing) {
	        var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => {
                        return (s.structureType != STRUCTURE_WALL) && s.hits < s.hitsMax;
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
	        var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
	    }
	}
};

module.exports = roleRepairer;