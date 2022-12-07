// const es5IdentifierNames = require("jshint/data/es5-identifier-names");
function main() {
	window.addEventListener("load", () => {
		saveTodo = JSON.parse(localStorage.getItem("saveTodo")) || [];
		const todoTextForm = document.querySelector(".todoTextForm");
		todoTextForm.addEventListener("submit", (e) => {
			e.preventDefault();

			if (e.target.elements.todoText.value.length == 0) {
				alert("Please enter a todo item");
			}

			const todoTextObject = {
				todoText: e.target.elements.todoText.value,
				date: new Date().toDateString(),
				time: new Date().toLocaleTimeString(),
			};

			saveTodo.unshift(todoTextObject);
			localStorage.setItem("saveTodo", JSON.stringify(saveTodo));
			e.target.reset();
			displaylist();
		});
		displaylist();
	});

	function displaylist() {
		const todolist = document.querySelector("#todolist");

		todolist.innerHTML = "";

		[...saveTodo].forEach((saveT) => {
			todolist.innerHTML += `
            <div class="listitem">
				<div class="todoPtext">
                    <input type="text" class="inputvalue" value="${saveT.todoText}" readonly />
				</div>
            
				<div class="deleteEdit">
					<p class="date">${saveT.date}, ${saveT.time}</p>
					<div class="dandE">
						<span class="edit">EDIT✍🏼</span>
						<span class="deleteI">DELETE🗑</span>
					</div>
				</div>
			</div> `;

			let editfeature = [...document.querySelectorAll(".edit")];
			
			editfeature.forEach((node, newindex) => {
				node.addEventListener("click", () => {
					let input =
						node.parentElement.parentElement.parentElement.firstElementChild
							.firstElementChild;
					input.removeAttribute("readonly");
					input.focus();
                    input.addEventListener("keypress", (e) => {
                        if (e.key === "Enter") {
                            input.setAttribute("readonly", true);

                            [...saveTodo][newindex].todoText = e.target.value;

                            localStorage.setItem("saveTodo", JSON.stringify(saveTodo));
                            displaylist();
                        }
					});
				});
			});
			[...document.querySelectorAll(".deleteI")].forEach((node) => {
				node.addEventListener("click", () => {
					node.parentElement.parentElement.parentElement.remove();
					let t =
						node.parentElement.parentElement.parentElement.firstElementChild
							.firstElementChild.value;

					saveTodo = saveTodo.filter((j) => {
						return j.todoText != t;
					});

					localStorage.setItem("saveTodo", JSON.stringify(saveTodo));
					displaylist();
				});
			});
		});
		let search = document.querySelector(".searchtext");
		function searchlist(e) {
			const text = e.target.value.toLowerCase();
			let items = document.querySelectorAll(".listitem");
			items = [...items];
			for (let item of items) {
				let task = item.firstElementChild.firstElementChild.value;
				if (task.toLowerCase().indexOf(text) != -1) {
					item.style.display = "flex";
				} else {
					item.style.display = "none";
				}
			}
		}
		search.addEventListener("keyup", searchlist);
	}
}
main();

module.exports = { main };
