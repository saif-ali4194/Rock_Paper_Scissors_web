//  data
let rps_img = [
	["data/rock.jpg", "data/paper.jpg", "data/scissors.jpg"],
	["data/rockPaper.jpg", "data/paperScissors.jpg", "data/scissorsRock.jpg"],
];

let stars = [
	"data/empty_stars.webp",
	"data/1_stars.webp",
	"data/2_stars.webp",
	"data/3_stars.webp",
];

let pc_choices = ["rock", "paper", "scissors"];

//  Global var
const pc_choice_disp = document.getElementById("right");
const player_choice_disp = document.getElementById("left");
const playerStars = document.getElementById("t-left");
const pcStars = document.getElementById("t-right");
const win = document.getElementById("win");
const loss = document.getElementById("loss");
let ScoreInfo = {
	round: 0,
	match: null,
	player_round_win: 0,
	pc_round_win: 0,
	win: 0,
	loss: 0,
};
let Sound = {
	scissorsSound: new Audio("data/audio/scissors.mp3"),
	btnSound: new Audio("data/audio/btnpress.mp3"),
	rockSound: new Audio("data/audio/rock.mp3"),
	paperSound: new Audio("data/audio/paper.mp3"),
	play: function (audio) {
		audio.currentTime = 0;
		audio.play();
	},
};
Sound.btnSound.volume = 0.2;
Sound.scissorsSound.volume = 1;
//  Event listeners
document.getElementById("rock").addEventListener("click", () => {
	Sound.btnSound.play();
	let rand = Math.floor(Math.random() * 3);
	let pc_choice = pc_choices[rand];

	if (ScoreInfo.player_round_win == 0 || ScoreInfo.pc_round_win == 0) init();
	animate();
	setTimeout(function () {
		setChoices(rand, 0);
		ScoreInfo.match = cmp_choice("rock" + pc_choice);
		updateChoice("rock" + pc_choice);
		updateStars();
		updateScore();
	}, 200 * 10);
});

document.getElementById("paper").addEventListener("click", () => {
	Sound.btnSound.play();
	let rand = Math.floor(Math.random() * 3);
	let pc_choice = pc_choices[rand];

	if (ScoreInfo.player_round_win == 0 || ScoreInfo.pc_round_win == 0) init();
	animate();
	setTimeout(function () {
		setChoices(rand, 1);
		ScoreInfo.match = cmp_choice("paper" + pc_choice);
		updateChoice("paper" + pc_choice);
		updateStars();
		updateScore();
	}, 200 * 10);
});

document.getElementById("scissors").addEventListener("click", () => {
	Sound.btnSound.play();
	let rand = Math.floor(Math.random() * 3);
	let pc_choice = pc_choices[rand];

	if (ScoreInfo.player_round_win == 0 || ScoreInfo.pc_round_win == 0) init();
	animate();
	setTimeout(function () {
		setChoices(rand, 2);
		ScoreInfo.match = cmp_choice("scissors" + pc_choice);
		updateChoice("scissors" + pc_choice);
		updateStars();
		updateScore();
	}, 200 * 10);
});

window.addEventListener("load", () => {
	load();
});

window.addEventListener("beforeunload", () => {
	save();
});

// functoins
function animate() {
	let item = 0;
	const intervalId = setInterval(function () {
		pc_choice_disp.style.backgroundImage = "url(" + rps_img[0][item] + ")";
		player_choice_disp.style.backgroundImage = "url(" + rps_img[0][item] + ")";
		item = (item + 1) % 3; // Wrap around to 0 after 2
	}, 100);

	setTimeout(function () {
		clearInterval(intervalId);
	}, 200 * 10);
}

function setChoices(rand, player) {
	pc_choice_disp.style.backgroundImage = "url(" + rps_img[0][rand] + ")";
	player_choice_disp.style.backgroundImage = "url(" + rps_img[0][player] + ")";
}

function cmp_choice(choice) {
	switch (choice) {
		case "rockscissors":
		case "paperrock":
		case "scissorspaper":
			console.log("you win");
			return 1;
			break;
		case "rockpaper":
		case "paperscissors":
		case "scissorsrock":
			console.log("you loose");
			return 0;
			break;
		default:
			console.log("Draw");
			return -1;
	}
}

function updateStars() {
	// round check
	if (ScoreInfo.match == 1) {
		if (ScoreInfo.player_round_win < 3) {
			ScoreInfo.player_round_win++;
			playerStars.style.backgroundImage = "";
			playerStars.style.backgroundImage =
				"url(" + stars[ScoreInfo.player_round_win] + ")";
		}
	}

	if (ScoreInfo.match == 0) {
		if (ScoreInfo.pc_round_win < 3) {
			ScoreInfo.pc_round_win++;
			pcStars.style.backgroundImage = "";
			pcStars.style.backgroundImage =
				"url(" + stars[ScoreInfo.pc_round_win] + ")";
		}
	}
}

function updateScore() {
	if (ScoreInfo.player_round_win == 3) {
		ScoreInfo.win++;
		win.textContent = ScoreInfo.win;
		ScoreInfo.player_round_win = 0;
		ScoreInfo.pc_round_win = 0;
	}
	if (ScoreInfo.pc_round_win == 3) {
		ScoreInfo.loss++;
		loss.textContent = ScoreInfo.loss;
		ScoreInfo.pc_round_win = 0;
		ScoreInfo.player_round_win = 0;
	}
}

function init() {
	playerStars.style.backgroundImage =
		"url(" + stars[ScoreInfo.player_round_win] + ")";
	pcStars.style.backgroundImage = "url(" + stars[ScoreInfo.pc_round_win] + ")";
}

function updateChoice(choice) {
	if (choice == "rockscissors") {
		Sound.play(Sound.rockSound);
		pc_choice_disp.style.backgroundImage = "";
		pc_choice_disp.style.backgroundImage = "url(" + rps_img[1][2] + ")";
	} else if (choice == "paperrock") {
		Sound.play(Sound.paperSound);
		pc_choice_disp.style.backgroundImage = "";
		pc_choice_disp.style.backgroundImage = "url(" + rps_img[1][0] + ")";
	} else if (choice == "scissorspaper") {
		Sound.play(Sound.scissorsSound);
		pc_choice_disp.style.backgroundImage = "";
		pc_choice_disp.style.backgroundImage = "url(" + rps_img[1][1] + ")";
	} else if (choice == "rockpaper") {
		Sound.play(Sound.paperSound);
		player_choice_disp.style.backgroundImage = "";
		player_choice_disp.style.backgroundImage = "url(" + rps_img[1][0] + ")";
	} else if (choice == "paperscissors") {
		Sound.play(Sound.scissorsSound);
		player_choice_disp.style.backgroundImage = "";
		player_choice_disp.style.backgroundImage = "url(" + rps_img[1][1] + ")";
	} else if (choice == "scissorsrock") {
		Sound.play(Sound.rockSound);
		player_choice_disp.style.backgroundImage = "";
		player_choice_disp.style.backgroundImage = "url(" + rps_img[1][2] + ")";
	}
}

function load() {
	if (
		localStorage.getItem("win") == null ||
		localStorage.getItem("loss") == null
	) {
		console.log(ScoreInfo.win);
		localStorage.setItem("win", ScoreInfo.win);
		localStorage.setItem("loss", ScoreInfo.loss);
	} else {
		ScoreInfo.win = parseInt(localStorage.getItem("win"));
		win.textContent = ScoreInfo.win;
		ScoreInfo.loss = parseInt(localStorage.getItem("loss"));
		loss.textContent = ScoreInfo.loss;
	}
}
function save() {
	localStorage.setItem("win", ScoreInfo.win);
	localStorage.setItem("loss", ScoreInfo.loss);
}
