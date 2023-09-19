const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const table = $('tbody')
const createForm = $('form')
const inputName = $('#input-name')
const inputAuthor = $('#input-author')
const inputTopic = $('#input-topic')
const confirmDelete = $('.btn-delete')
const searchInput = $('.search')
const deleteItem = $('.delete-item')

// console.log(deleteItem)

// Get the modal
const modal = document.getElementsByClassName("modal-add")[0];
// Get the button element that open the modal
const btnOpenAdd = document.getElementsByClassName("btn-add")[0];
// Get the button close the modal
const btnCloseAdd = document.getElementsByClassName("close")[1];

// Get the modal
const modalDelete = document.getElementsByClassName("modal-delete")[0];
var btnOpenDelete = document.querySelectorAll(".delete-click");
// Get the button close the modal
const btnCloseDelete = document.getElementsByClassName("close")[0];
// console.log(btnOpenDelete)

// Get the button cancel
const btnCancel = document.querySelector('.btn-cancel')


const app = {
  deleteIndex: 0,
  isSearching: false,
  books: [
    {
      name: 'Refactoring',
      author: 'Martin Fowler',
      topic: 'Programming',
    },
    {
      name: 'Design Data-Intensive Applications',
      author: 'Martin Kleppman',
      topic: 'Database',
    },
    {
      name: 'The Phoenix Project',
      author: 'Gene Kim',
      topic: 'DevOps',
    },
  ],

  saveStore: function(data) {
    localStorage.setItem('books',JSON.stringify(data));
  },

  getBooks: function() {
    const bookList = JSON.parse(localStorage.getItem('books'));
    console.log(bookList)
    if (bookList)
      this.books = bookList
  },


  render: function(books) {    
    const lines = books.map((book,index) => {
      return `
        <tr>
          <td>${book.name}</td>
          <td>${book.author}</td>
          <td>${book.topic}</td>
          <td class="delete-click onclick=getIndex(this)">
            Delete
          </td>
        </tr>
      `
    }) 
    $('tbody').innerHTML = lines.join('\n')
    btnOpenDelete = document.querySelectorAll(".delete-click");
    if (!this.isSearching){
      btnOpenDelete.forEach(element => {
        element.onclick = function(e){        
          app.deleteIndex = e.target.parentNode.rowIndex-1
          deleteItem.innerHTML = `Do you want to delete ${books[app.deleteIndex].name} book?`
          modalDelete.style.display = "block"  
        }      
      });
    }
    
  },

  handleEvents: function(){

    // Handler event add modal
    
    // console.log(btnOpenAdd)

    // When the user clicks on the button, open the modal
    btnOpenAdd.onclick = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    btnCloseAdd.onclick = function() {
      modal.style.display = "none";
    }

    

    // When the user clicks anywhere outside of the modal, close it => under
    // Handler event delete modal
    
    // Get the button element that open the modal
    // var btnOpenDelete = document.querySelectorAll(".delete-click");
    // // Get the button close the modal
    // var btnCloseDelete = document.getElementsByClassName("close")[0];
    // // console.log(btnOpenDelete)

    // // Get the button cancel
    // var btnCancel = document.querySelector('.btn-cancel')
    // console.log(btnCancel)
    // When the user clicks on the button, open the modal
    // Click cancel
    btnCancel.onclick = () => modalDelete.style.display = "none";

    // btnOpenDelete.addEventListener('click', function() {modalDelete.style.display = "block"})
    // btnOpenDelete.forEach(element => {
    //   element.onclick = () => modalDelete.style.display = "block"
    // });

    // When the user clicks on <span> (x), close the modal
    btnCloseDelete.onclick = function() {
      modalDelete.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {  
      if (event.target == modalDelete) {
        modalDelete.style.display = "none";
      }
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    confirmDelete.onclick = () => {
      $('.table__content').deleteRow(app.deleteIndex+1)
      modalDelete.style.display = "none";
      app.books.splice(app.deleteIndex,1)
      console.log(app.books)
      app.saveStore(app.books)
    }


    // Handle create book
    createForm.onsubmit = function(e){
      e.preventDefault()
      console.log('test')
      const newBook = {
        name: inputName.value,
        author: inputAuthor.value,
        topic: inputTopic.value
      }
      inputName.value =''
      inputAuthor.value=''
      app.books.push(newBook)
      app.render(app.books)
      app.saveStore(app.books)
      // btnOpenDelete = document.querySelectorAll(".delete-click");
    }
    
    searchInput.onchange = function(){
      const searchValue = searchInput.value
      const resultSearch = app.books.filter((book)=> book.name.toLowerCase().includes(searchValue));
      if (searchValue != '')
        app.isSearching = true
      else app.isSearching = false 
      app.render(resultSearch)
    }


  },

  start: function() {
    this.getBooks()
    console.log(this.books)
    this.render(this.books)
    this.handleEvents()
  }
}

app.start()


// Your JS code goes here
