const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('btnSave').value = 'Guardar'
}

const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }else{
        if (id == 'fecha') {
            const edad = calcularEdad(input.value)
            if (edad <= 17) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Tiene que tener igual o mas de 17 años</span>'
            }
        }
        if (id == 'fecha2') {
            const dia = calcularFecha(input.value)
            if (dia < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No puede debutar un dia en el futuro</span>'
            }
        }
        if (id == 'sueldo') {
            if (input.value < 599) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">el sueldo minimo es de $600</span>'
            }
        }
    }
}

const calcularFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}
const calcularEdad = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}