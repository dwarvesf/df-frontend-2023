const loading = document.querySelector('.loading');
console.log(loading);
setTimeout(() => {
	console.log('run');
	loading.classList.remove('show');
	loading.classList.add('hide');
}, 1000);
