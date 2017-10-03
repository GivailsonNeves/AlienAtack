cc.Class({
    extends: cc.Component,

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
        direcao: cc.Vec2,
        velocidade: 10,
    },

    // use this for initialization
    onLoad: function () {
        this.direcao = this.direcao.normalize();        
    },
    onCollisionEnter: function(another, myself){
        cc.log('colidiu')
        myself.node.destroy();
        let personagem = another.getComponent('Personagem');
        if(personagem)
            personagem.tomarDano(2);
        else
            another.node.destroy();
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        let deslocamento = this.direcao.mul(this.velocidade * dt);
        this.node.position = this.node.position.add(deslocamento);        
    },
});
