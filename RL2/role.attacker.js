var roleRepairer = require('role.repairer');

var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {

    	var closestHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

	    if(closestHostile) {
	        if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
	        	creep.moveTo(closestHostile);
			}
	    }
	    else {
	        roleRepairer.run(creep);
	    }
	}
};

module.exports = roleAttacker;