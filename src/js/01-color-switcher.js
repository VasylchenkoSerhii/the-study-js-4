const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
};


class ColorSwitchcer {
    constructor() {
        this.intervalId = null;
    }

    start() {
        this.updateBackgroundColor()
        refs.start.setAttribute("disabled", "disabled");
        refs.stop.removeAttribute('disabled')
        this.intervalId = setInterval(() => {
            this.updateBackgroundColor()
        }, 1000);
    }

    stop() {
        refs.start.removeAttribute('disabled');
        refs.stop.setAttribute("disabled", "disabled");
        clearInterval(this.intervalId);
    }

    getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    updateBackgroundColor() {
        refs.body.style.backgroundColor = this.getRandomHexColor();
    }
}

const colorSwitchcer = new ColorSwitchcer();

refs.start.addEventListener('click', colorSwitchcer.start.bind(colorSwitchcer));
refs.stop.addEventListener('click', colorSwitchcer.stop.bind(colorSwitchcer));
