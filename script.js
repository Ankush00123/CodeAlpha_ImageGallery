const filter_buttons=document.getElementById("filter_buttons");
const images_div=document.getElementById("images_div");
const lightbox=document.getElementById("lightbox");
const close_button=document.getElementById("close_button");
const lightbox_image=document.getElementById("lightbox_image");
const prev_button=document.getElementById("prev_button");
const next_button=document.getElementById("next_button");
const main_container=document.getElementById("main_container");

const images=[
    {
        src:"Images/nature_1.jpg",
        type:"Nature"
    },
    {
        src:"Images/nature_2.jpg",
        type:"Nature"
    },
    {
        src:"Images/nature_3.jpg",
        type:"Nature"
    },
    {
        src:"Images/nature4.jpg",
        type:"Nature"
    },
    {
        src:"Images/fruits_1.jpg",
        type:"Fruits"
    },
    {
        src:"Images/fruits_2.jpg",
        type:"Fruits"
    },
    {
        src:"Images/fruits_3.jpg",
        type:"Fruits"
    }
]

let current_index=0;
let current_images_array=images;

const types=["All", ...new Set(images.map(img=>img.type))];

function createFilterButtons()
{
    types.forEach(type=>
    {
        const button=document.createElement("button");
        button.textContent=type;
        button.classList.add("filters");
        button.addEventListener("click",()=>
        {
            setActive(button);
            filterImages(type);
        });
        filter_buttons.appendChild(button);
    }
    );
}

function setActive(current_active_button)
{
    const all_buttons=document.querySelectorAll(".filters");
    all_buttons.forEach(btn =>btn.classList.remove("active-filter"));
    current_active_button.classList.add("active-filter");
}

function filterImages(type)
{
    if(type==="All")
    {
        fillImages(images);
    }
    else
    {
        const filtered_images=images.filter(img => img.type===type);
        fillImages(filtered_images);
    }
}

function fillImages(show_image_array)
{
    images_div.innerHTML="";
    current_images_array=show_image_array;
    
    show_image_array.forEach((image,index)=>
    {
        const image_item=document.createElement("img");
        image_item.src=image.src;
        image_item.type=image.type;
        image_item.classList.add("image_item");
        image_item.addEventListener("click",()=>openLightbox(index));
        image_item.onerror=()=>
        {
            image_item.src="Images/default_image.jpg";
            image_item.type="None";
        }
        images_div.appendChild(image_item);
    });
}

function openLightbox(index)
{
    current_index=index;
    lightbox_image.src=current_images_array[current_index].src;
    lightbox.classList.remove("hidden");
    lightbox.classList.add("show");
    main_container.classList.add("blur");
}

close_button.addEventListener("click",()=>closeButton());
function closeButton()
{
    main_container.classList.remove("blur");
    lightbox.classList.remove("show");
    lightbox.classList.add("hidden");
}

next_button.addEventListener("click",()=>nextButton());
function nextButton()
{
    current_index++;
    if(current_index>=current_images_array.length)
    {
        current_index=0;
    }
    lightbox_image.src=current_images_array[current_index].src;
}

prev_button.addEventListener("click",()=>prevButton());
function prevButton()
{
    current_index--;
    if(current_index<0)
    {
        current_index=current_images_array.length-1;
    }
    lightbox_image.src=current_images_array[current_index].src;
}

lightbox.addEventListener("click",(e)=>
{
    if(e.target===lightbox)
    {
        closeButton();
    }
})

window.onload=() =>
{
    createFilterButtons();
    fillImages(images);
    const firstButton = document.querySelector(".filters");
    if(firstButton) 
    {
        firstButton.classList.add("active-filter");
    }
}