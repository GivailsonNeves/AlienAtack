let Personagem  = require("Personagem");

cc.Class({
    extends: Personagem,

    properties: {      
       
        barraVida: cc.ProgressBar,
        _acelerando: false,        
        _vidaAtual: 0,
        vidaMaxima: 100,
        velocidade: 200,
        pontuacao: 0,
        label: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        this._vidaAtual = this.vidaMaxima;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);

        let canvas = cc.find("Canvas");
        canvas.on("mousemove", this.mudaDirecao, this);
        canvas.on("mousedown", this.atirar, this);

        cc.director.getCollisionManager().enabled = true;
        this.barraVida.progress = 1;
        this.label.string = "Pontos: " + this.pontuacao;
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

        let angulo = Math.atan2(direcao.y, direcao.x);
        this.node.rotation = - angulo * (180/Math.PI);
        //cc.log(evt);
    },
    adicionarPontuacao: function(pontos)
    {
        this.pontuacao += pontos;
        this.label.string = "Pontos: "+this.pontuacao;
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
        this._vidaAtual -= dano;
        let prctVida = this._vidaAtual / this.vidaMaxima;
        this.barraVida.progress = prctVida;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._acelerando){
            let deslocamento = this._direcao.mul(this.velocidade * dt);
            this.node.position = this.node.position.add(deslocamento);
        }
    },
});
