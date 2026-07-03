/**
 * REKABETÇİ ŞEHİR/ÇİFTLİK OYUNU - MİKRO MODÜL 1 - 3 (GitHub Pages Uyumlu Sürüm)
 * Modül 1: Phaser 3 Canvas kurulumu ve mobil ölçekleme (FIT).
 * Modül 2: HTML5 Web Audio Context Güvenlik Kilidi.
 * Modül 3: Güvenli Geri Sayımlı Yükleme Ekranı ve Grafik İlerleme Çubuğu.
 */

// MODÜL 3: Yükleme ve Hazırlık Sahnesi (GitHub Uyumlu)
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.cameras.main.setBackgroundColor('#1a202c'); // Koyu arka plan

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Yükleniyor Yazısı
        this.loadingText = this.add.text(width / 2, height / 2 - 50, 'Varlıklar Yükleniyor...', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Yüzde Yazısı
        this.percentText = this.add.text(width / 2, height / 2, '0%', {
            font: '18px Arial',
            fill: '#f6ad55'
        }).setOrigin(0.5);

        // Yükleme Çubuğu Arka Planı (Gri Kutu)
        let progressBg = this.add.graphics();
        progressBg.fillStyle(0x4a5568, 1);
        progressBg.fillRect(width / 2 - 100, height / 2 + 30, 200, 20);

        // Dinamik Dolan Yükleme Çubuğu (Turuncu Kutu)
        this.progressBar = this.add.graphics();

        // GitHub Pages üzerinde takılmayı önlemek için zamana bağlı güvenli yükleme simülasyonu
        let progressValue = 0;
        
        this.time.addEvent({
            delay: 30, // Her 30 milisaniyede bir barı doldur (Yaklaşık 1.5 saniye sürer)
            callback: () => {
                progressValue += 0.02; // İlerleme adım büyüklüğü
                
                // Geliştirilmiş Koşul Bloğu (Taşma engelleme ve Erken Dönüş)
                if (progressValue >= 1) {
                    progressValue = 1;
                    
                    // Son kez arayüzü %100 olarak güncelle ve çiz
                    this.percentText.setText('100%');
                    this.progressBar.clear();
                    this.progressBar.fillStyle(0xdd6b20, 1);
                    this.progressBar.fillRect(width / 2 - 100, height / 2 + 30, 200, 20);
                    
                    console.log("Yükleme başarıyla tamamlandı, sahne değiştiriliyor.");
                    this.scene.start('GameScene');
                    return;
                }

                // Normal İlerleme Çizimi
                this.percentText.setText(parseInt(progressValue * 100) + '%');
                this.progressBar.clear();
                this.progressBar.fillStyle(0xdd6b20, 1);
                this.progressBar.fillRect(width / 2 - 100, height / 2 + 30, 200 * progressValue, 20);
            },
            repeat: 49// Toplamda 50 adımda %100'e ulaşır
        });
    }

    create() {
        // Zamanlayıcı geçişi yönettiği için burası boş kalabilir
    }
}

// Ana Oyun Sahnesi (Modül 1 ve 2 Özellikleri Korunuyor)
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.cameras.main.setBackgroundColor('#2d3748');

        this.statusText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 
            '✅ Modül 3: Yükleme Tamamlandı!\nAna Sahne Kesin Olarak Aktif.\n\nSes Kilidi İçin Dokunun.', {
            font: 'bold 16px Arial',
            fill: '#48bb78',
            align: 'center'
        }).setOrigin(0.5);

        // Modül 2'den gelen ses kilidi mekanizması eksiksiz korunuyor
        this.input.once('pointerdown', () => {
            if (this.sound && this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
            this.statusText.setText('✅ Modül 3: Sistem Hazır!\n(Yükleme ve Ses Başarılı)');
        });

        console.log("Modül 3 Başarıyla Çalıştı: GitHub Pages uyumlu güvenli geçiş yapıldı.");
    }
}

// Phaser 3 Konfigürasyon Ayarları (Modül 1 Korunuyor)
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 360,
    height: 640,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, GameScene]
};

const game = new Phaser.Game(config);
