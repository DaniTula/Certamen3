import { getData, getDocumento, remove, save, update } from './firestore.js'
let id = 0

document.getElementById('btnSave').addEventListener('click', (event) => {
    event.preventDefault()

    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    if (document.querySelectorAll('.is-invalid').length === 0) {
        const Jug = {
            id: document.getElementById('id').value,
            nom: document.getElementById('nombre').value,
            ape: document.getElementById('apellido').value,
            nac: document.getElementById('fecha').value,
            debut: document.getElementById('fecha2').value,
            sexo: document.getElementById('sexo').value,
            nomEquipo: document.getElementById('nombreEquipo').value,
            rol: document.getElementById('rol').value,
            sueldo: document.getElementById('sueldo').value
        }
        if (id === 0) {
            save(Jug)
            Swal.fire('Guardado', '', 'success')
        } else {
            update(id, Jug)
        }

        id = 0
        limpiar()
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''
        datos.forEach((Jug) => {
            const item = Jug.data()
            tabla += `<tr>
                <td>${item.id}</td>
                <td>${item.nom}</td>
                <td>${item.ape}</td>
                <td>${item.nac}</td>
                <td>${item.debut}</td>
                <td>${item.sexo}</td>
                <td>${item.nomEquipo}</td>
                <td>${item.rol}</td>
                <td>${item.sueldo}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${Jug.id}">Editar</button>
                    <button class="btn btn-danger" id="${Jug.id}">Eliminar</button>
                </td>
            </tr>`
        })

        document.getElementById('contenido').innerHTML = tabla

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await getDocumento(btn.id)
                const Jug = doc.data()

                document.getElementById('id').value = Jug.id
                document.getElementById('nombre').value = Jug.nom
                document.getElementById('apellido').value = Jug.ape
                document.getElementById('fecha').value = Jug.nac
                document.getElementById('fecha2').value = Jug.debut
                document.getElementById('sexo').value = Jug.sexo
                document.getElementById('nombreEquipo').value = Jug.nomEquipo
                document.getElementById('rol').value = Jug.rol
                document.getElementById('sueldo').value = Jug.sueldo

                id = doc.id

                document.getElementById('btnSave').value = 'Editar'
                document.getElementById('id').readOnly = true;
            })
        })
    })
})