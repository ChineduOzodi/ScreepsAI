var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('delivering');
        }
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('harvesting');
        }
        
        if (creep.memory.harvesting){
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            var source = creep.pos.findClosestByPath(FIND_SOURCES,{filter: (s) => {return (s.energy != 0);}});
            //console.log(target);
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
            else {

                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }

        }
        else {
            //console.log("helo");
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER)
                        && structure.energy < structure.energyCapacity;
                }
            });
            //console.log(target.id);
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
};

module.exports = roleHarvester;