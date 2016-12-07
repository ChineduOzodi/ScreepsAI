var roleUpgrader = require('role.upgrader');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('b_harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }
	    if(creep.room.name != Game.spawns.Spawn1.name){
	        creep.moveTo(Game.spawns.Spawn1);
	    } 
	    else if(creep.memory.building) {

	        var buildFlag = creep.pos.findClosestByPath(FIND_FLAGS,{filter: (s) => {return (s.name == "BuildFlag" );}});
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            //console.log(buildFlag.name);
	        if (buildFlag && target){
	            possibleTarget = buildFlag.pos.lookFor(LOOK_CONSTRUCTION_SITES);
	            if (possibleTarget.length){
	                target = possibleTarget[0];
                }
            }

            if(target != undefined) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else{
            	roleUpgrader.run(creep);
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

            var source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: (s) => { return s.energy != 0;}});

            if (target && source){
                var selected = creep.pos.findClosestByPath([target,source]);

                if (selected.id == source.id){
                    target = null;
                }
            }
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

                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
	    }
	}
};

module.exports = roleBuilder;