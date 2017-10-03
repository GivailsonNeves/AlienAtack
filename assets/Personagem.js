let Personagem = cc.Class({
    extends: cc.Component,

    properties: {
        _direcao: cc.Vec2,
        tiroPrefab: cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {

    },
    atirar: function(){
        let disparo = cc.instantiate(this.tiroPrefab);
        disparo.parent = this.node.parent;
        disparo.position = this.node.position;
        disparo.group = this.node.group;
        let componentTiro = disparo.getComponent("Tiro");
        componentTiro.direcao = this._direcao;
    },
    tomarDano: function(){

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

module.exports = Personagem;