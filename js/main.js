
        let app = new Vue({
            el: '.main',
            data: {
                showMain: true,
                showSocial: false,
                showAchivments: false,
                showQuestions: false,
                showResult: false,
                number: 0,
                score: {
                    'dementor': 0,
                    'muggle': 0,
                    'wizardkind': 0,
                 
                },
                totalGame: localStorage.getItem('sc2TotalGame') ? JSON.parse(localStorage.getItem('sc2TotalGame')) : {
                    'dementor': 0,
                    'muggle': 0,
                    'wizardkind': 0,
                },
                totalGames: localStorage.getItem('sc2TotalGames') ? localStorage.getItem('sc2TotalGames') : 0,
                questions: questions,
                results: results,
                resultMagic: 'wizardkind',
            },
            methods: {
                goToMain() {
                 this.showMain = true
                 this.showSocial = false
                 this.showAchivments = false
                 this.showQuestions = false
                 this.showResult = false
                },
                goToSocial() {
                 this.showMain = false
                 this.showSocial = true
                 this.showAchivments = false
                 this.showQuestions = false
                 this.showResult = false   
                },
                goToAchivments() {
                 if(this.totalGames > 0) {
                 this.showMain = false
                 this.showSocial = false
                 this.showAchivments = true
                 this.showQuestions = false
                 this.showResult = false
                 } else {
                    this.goToQuestions()
                 } 
                   
                },
                goToQuestions() {
                    this.score = {
                        'dementor': 0,
                        'muggle': 0,
                        'wizardkind': 0
                },
                 this.showMain = false
                 this.showSocial = false
                 this.showAchivments = false
                 this.showQuestions = true
                 this.showResult = false
                },
                goToResults(magic) {
                this.showMain = false
                 this.showSocial = false
                 this.showAchivments = false
                 this.showQuestions = false
                 this.showResult = true
                 this.resultMagic = magic
                },
                nextQuestions(answer) {
                    if(this.number == 6) {
                        this.number = 0
                        this.endGame();
                    } else {
                        this.number++
                    }
                    eval(answer)
                },
                endGame() {
                    this.totalGames++;
                    localStorage.setItem('sc2TotalGames', this.totalGames)
                    //Дементор
                    if(this.score.dementor > this.score.muggle && this.score.dementor > this.score.wizardkind) {
                        this.goToResults('dementor')
                        this.totalGame.dementor++
                    }
                    //Маггл
                    else if (this.score.muggle > this.score.dementor) {
                        this.goToResults('muggle')
                        this.totalGame.muggle++
                    }
                    //Волшебник
                    else if (this.score.wizardkind > this.score.dementor) {
                        this.goToResults('wizardkind')
                        this.totalGame.wizardkind++
                    }
                    
                    localStorage.setItem('sc2TotalGame',  JSON.stringify(this.totalGame));
                }
            },
            computed: {
                totalScore() {
                    let score=0
                    for(let i in this.totalGame) {
                        score+=(this.totalGame[i]*results[i].points)
                    }
                    return score
                },
                openMagics() {
                    let count=0
                    for(let i in this.totalGame) {
                        if(this.totalGame[i]>0) count++
                    }
                    return count
                },
                favoriteMagic() {
                    let max='dementor'
                    for(let i in this.totalGame) {
                        if(this.totalGame[i]>this.totalGame[max]) {
                            max=i
                        }
                    }
                    return results[max].name
                },
                showResultMagic() {
                    return {
                        'dementor': this.totalGame.dementor > 0 ? true : false,
                        'muggle': this.totalGame.muggle > 0 ? true : false,
                        'wizardkind': this.totalGame.wizardkind > 0 ? true : false,
                        }
                }
            }
        })

        // let audio = new Audio('audio/soundtrack.mp3')
        // let audio_btn = document.querySelector('.btn__sound')
        // let audio_icon = document.querySelector('.btn__sound i')

        // audio.muted = true;
        // audio.autoplay = true;
        // audio.volume = 0.2

        // audio.addEventListener('loadmetadata', function() {
        //     audio.currentTime = 0 + Math.random() * (audio.duration + 1 -0)
        // })

        // audio_btn.addEventListener('click', function() {
        //     if(audio.muted) {
        //         audio.muted = false
        //         audio_icon.classList.add('fa-volume-up')
        //         audio_icon.classList.remove('fa-volume-off')
        //     } else if(!audio.muted) {
        //         audio.muted = true
        //         audio_icon.classList.add('fa-volume-off')
        //         audio_icon.classList.remove('fa-volume-up')
        //     }
        // })