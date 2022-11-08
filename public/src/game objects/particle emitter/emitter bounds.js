
function createAnimatedParticle(end,anim){
    return class AnimatedParticle extends Phaser.GameObjects.Particles.Particle
    {
        constructor (emitter)
        {
            super(emitter);

            this.t = 0;
            this.i = 0;
        }

        update (delta, step, processors)
        {
            var result = super.update(delta, step, processors);

            this.t += delta;

            if (this.t >= anim.msPerFrame)
            {
                this.i++;

                if (this.i > end)
                {
                    this.i = 0;
                }

                this.frame = anim.frames[this.i].frame;

                this.t -= anim.msPerFrame;
            }

            return result;
        }
    }
}

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#4417b3',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};


var game = new Phaser.Game(config);

function preload ()
{
    this.load.atlas('gems',  "assets/demo/demo1/金币.png",  "assets/demo/demo1/金币.json");
    this.load.spritesheet('mummy', 'assets/animations/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
    this.load.image('make', 'assets/demo/demo1/make.png');
    this.load.image('bg', 'assets/demo/demo1/bg1.png');
}

function create ()
{
    this.add.image(400,200,'bg').setDisplaySize(132,122)
    const  frames = this.anims.generateFrameNames('gems')
    let particles = this.add.particles('gems');
    let emitter = particles.createEmitter({
        x: 400,
        y: 139,
        frame: frames[0].frame,
        quantity: 5,
        frequency: 200,
        angle: { min: 65, max: 115 },
        speed: { min: 200, max: 300 },
        scale: { start: 0.45, end: 0.4 },
        gravityY: 100,
        lifespan: 4000,
        particleClass: createAnimatedParticle(frames.length-1,this.anims.create({
            key: 'walk',
            frames: frames,
            frameRate: 18,
            repeat: -1
        })),
        bounce: 0.3,
        bounds: { x:300, y: 139, w: 200, h: 90 },
        collideLeft:false,
        collideRight:false,
        blendMode: 'ADD'
    });
    const spotlight = this.make.sprite({
        x: 400,
        y: 200,
        key: 'make',
        add: false
    });
    spotlight.setDisplaySize(142,122)
    particles.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
    setTimeout(() => {
        emitter.on = false
    }, 3000);
}


// var config = {
//     type: Phaser.WEBGL,
//     width: 800,
//     height: 600,
//     backgroundColor: '#000',
//     parent: 'phaser-example',
//     scene: {
//         preload: preload,
//         create: create
//     }
// };

// var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json');
//     this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
// }

// function create ()
// {
//     // this
//     // this.add.sprite(400, 200, 'gems').play('diamond');
//     var particles = this.add.particles('gems');
//     particles.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 });
//     var rect = new Phaser.Geom.Rectangle(100, 100, 600, 400);

//     particles.createEmitter({
//         frame: [ 'red', 'yellow', 'green' ],
//         x: 400, y: 300,
//         lifespan: 4000,
//         speed: { min: 100, max: 250 },
//         scale: { start: 0.4, end: 0 },
//         gravityY: 150,
//         bounce: 0.8,
//         bounds: rect,
//         blendMode: 'ADD'
//     });

    // particles.createEmitter({
    //     frame: 'blue',
    //     lifespan: 1000,
    //     scale: { start: 0.4, end: 0 },
    //     emitZone: { type: 'edge', source: rect, quantity: 60 }
    // });
// }
