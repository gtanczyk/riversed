/**
 * @param {GameWorld} world
 * @param {Race} race
 * @param {BoatObject} boat
 * @constructor
 */
function Character(world, race, boat) {
    this.world = world;
    this.race = race;
    this.boat = boat;
};

/**
 * @param {WaypointObject} waypoint?
 */
Character.prototype.update = function(waypoint) {
    waypoint = waypoint || this.race.getNextWaypoint(this.boat);
    
    if (!waypoint) {
        this.boat.straight();
        return;
    }
    
    this.goTo(waypoint.vec());
};

Character.prototype.straight = function() {
    this.boat.straight();
};

Character.prototype.turnLeft = function() {
    this.boat.turnLeft();
};

Character.prototype.turnRight = function() {
    this.boat.turnRight();
};

Character.prototype.goTo = function(vec) {
    var direction = VMath.angle(
            VMath.normalize(VMath.sub(vec, this.boat.vec())),
            [Math.cos(this.boat.getDirection()), Math.sin(this.boat.getDirection())]
        );
    if (Math.abs(direction) < 0.05) {
        this.straight();
    } else if (direction < 0) {
        this.turnRight();
    } else {
        this.turnLeft();
    }
};