/**
 * REKABETÇİ ŞEHİR/ÇİFTLİK OYUNU - MİKRO MODÜL 1 - 3
 * Modül 1: Phaser 3 Canvas kurulumu ve mobil ölçekleme (FIT).
 * Modül 2: HTML5 Web Audio Context Güvenlik Kilidi.
 * Modül 3: Boot / Yükleme Ekranı ve Grafik İlerleme Çubuğu (Preloader).
 */

// MODÜL 3: Yükleme ve Hazırlık Sahnesi
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.cameras.main.setBackgroundColor('#1a202c'); // Koyu arka plan

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Yükleniyor Yazısı
        let loadingText = this.add.text(width / 2, height / 2 - 50, 'Varlıklar Yükleniyor...', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Yüzde Yazısı
        let percentText = this.add.text(width / 2, height / 2, '0%', {
            font: '18px Arial',
            fill: '#f6ad55'
        }).setOrigin(0.5);

        // Yükleme Çubuğu Arka Planı (Gri Kutu)
        let progressBg = this.add.graphics();
        progressBg.fillStyle(0x4a5568, 1);
        progressBg.fillRect(width / 2 - 100, height / 2 + 30, 200, 20);

        // Dinamik Dolan Yükleme Çubuğu (Turuncu Kutu)
        let progressBar = this.add.graphics();

        // Phaser'ın yükleme ilerleme (progress) dinleyicisi
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xdd6b20, 1);
            // İlerlemeye göre turuncu barın genişliğini artır
            progressBar.fillRect(width / 2 - 100, height / 2 + 30, 200 * value, 20);
        });

        // Yükleme tamamlandığında tetiklenecek event
        this.load.on('complete', () => {
            loadingText.destroy();
            percentText.destroy();
            progressBar.destroy();
            progressBg.destroy();
            
            // Ana oyun sahnesine güvenli geçiş yap
            this.scene.start('GameScene');
        });

        // Modül 3'te henüz büyük asset'ler olmadığı için 
        // yükleme çubuğunun doluşunu simüle etmek adına sahte küçük dosyalar yüklüyoruz
        for (let i = 0; i < 25; i++) {
            this.load.image('fake_asset_' + i, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
        }
    }

    create() {
        // Preload içindeki 'complete' eventi sahneyi değiştireceği için burası boş kalabilir
    }
}

// Ana Oyun Sahnesi
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.cameras.main.setBackgroundColor('#2d3748');

        this.statusText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 
            '✅ Modül 3: Yükleme Tamamlandı!\nAna Sahne Aktif.\n\nSes Kilidi İçin Dokunun.', {
            font: 'bold 16px Arial',
            fill: '#48bb78',
            align: 'center'
        }).setOrigin(0.5);

        // Modül 2'den gelen ses kilidi mekanizmasını koruyoruz
        this.input.once('pointerdown', () => {
            if (this.sound && this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
            this.statusText.setText('✅ Modül 3: Sistem Hazır!\n(Yükleme ve Ses Başarılı)');
        });

        console.log("Modül 3 Başarıyla Çalıştı: Geçiş sahnesi tamamlandı.");
    }
}

// Phaser 3 Konfigürasyon Ayarları
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 360,
    height: 640,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    // ÖNEMLİ: BootScene ilk sırada olmalı ki oyun onunla başlasın
    scene: [BootScene, GameScene]
};

const game = new Phaser.Game(config);
