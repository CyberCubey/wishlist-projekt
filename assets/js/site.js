//#region model
const model = {
  wishlist: [


  ],
  editIndex: null
};

//#endregion


//#region view
const view = {
  elements: {
    list: document.getElementById("wishlist"),
    form: document.getElementById("wish-form"),
    input: document.getElementById("wish-input"),
    submitBtn: document.getElementById("submit-btn")
  },


  render() {
    this.elements.list.innerHTML = model.wishlist

      .map(
        (item, index) => `
          <li>
          <span class="text">${item}</span>
            <div class="actions">
            <button type="button" data-action="edit" data-index="${index}">Edit</button>
            <button type="button" data-action="delete" data-index="${index}">Delete</button>
          </div>
        </li>
        `
      )
      .join("");
  },


  resetForm() {
    model.editIndex = null;
    this.elements.input.value = "";
    this.elements.submitBtn.textContent = "Add";
  } };
  
//#endregion


//#region control
const controller = {
  init() {
    view.render();


    view.elements.input.setAttribute("autocomplete", "off");
    view.elements.input.setAttribute("autocorrect", "off");

    view.elements.input.setAttribute("autocapitalize", "off");
    view.elements.input.setAttribute("spellcheck", "false");

    view.elements.form.addEventListener("submit", (event) => {
      event.preventDefault();


      const value = view.elements.input.value.trim();
      if (!value) return;

      if (model.editIndex !== null) {
        model.wishlist[model.editIndex] = value;
      } else {
        model.wishlist.push(value);
      }

      view.render();
      view.resetForm();
    });


    view.elements.list.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;


      const index = Number(button.dataset.index);

      if (button.dataset.action === "edit") {
        model.editIndex = index;

        view.elements.input.value = model.wishlist[index];
        view.elements.submitBtn.textContent = "Save";
        view.elements.input.focus();
        return;
      }


      model.wishlist.splice(index, 1);
      if (model.editIndex === index) {
        view.resetForm();
      } else if (model.editIndex !== null && model.editIndex > index) {
        model.editIndex -= 1;
        
      }



      view.render();
    });
  }};


//#endregion
controller.init();
