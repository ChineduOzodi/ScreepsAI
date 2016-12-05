var roleRepairer = require('role.repairer');

var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {

    	var closestHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

	    if(creep.room.attacking && !closestHostile) {
            creep.memory.attacking = false;
            creep.say('a_harvesting');
	    }
	    if(!creep.memory.attacking && closestHostile) {
	        creep.memory.attacking = true;
	        creep.say('attacking');
	    }

	    if(creep.memory.attacking) {
	        creep.attack(closestHostile);
	    }
	    else {
	        roleRepairer.run(creep);
	    }
	}
};

module.exports = roleAttacker;