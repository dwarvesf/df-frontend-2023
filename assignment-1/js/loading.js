const loading = document.querySelector('.loading');
setTimeout(() => {
	loading.classList.remove('show');
	loading.classList.add('hide');
}, 1000);
