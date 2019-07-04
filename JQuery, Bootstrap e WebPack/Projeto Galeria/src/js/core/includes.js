import $ from 'jquery'

const loadHtmlSuccess = []

export function onLoadHtmlSuccess(callback){
    if(!loadHtmlSuccess.includes(callback)){
        loadHtmlSuccess.push(callback)
    }
}

function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i, e) {
         const url = $(e).attr('wm-include')
         $.ajax({
             url,
             success(data){
                 $(e).html(data)
                 $(e).removeAttr('wm-include')
                
                 loadHtmlSuccess.forEach(callback => callback(data))
                 loadIncludes(e)
             }
         })
    })
}

loadIncludes()