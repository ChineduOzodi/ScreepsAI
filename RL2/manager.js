require('prototype.spawn')();

var manager = {

    /** @param {Creep} creep **/
    run: function(spawn) {

        if(!spawn.memory.isSetup) {//Setup map initially
            console.log("Setting up room:" + spawn.room);
            spawn.memory.isSetup = true;
            spawn.memory.spawnIndex = 0;

            //Find Sources
            var sources = spawn.room.find(FIND_SOURCES);
            spawn.memory.sourceCount = sources.length;
            spawn.memory.miningIndex = 0;

            spawn.findMiningContainers();

            if (spawn.memory.miningContainersID.length < sources.length){
                //Create container structures
                for (var name in sources){

                    var source = sources[name];

                    var path = source.room.findPath(spawn.pos, source.pos,{'ignoreCreeps': true});

                    var pos = {x : path[path.length - 1].x,y : path[path.length - 1].y, roomName: spawn.room.name};

                    spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER);
                }

            }
            if (!spawn.memory.spawnContainerID){
                spawn.room.createConstructionSite(spawn.pos.x + 1, spawn.pos.y, STRUCTURE_CONTAINER);
            }
            spawn.memory.nextUpdate = Game.time;
        }
        else{
            //LongUpdate
            var updateInterval = 60 * 5;
            if (spawn.memory.nextUpdate){
                //Stats
                if (spawn.memory.nextUpdate < Game.time){
                    spawn.memory.nextUpdate += updateInterval;
                    var progress = spawn.room.controller.progress - spawn.memory.controllerProgress;
                    spawn.memory.controllerProgress = spawn.room.controller.progress;
                    var workLeft = spawn.room.controller.progressTotal - spawn.room.controller.progress;
                    var remainingTime = workLeft/progress;
                    console.log("ETA for "+ spawn.room.name + ": "+ (remainingTime * 5)/(60) + " hrs");
                }

                //Room checks

                spawn.findMiningContainers();
                spawn.memory.spawnContainerID = null;
                var spawnContainer = spawn.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => { return s.structureType == STRUCTURE_CONTAINER;}});
                if (spawnContainer){
                    if (spawn.pos.getRangeTo(spawnContainer) <= 2){
                        spawn.memory.spawnContainerID = (spawnContainer.id);
                    }
                }
            }
            else{
                spawn.memory.nextUpdate = Game.time;
            }

            //Level Designations

            0
            //AutoTasker
            spawn.setTasks('carrier');

            //Links
            if (spawn.room.level > 3){
                var resourceLink = Game.getObjectById('6bd0c61a1d96f35');
            var controllerLink = Game.getObjectById('2256c6b0c240e1f')
            resourceLink.transferEnergy(controllerLink);
            }
            

            //Towers
            var towers = spawn.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_TOWER;}});
            for (var name in towers) {
                var tower = towers[name];
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && (structure.structureType != STRUCTURE_WALL)
                });
                //console.log(closestDamagedStructure);
                if(closestDamagedStructure) {

                  tower.repair(closestDamagedStructure);
                }

                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile) {
                    tower.attack(closestHostile);
                }
            }

            var level = spawn.room.controller.level;

            var energy = spawn.room.energyAvailable;
            var upgradeLevel1 = 500;

            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
            var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
            var farHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'farHarvester');
            //console.log('Harvesters: ' + harvesters.length);
            //console.log('Carriers: ' + carriers.length);

            var storage = spawn.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });

            if (harvesters.length < 2 && !spawn.spawning ) {
                var newName;
                newName = spawn.createCustomCreap(energy, 'harvester');
                console.log('Spawning new harvester: ' + newName);
            }
            else if (miners.length < spawn.memory.miningContainersID.length && level > 1 && !spawn.spawning) {
                var newName;
                newName = spawn.createCustomCreap2(spawn,energy,'miner',spawn.memory.miningContainersID[spawn.memory.miningIndex]);
                spawn.memory.miningIndex++;
                if (spawn.memory.sourcesIndex >= spawn.memory.miningContainersID.length){
                    spawn.memory.sourcesIndex = 0;
                }
                console.log('Spawning new miner: ' + newName);
            }
            else if (upgraders.length < 1 && !spawn.spawning) {
                var newName;
                newName = spawn.createCustomCreap(energy, 'upgrader');
                console.log('Spawning new upgrader: ' + newName);
            }
            else if (carriers.length < 2 && !spawn.spawning) {
                var newName;
                newName = spawn.createCustomCreap(energy, 'carrier');
                console.log('Spawning new carrier: ' + newName);
            }
            else if (builders.length < 1 && !spawn.spawning) {
                var newName;
                newName = spawn.createCustomCreap(energy, 'builder');
                console.log('Spawning new builder: ' + newName);
            }
            else if (repairers.length < 1 && !spawn.spawning) {
                var newName;
                newName = spawn.createCustomCreap(energy, 'repairer');
                console.log('Spawning new repairer: ' + newName);
            }
            else if (attackers.length < 1 && !spawn.spawning) {
                var newName;
                newName = spawn.createCustomCreap(energy, 'attacker');
                console.log('Spawning new attacker: ' + newName);
            }
            else if (farHarvesters.length < 2 && !spawn.spawning && storage) {
                var newName;
                newName = spawn.createCustomCreap(energy, 'farHarvester');
                console.log('Spawning new distanceHarvester: ' + newName);
            }


        }
    }
};

module.exports = manager;