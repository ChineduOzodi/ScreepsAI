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
            if(creep.upgradeController(Game.spawns['Spawn1'].room.controller) == ERR_NOT_IN_RANGE) {
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
                creep.moveTo(Game.spawns['Spawn1'].room.controller);

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

module.exports = roleUpgrader;