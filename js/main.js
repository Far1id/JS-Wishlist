
function BasketItem(id, count) {
    this.Id = id;
    this.Count = count;
}

document.querySelector('#loadBtn').addEventListener('click', function (e) {

    console.log("salks");
    fetch(`https://jsonplaceholder.typicode.com/users/1/posts`)
        .then(response => response.json())
        .then(data => {

            data.forEach(element => {
                let dataItem = `<div class="col-md-4" >
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.body}</p>
                <a href="#" class="card-link">User Id ${element.userId}</a>
                <i class="fa-solid fa-heart" data-id=${element.id}></i>
                </div>
                </div>
                </div>`

                document.querySelector('.row').innerHTML += dataItem


            });
        }).then(() => {

            document.querySelectorAll("i").forEach(elem => {
                elem.addEventListener("click", function () {
                    elem.style.color = "red"

                    let id = elem.getAttribute("data-id");

                    let basketStr = localStorage.getItem('basketItems');

                    let basketItems;
                    if (!basketStr) {
                        basketItems = [];
                    }
                    else {
                        basketItems = JSON.parse(basketStr);
                    }

                    let item = basketItems.find(x => x.Id == id);

                    if (item) {
                        item.Count++;
                    }
                    else {
                        item = new BasketItem(id, 1);
                        basketItems.push(item);
                    }

                    localStorage.setItem('basketItems', JSON.stringify(basketItems));
                })
            });
        })
})



