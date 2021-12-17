const classListOffline = ["badge--in-store", "badge--also-in-store", "badge--in-store-as-of"]
const classListOnline = ["badge--available-online", "badge--soon-online", "badge--soldout-online"]

let online = []
let offline = []

function initilizeItems() {
    let badges = document.querySelectorAll("li.ACampaignGrid__item .badge")

    for (let badge of badges) {
        let item = badge.closest("li.ACampaignGrid__item")
        let classList = Array.from(badge.classList)

        // classList includes offline classes?
        if (classList.some((value) => classListOffline.includes(value))) {
            offline.push(item)
        }

        // classList includes online classes?
        if (classList.some((value) => classListOnline.includes(value))) {
            online.push(item)
        }
    }
}

function addNavigation() {
    let navbar = document.querySelector("div.ATheCampaingPage__AnchorBar-Box .ATheAnchorBar")
    if (!navbar) {
        let page = document.querySelector("div.ATheCampaign__Page")
        let firstSection = page.querySelector("section.ATheCampaign__SectionWrapper")

        navbar = document.createElement("div")
        navbar.id = "content_script_nav_bar"
        navbar.appendChild(document.createElement("ul"))
        page.insertBefore(navbar, firstSection)
    }

    let secondNav = document.createElement("ul")
    secondNav.classList.add("ATheAnchorBar__List")
    let html = ""
    html += "<li class='ATheAnchorBar__Item'><a id='offline_button' class='ATheAnchorBar__Link' href='#'>"
    html += "Offline (" + offline.length + ")</a></li>"
    html += "<li class='ATheAnchorBar__Item'><a id='online_button' class='ATheAnchorBar__Link' href='#'>"
    html += "Online (" + online.length + ")</a></li>"
    secondNav.innerHTML = html

    navbar.appendChild(secondNav)
}

function connectEvents() {
    document.getElementById("offline_button").addEventListener("click", (event) => {
        event.target.classList.add("active")
        document.getElementById("online_button").classList.remove("active")

        hideAll(online)
        showAll(offline)
        event.preventDefault()
    })

    document.getElementById("online_button").addEventListener("click", (event) => {
        event.target.classList.add("active")
        document.getElementById("offline_button").classList.remove("active")

        hideAll(offline)
        showAll(online)
        event.preventDefault()
    })
}

function hideAds() {
    let hide = Array.from(document.querySelectorAll(".ACampaignGrid__item")).filter((elem) =>
        elem.querySelector(".ACampaignTeaser")
    )
    hideAll(hide)
}

function hideAll(elements) {
    for (let elem of elements) {
        elem.style.display = "none"
    }
}

function showAll(elements) {
    for (let elem of elements) {
        elem.style.display = "flex"
    }
}

initilizeItems()
addNavigation()
connectEvents()
hideAds()
