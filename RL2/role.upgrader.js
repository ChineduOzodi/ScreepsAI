var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('u_harvesting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                /**
                var road = creep.room.lookForAt(STRUCTURE_ROAD, creep);

                if (creep.memory.role == "upgrader"){
                    if (road.length == undefined){
                        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
                    }
                    else{
                        console.log(road.length);
                    }
                }
                 **/
                creep.moveTo(creep.room.controller);

            }
        }
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0)
                        || (structure.structureType == STRUCTURE_LINK && structure.energy > 0);
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

module.exports = roleUpgrader;