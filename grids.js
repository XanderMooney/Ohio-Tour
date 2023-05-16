const mobileQuery = window.matchMedia('(max-aspect-ratio: 1/1)')
let isMobile = false;

let threeGrids = document.querySelectorAll('.grid-even')

for (let i = 0; i < threeGrids.length; ++i) {
    let gridTemplate = '';

    for (let j = 0; j < threeGrids[i].childElementCount; ++j) {
        if (threeGrids[i].children[j].classList == undefined || !threeGrids[i].children[j].classList.contains('mobile-hidden')) {
            gridTemplate += '1fr ';
        }
        else gridTemplate += '0 ';
    }

    threeGrids[i].dataset.gridTemplate = gridTemplate;
}

mobileQuery.addListener(mediaChange)
initGrids(mobileQuery)

function mediaChange(e) {
    if (e.matches && !isMobile) {
        initGrids(e)
        isMobile = true
    }
    else if (isMobile) {
        initGrids(e)
        isMobile = false
    }
}

function initGrids(mediaQuery) {
    if (!mediaQuery.matches) {
        for (let i = 0; i < threeGrids.length; ++i) {
            threeGrids[i].classList.contains('grid-vertical') ?
            threeGrids[i].style.gridTemplateRows = threeGrids[i].dataset.gridTemplate :
            threeGrids[i].style.gridTemplateColumns = threeGrids[i].dataset.gridTemplate; 
            
            threeGrids[i].classList.contains('grid-vertical') ? 
            threeGrids[i].style.gridTemplateColumns = 'unset' : 
            threeGrids[i].style.gridTemplateRows = 'unset';
        }
    
    }
    else {
        for (let i = 0; i < threeGrids.length; ++i) {
            threeGrids[i].classList.contains('mobile-vertical') ?
            threeGrids[i].style.gridTemplateRows = threeGrids[i].dataset.gridTemplate :
            threeGrids[i].style.gridTemplateColumns = threeGrids[i].dataset.gridTemplate;
                
            threeGrids[i].classList.contains('mobile-vertical') ? 
            threeGrids[i].style.gridTemplateColumns = 'unset' :
            threeGrids[i].style.gridTemplateRows = 'unset' ;
        }
    }
}