let Personagem = require("Personagem");
cc.Class({
    extends: Personagem,

    properties: {
        _alvo: cc.Node,
        velocidade: 50,        
        tempoAtaque: 1,
    },

    // use this for initialization
    onLoad: function () {
        this._alvo = cc.find("Hero");
        this.schedule(this.atirar, this.tempoAtaque);
    },
    /*
    atirar: function(){
        let disparo = cc.instantiate(this.tiroPrefab);
        disparo.parent  = this.node.parent;
        disparo.position = this.node.position;
        disparo.group = this.node.group;
        let componentTiro = disparo.getComponent("Tiro");
        componentTiro.direcao = this._direcao;
    },*/
    tomarDano: function (dano) {
        let jogador = this._alvo.getComponent("Jogador");
        jogador.adicionarPontuacao(10);
        this.node.destroy();
    },
    mudarDirecao: function(){
        let direcao = this._alvo.position.sub(this.node.position);
        direcao = direcao.normalize();
        this._direcao = direcao;

        let angulo = Math.atan2(direcao.y, direcao.x);
        this.node.rotation = - angulo * (180 / Math.PI);

    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        this.mudarDirecao();
        let deslocamento = this._direcao.mul(this.velocidade * dt);
        this.node.position = this.node.position.add( deslocamento );        
    },
});
