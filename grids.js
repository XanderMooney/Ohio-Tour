const mobileQuery = window.matchMedia('(max-aspect-ratio: 1/1)')
let isMobile = false;

let threeGrids = document.querySelectorAll('.grid-even')
for (let i = 0; i < threeGrids.length; ++i)
{
    let gridTemplate = '';
    
    for (let j = 0; j < threeGrids[i].childElementCount; ++j)
    {
        if(threeGrids[i].children[j].classList == undefined || !threeGrids[i].children[j].classList.contains('mobile-hidden'))
        {
            gridTemplate += '1fr ';
        }
        else gridTemplate += '0 ';
    }
    
    threeGrids[i].dataset.gridTemplate = gridTemplate;
}

mobileQuery.addListener(mediaChange)
mediaChange(mobileQuery)

function mediaChange(e) {
    if (e.matches && !isMobile) {
        
        for (let i = 0; i < threeGrids.length; ++i)
        {
            threeGrids[i].style.gridTemplateRows = threeGrids[i].dataset.gridTemplate;
        }
        isMobile = true
    }
    else if (isMobile) {
        for (let i = 0; i < threeGrids.length; ++i)
        {
            threeGrids[i].style.gridTemplateRows = '1fr'
        }
        isMobile = false
    }
}