let countdown;
const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

var timer = (seconds) => {
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	// console.log(now,then);
	displayTimeLeft(seconds);
	displayEndTime(then);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft); //console log runs after 1 sec so another function created.
	}, 1000);
};

var displayTimeLeft = (seconds) => {
	const minutes = Math.floor(seconds / 60);
	const secondsLeft = seconds % 60;
	const display = `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
	timeLeft.innerText = display;
	document.title = display;
};

var displayEndTime = (timestamp) => {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	const suffix = hour >= 12 ? "PM" : "AM";
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	endTime.textContent = `Target Time: ${adjustedHour}:${
		minutes < 10 ? "0" : ""
	}${minutes} ${suffix}`;
};

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
	e.preventDefault(); //stop reloating the page
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
});
