var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.carrying && creep.carry.energy == 0) {
            creep.memory.carrying = false;
            creep.memory.task = undefined;
            creep.say('c_picking up');
        }
        if(!creep.memory.carrying && (creep.carry.energy > 0)) {
            creep.memory.carrying = true;
            creep.memory.task = undefined;
            creep.say('carrying');
        }
        if(creep.room.name != Game.spawns.Spawn1.name){
	        creep.moveTo(Game.spawns.Spawn1);
	    } 
	    else if(creep.memory.carrying) {

            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_STORAGE
                    || structure.id == Game.spawns['Spawn1'].memory.spawnContainerID)
                        && structure.store[RESOURCE_ENERGY] < structure.storeCapacity)
                        || (structure.structureType == STRUCTURE_LINK && structure.energy < structure.energyCapacity
                        );
                }
            });

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else {
            if (creep.memory.task == undefined){
                creep.findTask();
            }
            var target = Game.getObjectById(creep.memory.task);

            if (target){
                //console.log(creep.pos.getRangeTo(target.pos.x, target.pos.y));
                if (creep.pos.getRangeTo(target) <= 1){
                    creep.withdraw(target,RESOURCE_ENERGY);
                    var source = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY)

                    if (source){
                        creep.pickup(source);
                    }
                    //console.log(target);
                }
                else {
                    creep.say("movetotarget");
                    creep.moveTo(target);
                }
            }
            else{
                creep.say("task gone");
                creep.findTask();
            }
        }
    }
};

module.exports = roleCarrier;