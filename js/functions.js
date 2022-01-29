window.onload = ()=>{
	if (document.querySelector(".auto-arrange-menu")) {
		const breakpoint = 576,
		offset = 50;
		let menuItemsArray = [],
		itemPos = 0;
		const menu = document.querySelector('.auto-arrange-menu'),
		dropdownMenu = document.querySelector('.auto-arrange-dropdown'),
		dropdownItem = document.querySelector('.auto-arrange-menu .dropdown-item'),
		dropdownItemWidth = dropdownItem.offsetWidth,
		menuItems = menu.querySelectorAll('.menu > li:not(.dropdown-item)');
		for(let item of Object.values(menuItems)){
			itemPos++;
			menuItemsArray.push({el: item, pos: itemPos, width: item.offsetWidth})
			// Create dropdown menu items
			dropdownMenu.innerHTML += item.outerHTML;
		}
		function arrangeSubcatMenu() {
			let viewportWidth = window.innerWidth;
			if (viewportWidth > breakpoint - 1) {
				let containerWidth = menu.offsetWidth;
				let totalItemsWidth = 0;
				for(let i of Object.values(menuItemsArray)){
					totalItemsWidth = totalItemsWidth + i.width;
					if(totalItemsWidth + offset + dropdownItemWidth > containerWidth){
						i.el.style.display = 'none';
						menu.querySelector(".auto-arrange-dropdown li:nth-child("+(i.pos)+")").style.display = 'block';
						dropdownItem.style.display = 'block';
					}else {
						i.el.style.display = 'block';
						menu.querySelector(".auto-arrange-dropdown li:nth-child("+(i.pos)+")").style.display = 'none';
						dropdownItem.style.display = 'none';
					}
				}
				let dropdownItemLeft = dropdownItem.getBoundingClientRect().left;
				dropdownMenu.style.right = viewportWidth - dropdownItemLeft - dropdownItemWidth - 16 + "px";
			} else {
				menu.querySelectorAll('.menu > li:not(.dropdown-item)')
				for(let item of Object.values(menuItems)){
					item.style.display = "block";
				}
				dropdownItem.style.display = 'none';
				dropdownMenu.classList.remove("active");
			}
		}
		arrangeSubcatMenu()
		document.addEventListener("click", (e) => {
			let targetElement = e.target;
			do {
				if (targetElement == dropdownItem) {
					e.preventDefault();
					dropdownMenu.classList.add("active");
					return;
				}
				targetElement = targetElement.parentNode;
			} while (targetElement);
			dropdownMenu.classList.remove("active");
		});
		window.addEventListener("resize", function () {
				arrangeSubcatMenu();
			},
			true
		);
	}
};
