let app = {

	slider: '',
	content: '',
	bigText: '',
	smallText: '',
	leftNavArrow: '',
	righNavArrow: '',
	activeTopText: '',
	activeSmallText: '',

	sliderPos: 0,
	sliderItems: 0,

	navBarItem: document.getElementsByClassName('navbarItem'),
	mainContainer: document.getElementsByClassName('container')[0],
	navbarArea: document.getElementsByClassName('container_navbar')[0],
	container_info: document.getElementsByClassName('container_info')[0],

	sliderPositionX: [0, 13, 23, 38, 51.5, 65, 79, 98, 98],

	/* ------------------------------------------------------------------------------ */

	init: function () {

		this.setSliderCounter();
		this.addNavbarItems(this.sliderItems);
		this.appendContactUs();
		this.appendSliderText();
		this.navbarEvent(this.sliderPos);

		setTimeout(this.hideInitLayerImg, 3000);
		setTimeout(this.hideInitLayerbg, 4000);

	},

	/* ------------------------------------------------------------------------------ */

	appendSliderText: function () {
		this.mainContainer.innerHTML += sliderText;
	},

	/* ------------------------------------------------------------------------------ */

	appendContactUs: function () {
		this.container_info.innerHTML += infoText;
	},

	/* ------------------------------------------------------------------------------ */

	setSliderCounter: function () {
		this.sliderItems = this.sliderPositionX.length;
	},

	/* ------------------------------------------------------------------------------ */

	slideNext: function () {
		this.slider = this.sliderPos + 1;
		(this.slider <= this.sliderItems) ? this.navbarEvent(this.slider): this.moveContainer(this.slider);
	},

	/* ------------------------------------------------------------------------------ */

	slidePrev: function () {
		this.slider = this.sliderPos - 1;
		(this.slider >= 0) ? this.navbarEvent(this.slider): void(0);
	},

	/* ------------------------------------------------------------------------------ */

	moveContainer: function (item) {
		(item >= this.sliderItems) ? this.mainContainer.classList.add('slideLeft'): this.mainContainer.classList.remove('slideLeft');
	},

	/* ------------------------------------------------------------------------------ */

	hideInitLayerImg: function () {
		this.content = document.querySelector('.container_animation_inner');
		this.content.classList.add('hidden');
	},

	/* ------------------------------------------------------------------------------ */

	hideInitLayerbg: function () {
		this.content = document.querySelector('div.container_animation');
		this.content.classList.add('hidden');
	},

	/* ------------------------------------------------------------------------------ */

	loopFunction: function (n, action) {
		for (var i = 0; i <= n; i++) { action(i); }
	},

	/* ------------------------------------------------------------------------------ */

	addNavbarItems: function (items) {

		this.content = '';
		this.loopFunction(items, i => {
			this.content += (i == 0 || i == items) ?
				`<li class='navbarItem' onclick="app.navbarEvent(${i})" ><span></span></li>` :
				`<li class='navbarItem' onclick="app.navbarEvent(${i})"><span>${i}</span></li>`;
		});

		this.navbarArea.innerHTML += '<ul>' + this.content + '</ul>';
	},

	/* ------------------------------------------------------------------------------ */

	arrowsVisibility: function () {

		this.righNavArrow = document.querySelector('.righNavArrow');
		this.leftNavArrow = document.querySelector('.leftNavArrow');
		(this.sliderPos < 1) ? this.leftNavArrow.classList.add('hidden'): this.leftNavArrow.classList.remove('hidden');
		(this.sliderPos > this.sliderItems - 1) ? this.righNavArrow.classList.add('hidden'): this.righNavArrow.classList.remove('hidden');

	},

	/* ------------------------------------------------------------------------------ */

	navbarEvent: function (item) {

		this.slider = document.getElementsByClassName('container_slider')[0],
		this.slider.style.backgroundPosition = this.sliderPositionX[item] + "%";
		this.navBarItem[this.sliderPos].classList.remove('active');
		this.navBarItem[item].classList.add('active');
		this.sliderPos = item;

		this.arrowsVisibility();
		this.moveContainer(item);
		this.setTextVisible(item);

	},

	/* ------------------------------------------------------------------------------ */

	removeClass: function (arr) {

		[].forEach.call(arr, function (el) {
			el.className = el.className.replace(/\bactive\b/, "");
		});

	},

	/* ------------------------------------------------------------------------------ */

	setTextVisible: function (item) {

		this.bigText = document.querySelectorAll('.sliderTopText'),
		this.smallText = document.querySelectorAll('.sliderSmallText'),
		this.activeTopText = document.querySelector('div.sliderTopText.slide_' + item),
		this.activeSmallText = document.querySelector('div.sliderSmallText.slide_' + item);
		this.removeClass(this.bigText);
		this.removeClass(this.smallText);

		if (this.activeTopText) {
			this.activeTopText.classList.add('active');
			this.activeSmallText.classList.add('active');
		}

	},

	/* ------------------------------------------------------------------------------ */


};

app.init();