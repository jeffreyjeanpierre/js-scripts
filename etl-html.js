// create a string
list = `<option value="Zaire">Zaire</option>
<option value="Zambia">Zambia</option>
<option value="Zimbabwe">Zimbabwe</option>`

// beginning of substring
control.substring(0,control.indexOf(">")+1)

// end of substring
control.substring(control.indexOf("</"))

// iterate through each to etl
function transform(list) {
    fin = ''
    
    // create new array from preformatted html
    arr = list.split('\n')
    Object.values(arr).forEach((control)=> {
    beginning = control.substring(0,control.indexOf(">")+1) // breaks when encounters '/>'
    mid = control.substring(control.indexOf(">")+1, control.indexOf(control.substring("</")))
    end = control.substring(control.indexOf("</"))
    fin += beginning
    if (mid.includes("'")) {
        fin += `<?php esc_html_e("${mid}") ?>`
    }
    else {
        fin += `<?php esc_html_e('${mid}') ?>`
    }
    fin += end
    fin += '\n'
    })
    return fin
}

// example out put contains the php script with the "mid" section embedded within
<option value="Zaire"><?php esc_html_e('Zaire') ?></option>
<option value="Zambia"><?php esc_html_e('Zambia') ?></option>
<option value="Zimbabwe"><?php esc_html_e('Zimbabwe') ?></option>
