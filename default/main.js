require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleAttacker = require('role.attacker');

module.exports.loop = function () {

    var tower = Game.spawns['Spawn1'].pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => (structure.structureType == STRUCTURE_TOWER)
    });
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && (structure.structureType != STRUCTURE_WALL)
    });
        //if(closestDamagedStructure) {
         //   tower.repair(closestDamagedStructure);
        //}

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    var energy = Game.spawns['Spawn1'].room.energyCapacityAvailable;
    var upgradeLevel1 = 500;

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < 5) {
        var newName;
        newName = Game.spawns['Spawn1'].createCustomCreap(energy, 'harvester');
        console.log('Spawning new harvester: ' + newName);
    }
    else if (upgraders.length < 3) {
        var newName;
        newName = Game.spawns['Spawn1'].createCustomCreap(energy, 'upgrader');
        console.log('Spawning new upgrader: ' + newName);
    }
    else if (builders.length < 2) {
        var newName;
        newName = Game.spawns['Spawn1'].createCustomCreap(energy, 'builder');
        console.log('Spawning new upgrader: ' + newName);
    }
    else if (repairers.length < 2) {
        var newName;
        newName = Game.spawns['Spawn1'].createCustomCreap(energy, 'repairer');
        console.log('Spawning new repairer: ' + newName);
    }
    else if (attackers.length < 1) {
        var newName;
        if (Game.spawns['Spawn1'].room.energyCapacityAvailable >= upgradeLevel1){
            newName = Game.spawns['Spawn1'].createCreep( [WORK,CARRY,ATTACK, MOVE,MOVE, MOVE], undefined, { role: 'attacker' } );
        }
        else{
            newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, ATTACK, MOVE], undefined, { role: 'attacker' });
        }
        console.log('Spawning new attacker: ' + newName);
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
    }
}