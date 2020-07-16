new Vue ({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,
        player: {damage: 0, magic: 6, healing: 1},
        monster: {damage: 2},
        logDamage: [],
        gameStarted: false,
        winner: "",
        gameOverColor: 'green'
    },
    methods: {
        gameOver() {
            if (this.playerLife <= 0) {
                this.gameOverColor = 'red';
                this.gameStarted = "gameOver";
                this.winner = "Perdeu :(";
                this.playerLife = 0;            
            } else if (this.monsterLife <= 0) {  
                this.gameOverColor = 'green';
                this.gameStarted = "gameOver";             
                this.winner = "Ganhou :)";
                this.monsterLife = 0;             
            }  
        },
        start() {
            this.playerLife = 100;
            this.monsterLife = 100;
            this.gameStarted = true;
            this.logDamage = [];            
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        monsterAtack() {
            log = this.monster.damage + this.getRandomInt(0, 10)
            this.playerLife = this.playerLife - log;
            return "MONSTRO ATINGIU JOGADOR COM "+log;
        },
        playerAtack(type) {
            switch (type) {
                case 'normal':
                    log = this.player.damage + this.getRandomInt(0, 10);
                    this.monsterLife = this.monsterLife - log;
                    return "JOGADOR ATINGIU MONSTRO COM "+log;
                    break;
                case 'special':
                    log = this.player.magic + this.getRandomInt(0, 10);
                    this.monsterLife = this.monsterLife - log;
                    return "JOGADOR ATINGIU MONSTRO COM "+log;
                    break;
                case 'cure':
                    log = this.player.healing + this.getRandomInt(0, 10);                    
                    this.playerLife = this.playerLife + log;
                    if (this.playerLife >= 100) {
                        this.playerLife = 100;
                    }
                    return "JOGADOR CUROU COM "+log;
                    break;
            }
        },
        attack(type) {                 
            this.logDamage.unshift(this.monsterAtack());
            this.logDamage.unshift(this.playerAtack(type));
            this.gameOver();           
        }
    }
});