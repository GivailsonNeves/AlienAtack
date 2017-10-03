let Personagem  = require("Personagem");

cc.Class({
    extends: Personagem,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _acelerando: false,        
        vida: 100,
        velocidade: 200,
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);

        let canvas = cc.find("Canvas");
        canvas.on("mousemove", this.mudaDirecao, this);
        canvas.on("mousedown", this.atirar, this);

        cc.director.getCollisionManager().enabled = true;
    },
    /*
    atirar: function(evt){
        let tiro = cc.instantiate(this.tiroPrefab);
        tiro.parent = this.node.parent;
        tiro.position = this.node.position.add(new cc.Vec2((this.node.width / 2) +20, 0));
        tiro.group = this.node.group;
        let componentTiro = tiro.getComponent("Tiro");
        componentTiro.direcao = this._direcao;
    },*/
    mudaDirecao: function(event){
        let positionMouse = event.getLocation();
        positionMouse = new cc.Vec2(positionMouse.x, positionMouse.y);

        let direcao = positionMouse.sub(this.node.position);

        this._direcao = direcao.normalize();
        //cc.log(evt);
    },
    teclaPressionada: function(evt){
        //cc.log(evt);
        if(evt.keyCode == cc.KEY.a)
            this._acelerando = true;
    },
    teclaSolta: function(evt) {
       // cc.log(evt);
        if (evt.keyCode == cc.KEY.a)
            this._acelerando = false;
    },
    tomarDano: function (dano) {
        this.vida -= dano;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._acelerando){
            let deslocamento = this._direcao.mul(this.velocidade * dt);
            this.node.position = this.node.position.add(deslocamento);
        }
    },
});
