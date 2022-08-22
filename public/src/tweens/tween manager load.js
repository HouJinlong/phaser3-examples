class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('bg', 'assets/skies/space2.png');
        this.load.image('star', 'assets/sprites/chunk.png');
    }

    create ()
    {
        this.add.image(400, 300, 'bg');

        this.stars = [];

        let x = 0;
        let y = 70;

        for (let i = 0; i < 70000; i++)
        {
            this.stars.push(this.add.image(x, y, 'star').setAlpha(0));

            x += 2;

            if (x >= 800)
            {
                x = 0;
                y += 3;
            }
        }

        this.i = this.stars.length - 1;

        this.text = this.add.text(16, 16).setFontSize(16).setColor('#ffffff');

        //  Create hundreds of short-lived tweens
        this.time.addEvent({ delay: 50, callback: this.createTweens, callbackScope: this, loop: true });

        this.input.on('pointerdown', () => {
            this.tweens.paused = (this.tweens.paused) ? false : true;
        });
    }

    update ()
    {
        if (Phaser.VERSION === '3.55.2')
        {
            this.text.setText([
                'Active tweens: ' + this.tweens._active.length,
                'Pending tweens: ' + this.tweens._pending.length
            ]);
        }
        else
        {
            const stats = this.tweens.getTotal();

            this.text.setText([
                'Active tweens: ' + stats.active
            ]);
        }
    }

    createTweens ()
    {
        if (!this.tweens.paused)
        {
            for (let i = 0; i < 1000; i++)
            {
                this.createTween();
            }
        }
    }

    createTween ()
    {
        const duration = Phaser.Math.Between(200, 1200);

        const star = this.stars[this.i];

        this.add.tween({
            targets: star,
            alpha: 1,
            duration,
            yoyo: true,
            ease: 'Linear'
        });

        this.i--;

        if (this.i === -1)
        {
            this.i = this.stars.length - 1;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
