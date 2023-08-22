const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const isPlaying = false
const progress = $('#progress')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    arrCheckRandom: [],
    songs: [
        {
            name: 'Có ai hẹn hò cùng em chưa',
            singer: 'Quân A.P',
            path: './assets/css/mp3/song1.mp3',
            img: './assets/css/img/song1.jpg'
        }, {
            name: 'Quả phụ tướng',
            singer: 'DUNGHOANGPHAM ft REYVIN',
            path: './assets/css/mp3/song2.mp3',
            img: './assets/css/img/song2.jpg'
        }, {
            name: 'Có duyên không nợ',
            singer: '...',
            path: './assets/css/mp3/song3.mp3',
            img: './assets/css/img/song3.jpg'
        }, {
            name: 'Giá Như Anh Là Người Vô Tâm ft Đáy Biển Remix ',
            singer: '...',
            path: './assets/css/mp3/song4.mp3',
            img: './assets/css/img/song4.jpg'
        }, {
            name: 'TÁT NHẬT LÃNG RỰC RỠ',
            singer: 'Fanny cover',
            path: './assets/css/mp3/song5.mp3',
            img: './assets/css/img/song5.jpg'
        }, {
            name: 'Khóc cho người ai khóc cho em',
            singer: 'Hana Cẩm Tiên',
            path: './assets/css/mp3/song6.mp3',
            img: './assets/css/img/song6.jpg'
        }, {
            name: 'Cô Gái Này Là Của Ai',
            singer: 'Đoàn Quốc Vinh',
            path: './assets/css/mp3/song7.mp3',
            img: './assets/css/img/song7.jpg'
        }, {
            name: 'Ngày Em Đẹp Nhất',
            singer: '...',
            path: './assets/css/mp3/song8.mp3',
            img: './assets/css/img/song8.jpg'
        }, {
            name: 'Mẹ a bán bánh mì ',
            singer: 'Phúc du',
            path: './assets/css/mp3/song9.mp3',
            img: './assets/css/img/song9.jpg'
        }, {
            name: '',
            singer: '',
            path: './assets/css/mp3/song10.mp3',
            img: './assets/css/img/song10.jpg'
        }, {
            name: '',
            singer: '',
            path: './assets/css/mp3/song11.mp3',
            img: './assets/css/img/song11.jpg'
        }, {
            name: '',
            singer: '',
            path: './assets/css/mp3/song12.mp3',
            img: './assets/css/img/song12.jpg'
        }, {
            name: '',
            singer: '',
            path: './assets/css/mp3/song13.mp3',
            img: './assets/css/img/song13.jpg'
        }, {
            name: '',
            singer: '',
            path: './assets/css/mp3/song14.mp3',
            img: './assets/css/img/song14.jpg'
        }, {
            name: '',
            singer: '',
            path: './assets/css/mp3/song15.mp3',
            img: './assets/css/img/song15.jpg'
        }, {
            name: '',
            singer: '',
            path: './assets/css/mp3/song16.mp3',
            img: './assets/css/img/song16.jpg'
        }, {
            name: '',
            singer: '',
            path: './assets/css/mp3/song17.mp3',
            img: './assets/css/img/song17.jpg'
        },
        {
            name: '',
            singer: '',
            path: './assets/css/mp3/song18.mp3',
            img: './assets/css/img/song18.jpg'
        }, {
            name: '',
            singer: '',
            path: './assets/css/mp3/song19.mp3',
            img: './assets/css/img/song19.jpg'
        }, {
            name: '',
            singer: '',
            path: './assets/css/mp3/song20.mp3',
            img: './assets/css/img/song20.jpg'
        },
    ],
    render: function () {
        const _this = this;
        const htmls = this.songs.map((song, index) => {
            return `
                    <div class="song ${index === 0 ? 'active' : ''}" data-index=${index}>
                        <div class="thumb" 
                            style="background-image: url('${song.img}');">
                    </div>
                        <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                     </div>
                    <div class="option">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
                `
        })
        $('.playlist').innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth
        // Xử lý quay cd
        const cdThumbAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        // sử lý phóng to thu nhỏ
        document.onscroll = function () {
            const scrollTop = window.screenY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
        // sử lý bấm play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        // bấm tiếp tục
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // bấm dừng
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercentage = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercentage
            }
        }
        progress.onchange = function (e) {
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
        }
        // Bấm nút next 
        btnNext.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.scrollToActiveSong()
        }
        // Bấm nút prev
        btnPrev.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.scrollToActiveSong()
        }
        // Bấm nút isRandom
        btnRandom.onclick = function () {
            _this.isRandom = !_this.isRandom
            btnRandom.classList.toggle('active', _this.isRandom)
            _this.randomSong()
        }
        // Bấm nút repeat
        btnRepeat.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            btnRepeat.classList.toggle('active', _this.isRepeat)
        }
        // sử lý sợ kiện khi song end
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                btnNext.onclick()
            }
        }
        // lắng nghe khi bấm vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || (e.target.closest('.option'))) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    console.log(_this.currentIndex);
                    _this.loadCurrentSong()
                    _this.addSongActive(_this.currentIndex)
                    audio.play()
                }
                if (e.target.closest('.option')) {

                    if (e.target.classList.contains('fa-ellipsis')) {
                        e.target.classList.remove('fa-ellipsis')
                        e.target.classList.add('fa-heart')
                    } else {
                        e.target.classList.add('fa-ellipsis')
                    }

                }


            }

        }
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.img})`
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
        this.addSongActive(this.currentIndex)
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
        this.addSongActive(this.currentIndex)
    },
    randomSong: function () {
        // Kiểm tra điều kiện trước khi vào vòng lặp
        if (this.songs.length > 1) {
            // Đổi thứ tự của hai dòng này
            do {
                this.currentIndex = Math.floor(Math.random() * this.songs.length);
            } while (this.arrCheckRandom.includes(this.currentIndex))
            // Thêm điều kiện này để không quá tải mảng
            if (this.arrCheckRandom.length === this.songs.length - 1) {
                this.arrCheckRandom = [];
            }
            this.arrCheckRandom.push(this.currentIndex);
            this.loadCurrentSong();
            this.addSongActive(this.currentIndex);
            audio.play();
        }
    },
    addSongActive: function (index) {
        // Xóa các class active của các dòng
        let elementActive = $('.song.active');
        elementActive.classList.remove('active');
        let newElementActive = $('.song:nth-child(' + (index + 1) + ')');
        newElementActive.classList.add('active');
    }
    ,

    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.active.song').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }, 200)
    }
    ,
    start: function () {
        // Định các thuộc tính 
        this.defineProperties()
        // Lắng  nghe các sự kiện
        this.handleEvents()
        this.loadCurrentSong()
        // render lại danh sách
        this.render()

    }

}
app.start()