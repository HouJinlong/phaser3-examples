class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.atlas('jackpot', "assets/demo/jackpot.png",  "assets/demo/jackpot.json");
        this.y = 160;
    }

    create ()
    {

        // let data = {}
        // this.anims.generateFrameNames('jackpot').forEach(v => {
        //     const key = v.frame.split('_')[0]
        //     if(!data[key+'_']){
        //         data[key+'_'] = 0
        //     }
        //     data[key+'_']+=1
        // });
        // let temp = []
        // Object.keys(data).forEach((prefix)=>{

        //     if( this.anims.generateFrameNames('jackpot',{ prefix,start: 1, end: data[prefix],suffix:'.png',zeroPad:5})){
        //         temp.push(
        //             `this.anims.generateFrameNames('jackpot',{ prefix:"${prefix}",start: 1, end: ${data[prefix]},suffix:'.png',zeroPad:5})`

        //         )
        //     }
        // })
        // console.log('temp: ', temp);
        [
            "this.anims.generateFrameNames('jackpot',{ prefix:\"钱袋 橙色_\",start: 1, end: 50,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"钱袋 紫色_\",start: 1, end: 50,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"钱袋 绿色_\",start: 1, end: 50,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"钱袋 蓝色_\",start: 1, end: 50,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"动态效果_\",start: 1, end: 50,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"JACKPOT_\",start: 1, end: 50,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"头像动画 绿色_\",start: 1, end: 50,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"发射动画 绿色_\",start: 1, end: 20,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"发射 橙色_\",start: 1, end: 20,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"用户 蓝色_\",start: 1, end: 50,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"用户头像_\",start: 1, end: 50,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"发射_\",start: 1, end: 20,suffix:'.png',zeroPad:5})",
            "this.anims.generateFrameNames('jackpot',{ prefix:\"发射 蓝色_\",start: 1, end: 20,suffix:'.png',zeroPad:5})"
        ].map((v,i)=>{
            const x = 100*(i%4+1)
            const y = 100*(parseInt(i/4)+1)
            const rambo = this.add.sprite( x, y, 'jackpot');
            rambo.setDisplaySize(100,100)
            rambo.anims.create({
                key: 'walk',
                frames:  eval(v),
                repeat: -1,
                // duration:1000,
                // yoyo:true,
            });
            rambo.play('walk',);
        })
       return
        this.i = 0;

        //  Click to add an animation
        this.input.on('pointerup', function () {
            switch (this.i)
            {
                case 0:
                    this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 });
                    break;

                case 1:
                    this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 });
                    break;

                case 2:
                    this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 });
                    break;

                case 3:
                    this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 });
                    break;
            }
            this.i++;
        }, this);
    }

    addAnimation (key)
    {
        this.add.sprite(400, this.y, 'gems')
            .play(key);
        this.y += 100;
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [ Example ]
};


const game = new Phaser.Game(config);
