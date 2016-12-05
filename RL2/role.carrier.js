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

        if(creep.memory.carrying) {

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
                    //console.log(target);
                }
                else {
                    creep.moveTo(target);
                }
            }
        }
    }
};

module.exports = roleCarrier;