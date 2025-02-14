const body = document.body;
var audio = new Audio();

const globals = {
    levels: ["5x5", "10x10", "15x15", "random", "last game"],
    games: [
        ["heart", "hat", "cross", "Tower", "Tower"],
        ["bird", "cat", "Deer", "Duck", "House"],
        ["Death", "Horse", "Fish", "Ram", "Anchor"]
    ],
    what_theme: "dark",
    buttons: [
        {
            title: "menu",
            svg: `<svg fill="currentcolor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"><path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path></svg>`,
            unavailable: true,
            func: () => {
                game_data.level = 0;
                game_data.game = 0;
                audio.src = 'assets/sounds/menu1.mp3';
                audio.volume = 0.7;
                if (globals.canPlay) audio.play()
                if (document.getElementById("winwindow__wrapper")) document.getElementById("winwindow__wrapper").remove();
                if (document.getElementById("game__wrapper")) document.getElementById("game__wrapper").remove();
                document.getElementById("header__wrapper").remove();
                build_header();
                build_menu();
                clearInterval(globals.timer);
                globals.isStarted = false;
                globals.isDownloaded = false;
            }
        },
        {
            title: "theme",
            svg: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M215 617 c-113 -45 -182 -127 -205 -245 -18 -95 18 -207 89 -276 182 -175 483 -80 530 168 11 59 -1 67 -42 28 -107 -103 -276 -72 -338 63 -35 76 -16 178 45 234 14 14 26 28 26 33 0 12 -70 8 -105 -5z m9 -72 c-21 -42 -25 -61 -22 -116 5 -85 42 -150 113 -194 43 -26 57 -30 124 -30 61 0 84 4 115 23 21 13 40 21 42 19 10 -9 -51 -110 -84 -138 -110 -97 -283 -95 -385 4 -57 56 -80 108 -85 189 -6 90 17 155 74 213 36 38 122 91 131 81 1 -1 -9 -24 -23 -51z"/></g></svg>`,
            unavailable: false,
            func: () => {
                const but = document.getElementById("theme");
                if (globals.what_theme === "dark") {
                    audio.src = 'assets/sounds/theme2.mp3';
                    audio.volume = 0.7;
                    if (globals.canPlay) audio.play()
                    but.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M294 617 c-3 -9 -4 -28 -2 -44 2 -22 8 -28 28 -28 23 0 25 4 25 40 0 34 -3 40 -23 43 -13 2 -24 -3 -28 -11z" /><path d="M100 535 c-18 -22 13 -67 43 -63 31 4 34 42 5 62 -28 20 -32 20 -48 1z" /><path d="M492 534 c-29 -20 -26 -58 5 -62 30 -4 61 41 43 63 -16 19 -20 19 -48 -1z" /><path d="M242 451 c-96 -61 -96 -202 0 -261 20 -12 51 -20 78 -20 142 0 203 170 96 269 -37 35 -127 41 -174 12z m143 -66 c19 -18 25 -35 25 -65 0 -56 -34 -90 -90 -90 -30 0 -47 6 -65 25 -19 18 -25 35 -25 65 0 56 34 90 90 90 30 0 47 -6 65 -25z" /><path d="M14 336 c-12 -31 4 -47 43 -44 33 3 38 6 38 28 0 22 -5 25 -38 28 -26 2 -39 -1 -43 -12z" /><path d="M544 336 c-12 -31 4 -47 43 -44 33 3 38 6 38 28 0 22 -5 25 -38 28 -26 2 -39 -1 -43 -12z" /><path d="M104 145 c-16 -24 -16 -28 -1 -42 14 -15 18 -15 42 1 18 12 25 24 23 39 -5 33 -43 34 -64 2z" /><path d="M477 163 c-15 -14 -6 -43 19 -59 23 -16 27 -16 41 -1 15 14 15 18 -1 41 -16 25 -45 34 -59 19z" /><path d="M294 87 c-3 -9 -4 -28 -2 -44 2 -22 8 -28 28 -28 23 0 25 4 25 40 0 34 -3 40 -23 43 -13 2 -24 -3 -28 -11z" /></g></svg>`;
                    globals.what_theme = "light";
                    document.documentElement.style.setProperty("--accent-color", "#21201f");
                    body.style.background = "linear-gradient(40deg,rgb(246, 230, 196), #fbf0d8 )";
                } else {
                    audio.src = 'assets/sounds/gay-echo.mp3';
                    audio.volume = 0.7;
                    if (globals.canPlay) audio.play()
                    but.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M215 617 c-113 -45 -182 -127 -205 -245 -18 -95 18 -207 89 -276 182 -175 483 -80 530 168 11 59 -1 67 -42 28 -107 -103 -276 -72 -338 63 -35 76 -16 178 45 234 14 14 26 28 26 33 0 12 -70 8 -105 -5z m9 -72 c-21 -42 -25 -61 -22 -116 5 -85 42 -150 113 -194 43 -26 57 -30 124 -30 61 0 84 4 115 23 21 13 40 21 42 19 10 -9 -51 -110 -84 -138 -110 -97 -283 -95 -385 4 -57 56 -80 108 -85 189 -6 90 17 155 74 213 36 38 122 91 131 81 1 -1 -9 -24 -23 -51z"/></g></svg>`;
                    globals.what_theme = "dark";
                    document.documentElement.style.setProperty("--accent-color", "#fbf0d8");
                    body.style.background = "linear-gradient(40deg, rgb(27, 26, 26)15%, rgb(49, 49, 49)62%)";
                }
            },
            id: true
        },
        {
            title: "reset",
            svg: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M224 616 c-115 -36 -209 -151 -216 -266 -4 -56 18 -66 27 -13 12 76 38 128 90 180 102 101 238 109 360 22 l48 -34 -44 -5 c-78 -9 -41 -36 54 -39 l38 -1 -3 67 c-2 42 -8 68 -15 71 -9 2 -13 -8 -13 -32 l0 -36 -45 35 c-79 60 -189 80 -281 51z"/><path d="M600 302 c0 -86 -77 -197 -165 -238 -98 -46 -237 -23 -304 50 l-24 26 41 0 c31 0 42 4 42 15 0 20 -128 22 -135 3 -7 -21 9 -118 20 -121 6 -1 11 13 13 31 l3 32 33 -25 c162 -123 388 -71 476 110 30 62 40 145 16 145 -11 0 -16 -9 -16 -28z"/></g></svg>`,
            unavailable: true,
            func: () => {
                var audio1 = new Audio();
                audio1.src = 'assets/sounds/reset.mp3';
                audio1.volume = 0.7;
                if (globals.canPlay) audio1.play()
                if (document.getElementById("game__wrapper")) document.getElementById("game__wrapper").remove();
                if (document.getElementById("winwindow__wrapper")) document.getElementById("winwindow__wrapper").remove();
                build_game();
                clearInterval(globals.timer);
                globals.isStarted = false;
                const head_buttons = document.getElementsByClassName("buttons__box")[0].getElementsByTagName("button");
                for (let i = 3; i < 5; i++) head_buttons[i].classList.remove("unavailable");
            }
        },
        {
            title: "solution",
            svg: `<svg fill="currentcolor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path></svg>`,
            unavailable: true,
            func: () => {
                audio.src = 'assets/sounds/solution1.mp3';
                audio.volume = 0.7;
                if (globals.canPlay) audio.play()

                const picture = globals.pictures[game_data.level][game_data.game];

                for (let q = 0; q < picture.length; q++) {
                    for (let w = 0; w < picture[q].length; w++) {
                        for (let e = 0; e < 5; e++) {
                            for (let r = 0; r < 5; r++) {
                                const elem = document.getElementsByClassName("table_tr")[q].getElementsByClassName("area__5x5")[w].getElementsByTagName("table")[0].getElementsByTagName("tr")[e].getElementsByTagName("td")[r];
                                elem.innerText = '';
                                if (picture[q][w][e][r]) elem.classList.add("filled");
                                else elem.classList.remove("filled");
                            }
                        }
                    }
                }

                clearInterval(globals.timer);
                globals.isStarted = false;
                const head_buttons = document.getElementsByClassName("buttons__box")[0].getElementsByTagName("button");
                for (let i = 3; i < 5; i++) head_buttons[i].classList.add("unavailable");
                const result = document.getElementsByClassName("cells_table")[0].innerHTML;
                document.getElementById("game__wrapper").remove();

                build_losewindow(result);
            }
        },
        {
            title: "save game",
            svg: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M44 447 c-2 -7 -3 -100 -2 -207 l3 -195 205 0 205 0 3 164 3 165 -43 43 -42 43 -163 0 c-124 0 -165 -3 -169 -13z m78 -79 l3 -73 120 0 120 0 3 69 3 69 34 -33 35 -34 0 -153 0 -153 -30 0 -29 0 -3 88 -3 87 -125 0 -125 0 -3 -87 -3 -88 -29 0 -30 0 0 190 0 190 30 0 29 0 3 -72z m228 7 l0 -65 -105 0 -105 0 0 65 0 65 105 0 105 0 0 -65z m10 -235 l0 -80 -110 0 -110 0 0 80 0 80 110 0 110 0 0 -80z"/><path d="M80 90 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/><path d="M400 90 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/><path d="M280 375 c0 -41 2 -45 25 -45 23 0 25 4 25 45 0 41 -2 45 -25 45 -23 0 -25 -4 -25 -45z m27 -12 c-3 -10 -5 -4 -5 12 0 17 2 24 5 18 2 -7 2 -21 0 -30z"/></g></svg>`,
            unavailable: true,
            func: () => {
                audio.src = 'assets/sounds/save1.mp3';
                audio.volume = 0.7;
                if (globals.canPlay) audio.play()
                localStorage.setItem('copy', JSON.stringify(game_data));
                build_massage("Succesfully saved!")
            }
        },
        {
            title: "liderbord",
            svg: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M289 610 c-20 -26 -27 -29 -60 -24 -20 3 -39 2 -42 -3 -3 -5 -1 -28 4 -52 7 -31 6 -47 -2 -57 -9 -11 -8 -18 1 -29 10 -12 38 -15 129 -15 124 0 148 8 130 41 -6 12 -6 33 0 61 5 23 7 46 4 51 -3 5 -22 6 -42 3 -33 -5 -40 -2 -60 24 -12 17 -26 30 -31 30 -5 0 -19 -13 -31 -30z m49 -60 c7 -12 23 -20 38 -20 21 0 25 -4 22 -22 -3 -22 -8 -23 -78 -23 -70 0 -75 1 -78 23 -3 18 1 22 22 22 15 0 31 8 38 20 7 11 15 20 18 20 3 0 11 -9 18 -20z"/><path d="M223 383 c-10 -3 -13 -51 -13 -188 0 -157 2 -184 16 -189 20 -8 168 -8 188 0 14 5 16 31 16 189 0 158 -2 184 -16 189 -19 7 -173 7 -191 -1z m167 -188 l0 -145 -70 0 -70 0 0 145 0 145 70 0 70 0 0 -145z"/><path d="M12 308 c-17 -17 -17 -279 0 -296 14 -14 136 -16 156 -4 9 7 12 45 10 158 l-3 149 -75 3 c-50 2 -79 -1 -88 -10z m128 -148 l0 -110 -45 0 -45 0 0 110 0 110 45 0 45 0 0 -110z"/><path d="M467 263 c-4 -3 -7 -61 -7 -129 0 -102 3 -123 16 -128 28 -11 140 -6 152 6 13 13 17 212 6 242 -5 13 -22 16 -83 16 -43 0 -81 -3 -84 -7z m123 -123 l0 -90 -45 0 -45 0 0 90 0 90 45 0 45 0 0 -90z"/></g></svg>`,
            unavailable: false,
            func: () => {
                audio.src = 'assets/sounds/leaders.mp3';
                audio.volume = 0.3;
                if (globals.canPlay) audio.play()

                build_leaderboard()
            }
        },
        {
            title: "quations",
            svg: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M225 616 c-57 -26 -112 -105 -99 -141 7 -17 39 -29 54 -20 6 4 19 24 30 45 47 92 173 93 216 2 23 -49 11 -81 -58 -148 -66 -65 -88 -104 -88 -159 0 -35 1 -36 31 -33 28 3 33 8 45 47 9 31 31 63 72 105 71 73 84 95 84 150 1 52 -22 97 -69 133 -31 24 -47 28 -112 31 -49 1 -87 -3 -106 -12z"/><path d="M280 71 c-16 -31 4 -63 37 -59 34 4 52 32 37 56 -16 26 -60 28 -74 3z"/></g></svg>`,
            unavailable: false,
            func: () => {
                audio.src = 'assets/sounds/quat.mp3';
                audio.volume = 0.7;
                if (globals.canPlay) audio.play()

                build_quations()
            }
        },
        {
            title: "sound",
            svg: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="32.000000pt" height="32.000000pt" viewBox="0 0 32.000000 32.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M120 265 c-32 -26 -67 -45 -85 -47 -29 -3 -30 -4 -30 -58 0 -54 1-55 30 -58 17 -2 55 -23 87 -48 31 -24 59 -44 62 -44 3 0 6 68 6 150 0 83 -3 150 -7 150 -5 -1 -33 -21 -63 -45z m48 -161 l-3 -56 -37 29 c-35 26 -37 31-37 83 0 52 2 57 37 83 l37 29 3 -56 c2 -31 2 -81 0 -112z m-108 56 c0 -33 -3-40 -20 -40 -17 0 -20 7 -20 40 0 33 3 40 20 40 17 0 20 -7 20 -40z"/><path d="M260 258 c0 -6 8 -20 17 -30 23 -25 23 -111 0 -136 -18 -20 -23 -42-9 -42 15 0 52 78 52 110 0 18 -10 50 -22 71 -21 38 -38 50 -38 27z"/><path d="M230 228 c0 -9 5 -20 10 -23 6 -3 10 -24 10 -45 0 -21 -4 -42 -10-45 -5 -3 -10 -14 -10 -23 0 -14 3 -13 21 5 30 29 30 97 0 126 -18 18 -21 19-21 5z"/></g></svg>`,
            unavailable: false,
            func: () => {
                globals.canPlay = !globals.canPlay;
                audio.volume = 0
                const icon = document.getElementsByClassName("buttons__box")[0].getElementsByTagName("button")[7];
                icon.innerHTML = globals.canPlay ? `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="32.000000pt" height="32.000000pt" viewBox="0 0 32.000000 32.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M120 265 c-32 -26 -67 -45 -85 -47 -29 -3 -30 -4 -30 -58 0 -54 1-55 30 -58 17 -2 55 -23 87 -48 31 -24 59 -44 62 -44 3 0 6 68 6 150 0 83 -3 150 -7 150 -5 -1 -33 -21 -63 -45z m48 -161 l-3 -56 -37 29 c-35 26 -37 31-37 83 0 52 2 57 37 83 l37 29 3 -56 c2 -31 2 -81 0 -112z m-108 56 c0 -33 -3-40 -20 -40 -17 0 -20 7 -20 40 0 33 3 40 20 40 17 0 20 -7 20 -40z"/><path d="M260 258 c0 -6 8 -20 17 -30 23 -25 23 -111 0 -136 -18 -20 -23 -42-9 -42 15 0 52 78 52 110 0 18 -10 50 -22 71 -21 38 -38 50 -38 27z"/><path d="M230 228 c0 -9 5 -20 10 -23 6 -3 10 -24 10 -45 0 -21 -4 -42 -10-45 -5 -3 -10 -14 -10 -23 0 -14 3 -13 21 5 30 29 30 97 0 126 -18 18 -21 19-21 5z"/></g></svg>` : '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="32.000000pt" height="32.000000pt" viewBox="0 0 32.000000 32.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M126 275 c-43 -32 -69 -45 -93 -45 l-33 0 0 -70 0 -70 33 0 c24 0 50-13 93 -45 32 -24 62 -45 67 -45 4 0 7 72 7 160 0 88 -3 160 -7 160 -5 0 -35-21 -67 -45z m54 -115 l0 -130 -50 37 c-50 37 -50 38 -50 93 0 55 1 56 48 92 26 20 48 37 50 37 1 1 2 -58 2 -129z m-120 0 c0 -43 -3 -50 -20 -50 -17 0 -20 7 -20 50 0 43 3 50 20 50 17 0 20 -7 20 -50z"/><path d="M240 205 c0 -3 6 -14 12 -25 10 -16 10 -24 0 -41 -17 -27 -5 -40 14-15 14 20 14 20 28 0 19 -25 31 -12 14 15 -11 17 -11 25 0 42 18 28 5 40 -14 14 -14 -19 -16 -19 -25 -2 -9 16 -29 24 -29 12z"/></g></svg>'
            }
        }
    ],
    menu_functions: {
        play: () => {
            var audio1 = new Audio();
            audio1.src = 'assets/sounds/click7.mp3';
            audio1.volume = 0.7;
            audio1.preload = 'auto';
            if (globals.canPlay) audio1.play()
            document.getElementById("menu__wrapper").remove();
            if (game_data.level === 3) {
                game_data.level = Math.floor(Math.random() * 2);
                game_data.game = Math.floor(Math.random() * 4);
            } else if (game_data.level === 4) {
                globals.isDownloaded = true;
            }
            const buttons = document.getElementsByClassName("buttons__box")[0].getElementsByTagName("button");
            buttons[0].classList.remove("unavailable");
            build_game();   
            for (let i = 0; i < 7; i++) {
                buttons[i].classList.remove("unavailable");
            }
        },
        choose_level: (n, isCreated = true) => {
            var audio2 = new Audio();
            audio2.src = 'assets/sounds/click2.mp3';
            audio2.volume = 0.7;
            audio2.preload = 'auto';
            if (globals.canPlay) audio2.play();
            const html_levels = document.getElementsByClassName("levels__wrapper")[0].getElementsByTagName("button");
            html_levels[game_data.level].classList.remove("active");
            html_levels[n].classList.add("active")
            game_data.level = n;
            if (n < 3) {
                const games__scroll__buttons = document.getElementsByClassName("games__scroll")[0].getElementsByTagName("button");
                for (let j = 0; j < 5; j++) {
                    games__scroll__buttons[j].innerHTML = globals.games[game_data.level][j];
                }
            }
            if (n < 3 && isCreated) document.getElementById("carusel").classList.add("scrolled");
        },
        choose_game: (n) => {
            const html_games = document.getElementsByClassName("games__scroll")[0].getElementsByTagName("button");
            html_games[game_data.game].classList.remove("active");
            html_games[n].classList.add("active");
            game_data.game = n;
            var audio1 = new Audio();
            audio1.src = 'assets/sounds/click5.mp3';
            audio1.volume = 0.7;
            audio1.preload = 'auto';
            if (globals.canPlay) audio1.play()
        },
        menu_back: () => {
            var audio2 = new Audio();
            document.getElementById("carusel").classList.remove("scrolled");
            audio2.src = 'assets/sounds/click6.mp3';
            audio2.volume = 0.7;
            audio2.preload = 'auto';
            if (globals.canPlay) audio2.play()
        }
    },
    pictures: [//в нем лежат три массива с уровнями 5,10,15
        [//5x5
            [//picture of heart
                [
                    [
                        [0, 1, 0, 1, 0],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [0, 1, 1, 1, 0],
                        [0, 0, 1, 0, 0],
                    ]
                ]
            ],
            [//picture of hat
                [
                    [
                        [0, 1, 1, 1, 0],
                        [0, 1, 1, 1, 0],
                        [0, 1, 1, 1, 0],
                        [0, 1, 1, 1, 0],
                        [1, 1, 1, 1, 1]
                    ]
                ]
            ],
            [//picture of cross
                [
                    [
                        [0, 0, 1, 0, 0],
                        [0, 1, 0, 1, 0],
                        [0, 0, 1, 0, 0],
                        [1, 0, 1, 0, 1],
                        [1, 1, 1, 1, 1]
                    ]
                ]
            ],
            [//picture of tower
                [
                    [
                        [1, 0, 1, 0, 1],
                        [1, 1, 1, 1, 1],
                        [0, 1, 1, 1, 0],
                        [0, 1, 1, 1, 0],
                        [1, 1, 1, 1, 1]
                    ]
                ]
            ],
            [//picture of hat
                [
                    [
                        [0, 1, 0, 0, 0],
                        [1, 1, 1, 0, 1],
                        [1, 1, 1, 1, 0],
                        [1, 0, 1, 0, 0],
                        [1, 0, 1, 0, 0]
                    ]
                ]
            ]
        ],
        [//10x10
            [//bird
                [
                    [
                        [1, 1, 1, 1, 1],
                        [0, 1, 1, 1, 1],
                        [0, 0, 1, 1, 1],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 1]
                    ],
                    [
                        [1, 0, 0, 0, 0],
                        [1, 0, 0, 1, 1],
                        [1, 1, 0, 1, 0],
                        [1, 1, 1, 1, 0],
                        [1, 1, 1, 1, 1]
                    ]
                ],
                [
                    [
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [0, 1, 1, 1, 1],
                        [0, 0, 1, 1, 1],
                        [0, 0, 0, 1, 1]
                    ],
                    [
                        [1, 1, 1, 1, 1],
                        [0, 0, 1, 1, 1],
                        [0, 0, 1, 1, 1],
                        [0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 1]
                    ]
                ]
            ],
            [//cat
                [
                    [
                        [1, 0, 0, 0, 1],
                        [1, 1, 1, 1, 1],
                        [1, 0, 1, 0, 1],
                        [1, 1, 1, 1, 1],
                        [0, 1, 1, 1, 1]
                    ],
                    [
                        [0, 0, 0, 0, 1],
                        [0, 0, 0, 0, 1],
                        [0, 0, 0, 0, 1],
                        [0, 0, 0, 0, 1],
                        [1, 1, 1, 0, 1]
                    ]
                ],
                [
                    [
                        [0, 0, 1, 1, 1],
                        [0, 0, 1, 1, 1],
                        [0, 0, 1, 1, 1],
                        [0, 0, 1, 1, 0],
                        [0, 1, 1, 1, 0]
                    ],
                    [
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 0],
                        [1, 1, 1, 1, 0],
                        [0, 0, 1, 1, 0],
                        [0, 1, 1, 1, 0]
                    ]
                ]
            ],
            [//dear
                [
                    [
                        [0, 0, 1, 0, 0],
                        [0, 0, 1, 1, 0],
                        [0, 0, 0, 0, 1],
                        [0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0]
                    ],
                    [
                        [1, 0, 0, 1, 0],
                        [1, 0, 1, 0, 0],
                        [1, 1, 1, 1, 1],
                        [0, 0, 0, 1, 1],
                        [0, 0, 1, 1, 0]
                    ]
                ],
                [
                    [
                        [0, 1, 1, 1, 1],
                        [0, 0, 1, 1, 1],
                        [0, 0, 1, 1, 0],
                        [0, 0, 1, 1, 0],
                        [0, 1, 1, 0, 0]
                    ],
                    [
                        [1, 1, 1, 1, 0],
                        [1, 1, 1, 1, 0],
                        [1, 1, 1, 0, 0],
                        [1, 0, 1, 1, 1],
                        [1, 0, 0, 0, 0]
                    ]
                ]
            ],
            [//duck
                [
                    [
                        [0, 0, 1, 1, 1],
                        [0, 0, 1, 0, 1],
                        [1, 1, 1, 1, 1],
                        [0, 0, 0, 1, 1],
                        [0, 0, 1, 1, 0]
                    ],
                    [
                        [0, 0, 0, 0, 0],
                        [1, 1, 0, 0, 0],
                        [1, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 1, 0, 0]
                    ]
                ],
                [
                    [
                        [0, 1, 1, 1, 1],
                        [1, 1, 0, 0, 0],
                        [1, 1, 0, 0, 0],
                        [1, 1, 1, 1, 0],
                        [0, 1, 1, 1, 1]
                    ],
                    [
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 0],
                        [0, 0, 0, 0, 0]
                    ]
                ]
            ],
            [//house
                [
                    [
                        [0, 0, 0, 0, 1],
                        [0, 0, 0, 1, 1],
                        [0, 0, 1, 1, 1],
                        [0, 1, 1, 1, 0],
                        [1, 1, 1, 1, 1]
                    ],
                    [
                        [1, 0, 0, 0, 0],
                        [1, 1, 0, 0, 0],
                        [1, 1, 1, 0, 0],
                        [0, 1, 1, 1, 0],
                        [1, 1, 1, 1, 1]
                    ]
                ],
                [
                    [
                        [1, 1, 1, 1, 1],
                        [1, 1, 0, 0, 1],
                        [1, 1, 0, 0, 1],
                        [1, 1, 0, 0, 1],
                        [1, 1, 1, 1, 1]
                    ],
                    [
                        [1, 1, 1, 1, 1],
                        [1, 0, 0, 1, 1],
                        [1, 0, 0, 1, 1],
                        [1, 0, 0, 1, 1],
                        [1, 1, 1, 1, 1]
                    ]
                ]
            ]
        ],
        [//15x15
            [//death
                [
                    [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 1],
                        [0, 0, 1, 0, 0],
                        [0, 1, 1, 1, 0]
                    ],
                    [
                        [0, 0, 0, 1, 1],
                        [0, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [0, 1, 1, 1, 1]
                    ],
                    [
                        [1, 1, 0, 0, 0],
                        [1, 0, 0, 1, 1],
                        [1, 0, 1, 1, 1],
                        [0, 1, 1, 0, 1],
                        [1, 1, 0, 0, 1]
                    ]
                ],
                [
                    [
                        [0, 0, 1, 0, 0],
                        [0, 0, 1, 0, 0],
                        [0, 1, 0, 0, 0],
                        [1, 1, 1, 0, 1],
                        [0, 1, 0, 0, 1]
                    ],
                    [
                        [0, 0, 1, 1, 1],
                        [0, 0, 1, 0, 0],
                        [1, 1, 1, 1, 0],
                        [1, 1, 1, 0, 0],
                        [1, 0, 0, 0, 1]
                    ],
                    [
                        [1, 0, 0, 0, 1],
                        [1, 1, 0, 0, 1],
                        [0, 1, 0, 0, 1],
                        [1, 1, 0, 0, 1],
                        [1, 1, 0, 0, 1]
                    ]
                ],
                [
                    [
                        [0, 1, 0, 1, 0],
                        [0, 0, 1, 0, 0],
                        [0, 1, 0, 0, 0],
                        [1, 0, 0, 0, 0],
                        [0, 0, 0, 0, 1]
                    ],
                    [
                        [0, 0, 1, 1, 1],
                        [0, 0, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1]
                    ],
                    [
                        [1, 1, 0, 1, 0],
                        [1, 1, 0, 0, 0],
                        [1, 1, 1, 0, 0],
                        [1, 1, 1, 1, 0],
                        [1, 1, 1, 1, 0]
                    ]
                ]
            ],
            [
                [
                    [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 1],
                        [0, 1, 1, 0, 1],
                        [1, 1, 0, 1, 0],
                        [1, 1, 1, 1, 0]
                    ],
                    [
                        [1, 0, 0, 0, 0],
                        [1, 0, 1, 0, 0],
                        [1, 1, 1, 1, 0],
                        [0, 1, 1, 0, 0],
                        [0, 0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0]
                    ]
                ],
                [
                    [
                        [0, 1, 1, 1, 1],
                        [0, 0, 1, 0, 1],
                        [0, 0, 1, 0, 1],
                        [0, 0, 1, 0, 1],
                        [0, 1, 1, 1, 1]
                    ],
                    [
                        [1, 1, 1, 0, 0],
                        [1, 0, 0, 0, 0],
                        [1, 1, 1, 1, 1],
                        [1, 0, 1, 0, 1],
                        [0, 0, 1, 1, 1]
                    ],
                    [
                        [1, 1, 1, 0, 0],
                        [0, 1, 1, 1, 0],
                        [0, 0, 0, 1, 0],
                        [0, 0, 1, 0, 0],
                        [0, 1, 1, 0, 0]
                    ]
                ],
                [
                    [
                        [0, 0, 0, 0, 1],
                        [0, 0, 0, 0, 1],
                        [0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0],
                        [1, 1, 1, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0, 1],
                        [1, 1, 0, 0, 1],
                        [1, 1, 0, 0, 1],
                        [0, 0, 1, 1, 1],
                        [0, 0, 1, 0, 0]
                    ],
                    [
                        [0, 0, 0, 1, 0],
                        [0, 0, 1, 0, 1],
                        [0, 0, 1, 0, 1],
                        [0, 0, 1, 0, 0],
                        [0, 0, 0, 1, 0]
                    ]
                ]
            ],
            [
                [
                    [
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 0],
                        [1, 1, 1, 0, 0],
                        [1, 1, 0, 1, 1],
                        [1, 1, 1, 0, 0]
                    ],
                    [
                        [1, 0, 0, 0, 0],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 1],
                        [1, 0, 1, 0, 0],
                        [0, 1, 1, 1, 0]
                    ]
                ],
                [
                    [
                        [1, 1, 0, 1, 1],
                        [0, 0, 0, 0, 0],
                        [0, 0, 1, 0, 1],
                        [1, 0, 1, 0, 1],
                        [0, 0, 1, 1, 1]
                    ],
                    [
                        [1, 0, 1, 0, 0],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [1, 1, 0, 0, 0],
                        [0, 0, 0, 0, 0]
                    ],
                    [
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 1],
                        [0, 0, 1, 0, 0]
                    ]
                ],
                [
                    [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 1],
                        [0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0],
                        [1, 1, 1, 1, 1]
                    ],
                    [
                        [1, 0, 1, 1, 1],
                        [1, 1, 0, 0, 1],
                        [1, 1, 0, 0, 1],
                        [1, 0, 1, 1, 1],
                        [0, 0, 1, 0, 0]
                    ],
                    [
                        [0, 1, 1, 0, 0],
                        [1, 0, 1, 1, 1],
                        [1, 1, 1, 0, 0],
                        [1, 1, 0, 0, 0],
                        [0, 0, 0, 0, 1]
                    ]
                ]
            ],
            [
                [
                    [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 1, 0],
                        [0, 0, 1, 1, 0]
                    ],
                    [
                        [0, 0, 0, 0, 1],
                        [0, 0, 1, 1, 1],
                        [0, 0, 0, 1, 1],
                        [0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 1, 0, 0],
                        [1, 0, 0, 1, 0],
                        [1, 0, 0, 1, 0],
                        [1, 0, 1, 1, 1],
                        [1, 1, 1, 0, 0]
                    ]
                ],
                [
                    [
                        [0, 1, 1, 1, 0],
                        [1, 1, 1, 0, 0],
                        [1, 1, 1, 1, 0],
                        [1, 1, 1, 1, 1],
                        [1, 1, 0, 0, 0]
                    ],
                    [
                        [0, 1, 1, 1, 1],
                        [0, 1, 1, 1, 1],
                        [1, 0, 0, 0, 0],
                        [1, 1, 1, 0, 0],
                        [1, 1, 1, 0, 0]
                    ],
                    [
                        [1, 0, 0, 0, 0],
                        [1, 0, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1]
                    ]
                ],
                [
                    [
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 0],
                        [1, 1, 1, 0, 0],
                        [1, 1, 0, 0, 1],
                        [1, 1, 1, 1, 1]
                    ],
                    [
                        [0, 0, 0, 1, 1],
                        [0, 0, 0, 0, 1],
                        [0, 0, 0, 0, 0],
                        [0, 1, 1, 1, 1],
                        [1, 1, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [0, 1, 1, 1, 1],
                        [0, 0, 1, 0, 0]
                    ]
                ]
            ]
        ],
    ],
    local_pictures: {
        0: () => [[Array.from({ length: 5 }, () => Array(5).fill(0))]],
        1: () => {
            return [
                [globals.local_pictures[0]()[0][0], globals.local_pictures[0]()[0][0]],
                [globals.local_pictures[0]()[0][0], globals.local_pictures[0]()[0][0]]
            ]
        },
        2: () => {
            return [
                [globals.local_pictures[0]()[0][0], globals.local_pictures[0]()[0][0], globals.local_pictures[0]()[0][0]],
                [globals.local_pictures[0]()[0][0], globals.local_pictures[0]()[0][0], globals.local_pictures[0]()[0][0]],
                [globals.local_pictures[0]()[0][0], globals.local_pictures[0]()[0][0], globals.local_pictures[0]()[0][0]]
            ]
        }
    },
    isDownloaded: false,
    isStarted: false,
    isSolved: false,
    timer: null,
    canPlay: true
}

let game_data = {
    level: 0,
    game: 0,
    picture_data: [],
    picture_area: [],
    time: 0
}

const build_header = () => {
    const header__wrapper = document.createElement("div");
    header__wrapper.id = "header__wrapper";

    const header = document.createElement("header");

    const h1 = document.createElement("h1");
    h1.innerText = "Nonograms";

    const buttons__box = document.createElement("div");
    buttons__box.classList.add("buttons__box");

    for (let obj of globals.buttons) {
        const button = document.createElement("button");
        button.title = obj.title;
        button.innerHTML = obj.svg;
        if (obj.unavailable) button.classList.add("unavailable");
        if (obj.id) button.id = obj.title;
        button.addEventListener("click", obj.func);
        button.addEventListener("click", () => {
            var audio1 = new Audio();
            audio1.src = 'assets/sounds/click1.mp3';
            audio1.volume = 0.7;
            audio1.preload = 'auto';
            if (globals.canPlay) audio1.play()
        });

        buttons__box.append(button);
    }

    body.append(header__wrapper);
    header__wrapper.append(header);
    header.append(h1);
    header.append(buttons__box);
}

const build_menu = () => {
    const menu__wrapper = document.createElement("div");
    const main = document.createElement("main");
    const carusel = document.createElement("div");
    const levels__box = document.createElement("div");
    const games__box = document.createElement("div");
    const levels__wrapper = document.createElement("div");
    const games__scroll = document.createElement("div");
    const play__button = document.createElement("button");
    const arrow = document.createElement("button");

    menu__wrapper.id = "menu__wrapper";
    levels__box.id = "levels__box";
    games__box.id = "games__box";
    carusel.id = "carusel";

    levels__wrapper.classList.add("levels__wrapper");
    games__scroll.classList.add("games__scroll");
    play__button.classList.add("play__button");
    arrow.classList.add("arrow");

    arrow.onclick = () => globals.menu_functions.menu_back();
    play__button.onclick = () => globals.menu_functions.play();
    play__button.innerHTML = "play";
    arrow.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M462 390 c-26 -57 -72 -93 -148 -116 -83 -25 -93 -22 -96 36 l-3 51 -100 -77 c-55 -42 -100 -80 -100 -84 0 -4 45 -42 100 -84 l100 -77 3 50 3 49 42 6 c97 16 164 65 203 152 26 54 43 144 28 144 -5 0 -19 -23 -32 -50z"/></g></svg>`;

    for (let i = 0; i < 5; i++) {
        const level = document.createElement("button");
        level.addEventListener("click", () => globals.menu_functions.choose_level(i))
        level.onclick = () => globals.menu_functions.choose_level(i);
        level.innerHTML = globals.levels[i];
        levels__wrapper.append(level);
    }

    for (let i = 0; i < 5; i++) {
        const game = document.createElement("button");
        game.onclick = () => globals.menu_functions.choose_game(i);
        game.innerHTML = globals.games[game_data.level][i];
        games__scroll.append(game);
    }

    body.append(menu__wrapper);
    menu__wrapper.append(main);
    main.append(carusel);
    carusel.append(levels__box);
    carusel.append(games__box);
    carusel.append(arrow);
    levels__box.append(play__button);
    levels__box.append(levels__wrapper);
    games__box.append(games__scroll);

    globals.menu_functions.choose_level(game_data.level, false);
    globals.menu_functions.choose_game(game_data.game);
}

const build_game = () => {
    audio.src = game_data.level === 0 ? 'assets/sounds/easy.mp3' : game_data.level === 1 ? 'assets/sounds/medium.mp3' : 'assets/sounds/hard.mp3';
    audio.volume = 0.7;
    audio.preload = 'auto';
    if (globals.canPlay) audio.play()

    const game__wrapper = document.createElement("div");
    const game__box = document.createElement("div");
    const timer = document.createElement("div");
    const game_field = document.createElement("div");
    const main_table = document.createElement("table");
    const main_table__line1 = document.createElement("tr");
    const main_table__line2 = document.createElement("tr");
    const td1 = document.createElement("td");
    const main_table__row__box = document.createElement("td");
    const main_table__col__box = document.createElement("td");
    const cells__area = document.createElement("td");
    const cells_table = document.createElement("table");

    game__wrapper.id = "game__wrapper";
    game__box.className = "game__box";
    timer.id = "timer";
    game_field.id = "game_field";
    main_table.className = "main_table";
    main_table__line1.className = "main_table__line";
    main_table__line2.className = "main_table__line";
    main_table__row__box.className = "main_table__row__box";
    main_table__col__box.className = "main_table__col__box";
    cells__area.className = "cells__area";
    cells_table.className = "cells_table";

    main_table__line1.append(td1);
    main_table__line1.append(main_table__row__box);
    main_table__line2.append(main_table__col__box);
    main_table__line2.append(cells__area);
    cells__area.append(cells_table);
    main_table.append(main_table__line1);
    main_table.append(main_table__line2);
    game_field.append(main_table);
    game__box.append(timer);
    game__box.append(game_field);
    game__wrapper.append(game__box);

    body.append(game__wrapper);
    globals.isStarted = false;

    timer.innerHTML = `<svg fill="currentcolor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z"></path></svg> <div>--:--</div>`

    if (globals.isDownloaded) {
        game_data = JSON.parse(localStorage.getItem('copy'));
        globals.isStarted = true;
    } else {
        game_data.picture_data = globals.local_pictures[game_data.level]();
        game_data.picture_area = globals.local_pictures[game_data.level]();
    }

    const picture = globals.pictures[game_data.level][game_data.game];

    for (let q = 0; q < picture.length; q++) {
        const table_tr = document.createElement("tr");
        table_tr.classList.add("table_tr");

        for (let w = 0; w < picture[q].length; w++) {
            const table_td = document.createElement("td");
            const inner_cells_table = document.createElement("table");
            table_td.classList.add("area__5x5");

            for (let e = 0; e < 5; e++) {
                const inner_cells_table_tr = document.createElement("tr");

                for (let r = 0; r < 5; r++) {
                    const inner_cells_table_td = document.createElement("td");

                    inner_cells_table_td.addEventListener("click", (event) => {
                        if (event.target.classList.contains("filled")) {
                            event.target.classList.remove("filled");
                            event.target.innerHTML = "";
                            fill_cell(q, w, e, r, picture, 0);
                        } else {
                            event.target.classList.add("filled");
                            event.target.innerHTML = "";
                            fill_cell(q, w, e, r, picture, 1);
                        }
                        event.target.innerHTML = "";
                    })

                    inner_cells_table_td.addEventListener("contextmenu", (event) => {
                        event.preventDefault();
                        if (event.target.innerHTML === "x") {
                            event.target.innerHTML = "";
                            fill_cell(q, w, e, r, picture, 0);
                        } else {
                            event.target.innerHTML = "x";
                            fill_cell(q, w, e, r, picture, "x");
                        }
                        event.target.classList.remove("filled");
                    })

                    if (globals.isDownloaded) {
                        const eventContextMenu = new MouseEvent('contextmenu');
                        switch (game_data.picture_area[q][w][e][r]) {
                            case 1:
                                inner_cells_table_td.click()
                                break;
                            case 'x':
                                inner_cells_table_td.dispatchEvent(eventContextMenu);
                                break;
                        }
                    }

                    inner_cells_table_tr.append(inner_cells_table_td);
                }

                inner_cells_table.append(inner_cells_table_tr);
            }

            table_td.append(inner_cells_table);
            table_tr.append(table_td);
        }

        cells_table.append(table_tr);
    }

    if (globals.isDownloaded) {
        globals.isStarted = false;
        const timer = document.getElementById("timer").getElementsByTagName("div")[0];
        timer.innerText = `${Math.floor(game_data.time / 600)}${Math.floor(game_data.time / 60) % 10}:${Math.floor(game_data.time % 60 / 10)}${game_data.time % 10}`;
    }

    for (let q = 0; q < picture.length; q++) {
        const main_table__col = document.createElement("div");
        main_table__col.classList.add("main_table__col");
        for (let e = 0; e < 5; e++) {
            const span = document.createElement("span");
            // let last_symbol = 0;
            let lengths = [0];
            for (let w = 0; w < picture[q].length; w++) {
                for (let r = 0; r < 5; r++) {
                    const symbol = picture[q][w][e][r];
                    if (symbol === 1) {
                        // last_symbol = 1;
                        lengths[lengths.length - 1]++;
                    } else {
                        // last_symbol = 0;
                        lengths[lengths.length] = 0;
                    }
                }
            }
            span.innerHTML = lengths.filter((elem) => elem != 0).join(" ");
            main_table__col.append(span);
        }
        main_table__col__box.append(main_table__col);
    }

    for (let w = 0; w < picture.length; w++) {
        const main_table__row = document.createElement("div");
        main_table__row.classList.add("main_table__row");
        for (let r = 0; r < 5; r++) {
            const span = document.createElement("span");
            // let last_symbol = 0;
            let lengths = [0];
            for (let q = 0; q < picture[0].length; q++) {
                for (let e = 0; e < 5; e++) {
                    const symbol = picture[q][w][e][r];
                    if (symbol === 1) {
                        // last_symbol = 1;
                        lengths[lengths.length - 1]++;
                    } else {
                        // last_symbol = 0;
                        lengths[lengths.length] = 0;
                    }
                }
            }
            span.innerHTML = lengths.filter((elem) => elem != 0).join(" ");
            main_table__row.append(span);
        }
        main_table__row__box.append(main_table__row);
    }
}

const fill_cell = (q, w, e, r, picture, value) => {
    var audio1 = new Audio();

    switch (value) {
        case 0:
            game_data.picture_data[q][w][e][r] = 0;
            game_data.picture_area[q][w][e][r] = 0;
            audio1.src = 'assets/sounds/click6.mp3';
            break;
        case 1:
            game_data.picture_data[q][w][e][r] = 1;
            game_data.picture_area[q][w][e][r] = 1;
            audio1.src = 'assets/sounds/click2.mp3';
            break;
        case "x":
            game_data.picture_data[q][w][e][r] = 0;
            game_data.picture_area[q][w][e][r] = "x";
            audio1.src = 'assets/sounds/click5.mp3';
            break;
    }

    audio1.volume = 0.7;
    audio1.preload = 'auto';
    if (globals.canPlay) audio1.play()

    if (!globals.isStarted) {
        globals.isStarted = true;
        const timer = document.getElementById("timer").getElementsByTagName("div")[0];
        if (!globals.isDownloaded) game_data.time = 0;
        globals.isDownloaded = false
        timer.innerText = `${Math.floor(game_data.time / 600)}${Math.floor(game_data.time / 60) % 10}:${Math.floor(game_data.time % 60 / 10)}${game_data.time % 10}`;
        globals.timer = setInterval(() => timer.innerText = `${Math.floor(++game_data.time / 600)}${Math.floor(game_data.time / 60) % 10}:${Math.floor(game_data.time % 60 / 10)}${game_data.time % 10}`, 1000);
    };

    if (game_data.picture_data.toString() == picture.toString() && !globals.isSolved) stop_game();
}

const stop_game = () => {
    clearInterval(globals.timer);
    globals.isStarted = false;
    const result = document.getElementsByClassName("cells_table")[0].innerHTML;
    const head_buttons = document.getElementsByClassName("buttons__box")[0].getElementsByTagName("button");
    for (let i = 2; i < 5; i++) head_buttons[i].classList.add("unavailable");
    document.getElementById("game__wrapper").remove();
    build_winwindow(result);

    const results_obj = {
        time: game_data.time,
        level: game_data.level,
        game: game_data.game,
        result: result
    }

    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(results_obj);
    localStorage.setItem("results", JSON.stringify(results));
}

const build_winwindow = (result) => {
    audio.src = 'assets/sounds/win.mp3';
    audio.volume = 0.7;
    audio.preload = 'auto';
    if (globals.canPlay) audio.play();
    const winwindow__wrapper = document.createElement("div");
    const winwindow__box = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const table = document.createElement("table")

    body.append(winwindow__wrapper);
    winwindow__wrapper.append(winwindow__box);
    winwindow__box.append(h2);
    winwindow__box.append(p);
    winwindow__box.append(table);

    winwindow__wrapper.id = "winwindow__wrapper";
    winwindow__box.classList.add("winwindow__box");
    table.classList.add("cells_table")

    h2.innerText = "Victory"
    p.innerHTML = `You spent ${Math.floor(++game_data.time / 600)}${Math.floor(game_data.time / 60) % 10}:${Math.floor(game_data.time % 60 / 10)}${game_data.time % 10} time<br> to draw a ${globals.games[game_data.level][game_data.game]}`;
    table.innerHTML = result;
}

const build_losewindow = (result) => {
    const winwindow__wrapper = document.createElement("div");
    const winwindow__box = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const table = document.createElement("table")

    body.append(winwindow__wrapper);
    winwindow__wrapper.append(winwindow__box);
    winwindow__box.append(h2);
    winwindow__box.append(p);
    winwindow__box.append(table);

    winwindow__wrapper.id = "winwindow__wrapper";
    winwindow__box.classList.add("winwindow__box");
    table.classList.add("cells_table")

    h2.innerText = "ah, man..."
    p.innerHTML = `You spent ${Math.floor(++game_data.time / 600)}${Math.floor(game_data.time / 60) % 10}:${Math.floor(game_data.time % 60 / 10)}${game_data.time % 10} time<br> to draw a ${globals.games[game_data.level][game_data.game]} <br> and lose...`;
    table.innerHTML = result;
}

const build_massage = (text) => {
    const massageWrapper = document.createElement('div');
    massageWrapper.id = 'massage__wrapper';
    massageWrapper.onclick = () => {
        document.getElementById('massage__wrapper').remove();
    };

    const massageBox = document.createElement('div');
    massageBox.className = 'massage__box';

    const messageText = document.createElement('p');
    messageText.innerText = text;

    const completeSvg = `<svg class="comlete__svg" fill="currentcolor" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 568.599 568.599" xml:space="preserve"><g><g><path d="M565.692,147.211L507.96,89.479c-4.08-4.08-10.404-4.08-14.484,0L241.128,342.031L75.276,176.179c-4.08-4.08-10.404-4.08-14.484,0L3.06,233.911c-4.08,4.08-4.08,10.404,0,14.484l230.724,230.724c1.836,1.836,4.488,3.06,7.14,3.06s5.304-1.02,7.14-3.06l317.628-317.424C569.568,157.615,569.568,151.291,565.692,147.211z M241.128,457.495L24.684,241.051l43.248-43.248l165.852,165.852c4.08,4.08,10.404,4.08,14.484,0L500.82,111.103l43.248,43.248L241.128,457.495z"/><path d="M497.148,133.543L352.92,277.771c-2.04,2.04-2.04,5.304,0,7.14c1.02,1.02,2.244,1.428,3.672,1.428c1.428,0,2.652-0.408,3.672-1.428L500.82,144.355l10.812,10.812c2.04,2.04,5.304,2.04,7.14,0c2.04-2.04,2.04-5.304,0-7.14l-14.484-14.484c-1.02-1.02-2.244-1.428-3.672-1.428C499.188,132.115,498.168,132.523,497.148,133.543z"/></g></g></svg>`;
    const closeButton = document.createElement('button');
    const closeButtonSvg = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="22.000000pt" height="20.000000pt" viewBox="0 0 22.000000 20.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,20.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M20 183 c0 -4 17 -24 37 -45 l37 -38 -39 -40 c-51 -52 -37 -66 15 -15 l40 39 40 -39 c52 -51 66 -37 15 15 l-39 40 39 40 c51 52 37 66 -15 15 l-40 -39 -38 37 c-37 36 -52 45 -52 30z"/></g></svg>`;

    massageBox.append(messageText);
    massageBox.innerHTML += completeSvg;
    closeButton.innerHTML = closeButtonSvg;
    massageBox.appendChild(closeButton);
    massageWrapper.appendChild(massageBox);
    body.append(massageWrapper);
}

const build_leaderboard = () => {
    const leaderboardWrapper = document.createElement('div');
    const leaderboardBox = document.createElement('div');
    const leaderboardTitle = document.createElement('h2');
    const leaderboardTable = document.createElement('table');
    const closeButton = document.createElement('button');
    const closeButtonSvg = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="22.000000pt" height="20.000000pt" viewBox="0 0 22.000000 20.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,20.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M20 183 c0 -4 17 -24 37 -45 l37 -38 -39 -40 c-51 -52 -37 -66 15 -15 l40 39 40 -39 c52 -51 66 -37 15 15 l-39 40 39 40 c51 52 37 66 -15 15 l-40 -39 -38 37 c-37 36 -52 45 -52 30z"/></g></svg>`;


    leaderboardWrapper.id = 'leaderboard__wrapper';
    leaderboardWrapper.onclick = () => {
        document.getElementById('leaderboard__wrapper').remove();
    };
    leaderboardBox.className = 'leaderboard__box';
    leaderboardTitle.textContent = 'Leader Board';
    leaderboardTable.classList.add("leaderboard__table")
    closeButton.innerHTML = closeButtonSvg;


    const results = !JSON.parse(localStorage.getItem("results")) ? [] : JSON.parse(localStorage.getItem("results")).sort((a, b) => a.time - b.time);

    const rows = [
        { symbol: '★', rank: '1' },
        { symbol: '✯', rank: '2' },
        { symbol: '✩', rank: '3' },
        { symbol: '✧', rank: '4' },
        { symbol: '❖', rank: '5' }
    ];

    rows.forEach((row, index) => {
        const tr = document.createElement("tr");
        const td = Array.from({ length: 5 }, () => document.createElement("td"));

        td[0].innerHTML = row.symbol;
        td[1].innerHTML = row.rank;
        td[2].innerHTML = results[index] ? globals.games[results[index].level][results[index].game] : '--';
        td[3].innerHTML = results[index] ? globals.levels[results[index].level] : '--';
        td[4].innerHTML = results[index] ? `${Math.floor(results[index].time / 600)}${Math.floor(results[index].time / 60) % 10}:${Math.floor(results[index].time % 60 / 10)}${results[index].time % 10}` : '--'

        td.forEach((item) => tr.append(item));
        leaderboardTable.append(tr);
    });

    leaderboardBox.append(leaderboardTitle);
    leaderboardBox.append(leaderboardTable);
    leaderboardBox.append(closeButton);
    leaderboardWrapper.append(leaderboardBox);
    body.append(leaderboardWrapper);
}

const build_quations = () => {
    const quationsWrapper = document.createElement('div');
    const quationsBox = document.createElement('div');
    const title = document.createElement('h2');
    const quationsBlock = document.createElement('div');

    quationsWrapper.id = 'quations__wrapper';
    quationsBox.className = 'quations__box';
    title.textContent = 'site map';
    quationsBlock.className = 'quations__block';
    quationsWrapper.onclick = () => {
        document.getElementById('quations__wrapper').remove();
    };

    const sections = [
        {
            title: 'game launching:',
            solutions: [
                'Go to menu <svg fill="currentcolor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"><path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path></svg>',
                'Choose level',
                'Click <span>Start</span>'
            ]
        },
        {
            title: 'Game interaction:',
            solutions: [
                'Clicking <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M44 447 c-2 -7 -3 -100 -2 -207 l3 -195 205 0 205 0 3 164 3 165 -43 43 -42 43 -163 0 c-124 0 -165 -3 -169 -13z m78 -79 l3 -73 120 0 120 0 3 69 3 69 34 -33 35 -34 0 -153 0 -153 -30 0 -29 0 -3 88 -3 87 -125 0 -125 0 -3 -87 -3 -88 -29 0 -30 0 0 190 0 190 30 0 29 0 3 -72z m228 7 l0 -65 -105 0 -105 0 0 65 0 65 105 0 105 0 0 -65z m10 -235 l0 -80 -110 0 -110 0 0 80 0 80 110 0 110 0 0 -80z"/><path d="M80 90 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/><path d="M400 90 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/><path d="M280 375 c0 -41 2 -45 25 -45 23 0 25 4 25 45 0 41 -2 45 -25 45 -23 0 -25 -4 -25 -45z m27 -12 c-3 -10 -5 -4 -5 12 0 17 2 24 5 18 2 -7 2 -21 0 -30z"/></g></svg> saves a game',
                'Clicking <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M224 616 c-115 -36 -209 -151 -216 -266 -4 -56 18 -66 27 -13 12 76 38 128 90 180 102 101 238 109 360 22 l48 -34 -44 -5 c-78 -9 -41 -36 54 -39 l38 -1 -3 67 c-2 42 -8 68 -15 71 -9 2 -13 -8 -13 -32 l0 -36 -45 35 c-79 60 -189 80 -281 51z"/><path d="M600 302 c0 -86 -77 -197 -165 -238 -98 -46 -237 -23 -304 50 l-24 26 41 0 c31 0 42 4 42 15 0 20 -128 22 -135 3 -7 -21 9 -118 20 -121 6 -1 11 13 13 31 l3 32 33 -25 c162 -123 388 -71 476 110 30 62 40 145 16 145 -11 0 -16 -9 -16 -28z"/></g></svg> reset a game',
                'Clicking <svg fill="currentcolor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path></svg> shows solution'
            ]
        },
        {
            title: 'game customization:',
            solutions: [
                'Clicking <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M215 617 c-113 -45 -182 -127 -205 -245 -18 -95 18 -207 89 -276 182 -175 483 -80 530 168 11 59 -1 67 -42 28 -107 -103 -276 -72 -338 63 -35 76 -16 178 45 234 14 14 26 28 26 33 0 12 -70 8 -105 -5z m9 -72 c-21 -42 -25 -61 -22 -116 5 -85 42 -150 113 -194 43 -26 57 -30 124 -30 61 0 84 4 115 23 21 13 40 21 42 19 10 -9 -51 -110 -84 -138 -110 -97 -283 -95 -385 4 -57 56 -80 108 -85 189 -6 90 17 155 74 213 36 38 122 91 131 81 1 -1 -9 -24 -23 -51z"/></g></svg> or <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M294 617 c-3 -9 -4 -28 -2 -44 2 -22 8 -28 28 -28 23 0 25 4 25 40 0 34 -3 40 -23 43 -13 2 -24 -3 -28 -11z" /><path d="M100 535 c-18 -22 13 -67 43 -63 31 4 34 42 5 62 -28 20 -32 20 -48 1z" /><path d="M492 534 c-29 -20 -26 -58 5 -62 30 -4 61 41 43 63 -16 19 -20 19 -48 -1z" /><path d="M242 451 c-96 -61 -96 -202 0 -261 20 -12 51 -20 78 -20 142 0 203 170 96 269 -37 35 -127 41 -174 12z m143 -66 c19 -18 25 -35 25 -65 0 -56 -34 -90 -90 -90 -30 0 -47 6 -65 25 -19 18 -25 35 -25 65 0 56 34 90 90 90 30 0 47 -6 65 -25z" /><path d="M14 336 c-12 -31 4 -47 43 -44 33 3 38 6 38 28 0 22 -5 25 -38 28 -26 2 -39 -1 -43 -12z" /><path d="M544 336 c-12 -31 4 -47 43 -44 33 3 38 6 38 28 0 22 -5 25 -38 28 -26 2 -39 -1 -43 -12z" /><path d="M104 145 c-16 -24 -16 -28 -1 -42 14 -15 18 -15 42 1 18 12 25 24 23 39 -5 33 -43 34 -64 2z" /><path d="M477 163 c-15 -14 -6 -43 19 -59 23 -16 27 -16 41 -1 15 14 15 18 -1 41 -16 25 -45 34 -59 19z" /><path d="M294 87 c-3 -9 -4 -28 -2 -44 2 -22 8 -28 28 -28 23 0 25 4 25 40 0 34 -3 40 -23 43 -13 2 -24 -3 -28 -11z" /></g></svg> changes theme'
            ]
        },
        {
            title: 'game stats:',
            solutions: [
                'Clicking <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M289 610 c-20 -26 -27 -29 -60 -24 -20 3 -39 2 -42 -3 -3 -5 -1 -28 4 -52 7 -31 6 -47 -2 -57 -9 -11 -8 -18 1 -29 10 -12 38 -15 129 -15 124 0 148 8 130 41 -6 12 -6 33 0 61 5 23 7 46 4 51 -3 5 -22 6 -42 3 -33 -5 -40 -2 -60 24 -12 17 -26 30 -31 30 -5 0 -19 -13 -31 -30z m49 -60 c7 -12 23 -20 38 -20 21 0 25 -4 22 -22 -3 -22 -8 -23 -78 -23 -70 0 -75 1 -78 23 -3 18 1 22 22 22 15 0 31 8 38 20 7 11 15 20 18 20 3 0 11 -9 18 -20z"/><path d="M223 383 c-10 -3 -13 -51 -13 -188 0 -157 2 -184 16 -189 20 -8 168 -8 188 0 14 5 16 31 16 189 0 158 -2 184 -16 189 -19 7 -173 7 -191 -1z m167 -188 l0 -145 -70 0 -70 0 0 145 0 145 70 0 70 0 0 -145z"/><path d="M12 308 c-17 -17 -17 -279 0 -296 14 -14 136 -16 156 -4 9 7 12 45 10 158 l-3 149 -75 3 c-50 2 -79 -1 -88 -10z m128 -148 l0 -110 -45 0 -45 0 0 110 0 110 45 0 45 0 0 -110z"/><path d="M467 263 c-4 -3 -7 -61 -7 -129 0 -102 3 -123 16 -128 28 -11 140 -6 152 6 13 13 17 212 6 242 -5 13 -22 16 -83 16 -43 0 -81 -3 -84 -7z m123 -123 l0 -90 -45 0 -45 0 0 90 0 90 45 0 45 0 0 -90z"/></g></svg> shows top-5 scores'
            ]
        }
    ];

    sections.forEach(section => {
        const quationDiv = document.createElement('div');
        quationDiv.className = 'quation';

        const h3 = document.createElement('h3');
        h3.textContent = section.title;

        const solutionDiv = document.createElement('div');
        solutionDiv.className = 'solution';

        section.solutions.forEach(solution => {
            const p = document.createElement('p');
            p.innerHTML = solution;
            solutionDiv.appendChild(p);
        });

        quationDiv.appendChild(h3);
        quationDiv.appendChild(solutionDiv);
        quationsBlock.appendChild(quationDiv);
    });

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="22.000000pt" height="20.000000pt" viewBox="0 0 22.000000 20.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,20.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none"><path d="M20 183 c0 -4 17 -24 37 -45 l37 -38 -39 -40 c-51 -52 -37 -66 15 -15 l40 39 40 -39 c52 -51 66 -37 15 15 l-39 40 39 40 c51 52 37 66 -15 15 l-40 -39 -38 37 c-37 36 -52 45 -52 30z"/></g></svg>';

    quationsBox.appendChild(title);
    quationsBox.appendChild(quationsBlock);
    quationsBox.appendChild(closeButton);
    quationsWrapper.appendChild(quationsBox);
    document.body.append(quationsWrapper);

}

build_header()
build_menu()

if (!localStorage.getItem('copy')) localStorage.setItem('copy', JSON.stringify(game_data));


const transform = (arr) => {
    let result = globals.local_pictures[2]();

    for (let q = 0; q < 3; q++) {
        for (let p = 0; p < 5; p++) {
            for (let o = 0; o < 15; o++) {
                result[q][Math.floor(o / 5)][p][Math.floor(o % 5)] = arr[q * 5 + p][o]
            }
        }
    }

    return result
}

globals.pictures[2][1] = transform([[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1], [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]])
globals.pictures[2][2] = transform([[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1], [0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0], [0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]])
globals.pictures[2][3] = transform([[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1], [1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]])
globals.pictures[2][4] = transform([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0]])
