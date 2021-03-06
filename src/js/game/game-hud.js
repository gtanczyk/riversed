/**
 * @param {Race} race
 * @param {GameWorld} world
 * @param {BoatObject} boat
 * @constructor
 */
function GameHUD(race, world, boat) {
    this.race = race;
    this.world = world;
    this.boat = boat;
    
    this.HUD = $('#game-hud');
    this.raceTime = $('#race-time');
    this.racePosition = $('#race-position');
    this.raceStandings = $('#race-standings');
    this.activeBonuses = $('#active-bonuses');
    
    this.HUD.style.display = "block";
    
    if (isTouchDevice()) {
        this.HUD.classList.add("hud-touch");
    }
};

GameHUD.prototype.destroy = function() {
    this.HUD.display = "none";
};

/**
 * @param {Number} state
 */
GameHUD.prototype.render = function(state) {
    this.renderRaceTime();
    this.renderPosition();
    this.renderStandings();
    this.renderBonuses();

    switch (state) {
        case GAME_STATE_INIT:
            break;
        case GAME_STATE_PLAY:
            break;
        case GAME_STATE_PAUSE:
            break;
        case GAME_STATE_END:
            break;
    }
};

GameHUD.prototype.renderPosition = function() {
    var position = this.race.getPosition(this.boat);
    var total = this.race.getTotal();
    this.racePosition.innerHTML = '<span>'+position+'</span>' + "/" + total;
};

GameHUD.prototype.renderRaceTime = function() {
    this.raceTime.innerHTML = formatRaceTime(this.race.getTime());
};

GameHUD.prototype.renderStandings = function() {
    this.raceStandings.innerHTML = this.race.getStandings().map(function(standing, idx) {
        var boat = standing.getBoat();
        var isBoat = boat === this.boat;
        return '<div class="pos-'+idx+' '+(isBoat && 'me')+'">'+(idx+1)+'. '+'<span>'+boat.getName()+'</span>'+' '+formatRaceTime(standing.getTime())+'</div>'
    }, this).join(' ');
};

GameHUD.prototype.renderBonuses = function() {
    this.activeBonuses.innerHTML = this.world.getActiveBonuses().map(function(bonus) {
        var timeLeft = bonus.getTimeLeft(this.world.getTime());
        var percent = Math.round(timeLeft/bonus.getDuration() * 100);
        var className = bonus.getBoat() == this.boat ? "mine" : "";
        var iconSrc = $("#asset-bonus-"+bonus.getId()).src;
        return '<div class="'+className+'">'+
                   '<div style="width: '+percent+'%"></div>' +
                   '<img src="'+iconSrc+'" />' +
                   bonus.getName() + 
                   '<span>'+formatRaceTime(timeLeft)+'</span>'+
               '</div>';
    }, this).join(' ');
};

/**
 * @param {boolean} left
 * @param {boolean} right
 */
GameHUD.prototype.highlightTouch = function(left, right) {
    this.HUD.classList.toggle("hud-touch-left", left);
    this.HUD.classList.toggle("hud-touch-right", right);
};

GameHUD.prototype.showPause = function() {
    
};